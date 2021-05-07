import React, {useEffect, useState} from "react";
import Box from "@material-ui/core/Box";
import {createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {useQuery} from '@apollo/client'
import Flow from "./flow";
import {GET_FLOWRUNS} from "./graphql";
import "../style/App.css"
import SplitPane from "react-split-pane";
import FlowRuns from "./flowruns";
import Path from "./path";
import HomeIcon from "@material-ui/icons/Home";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Skeleton from '@material-ui/lab/Skeleton';


const DUMMY_FLOWRUNS = Array(15).fill(null);

const defaultPathList = [
  {
    link: '#',
    label: "Home",
    icon: <HomeIcon/>
  },
  {
    link: null,
    label: 'Flow',
    icon: <ExpandMoreIcon/>
  },
  {
    link: null,
    label: 'Task',
    icon: <ExpandMoreIcon/>
  },
  {
    link: null,
    label: 'FlowRun',
    icon: <ExpandMoreIcon/>
  },
  {
    link: null,
    label: 'TaskRun',
    icon: <ExpandMoreIcon/>
  }
]
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flowsPanel: {
      height: "100%"
    },
    panel: {},
    grid: {
      flex: "1 1 auto",
      overflowY: "auto"
    },
    gridItem: {
      width: "100%"
    },
  })
)

// @ts-ignore
function Flows({flows}) {
  const classes = useStyles()
  const [flow, setFlow] = useState(null)
  const [pathList, setPathList] = useState(defaultPathList)
  // @ts-ignore
  const flow_ids = flow ? [flow.id] : []
  const {loading, error, data, startPolling, stopPolling} = useQuery(GET_FLOWRUNS, {
    variables: {
      input: {
        flow_id: flow_ids
      },
    },
    // pollInterval: 4000,
  });
  
  useEffect(() => {
    startPolling(4000);
    return () => {
      stopPolling()
    }
  }, []);
  
  const onPathLickClickHandler = (label: string) => {
    // const clickedPath = pathList.find((path) => path.label === label)
    // if (clickedPath !== undefined) {
    //   const index = pathList.indexOf(clickedPath);
    //   const newPathList = pathList.slice(0, index + 1)
    //   setPathList(newPathList)
    // }
  }
  const FlowsPanel = (
    <Grid className={classes.flowsPanel} container direction="column" wrap="nowrap">
      <Grid className={classes.panel} item>
        <Box height={"50px"}>
          <Typography variant={"h4"}>Flows</Typography>
        </Box>
      </Grid>
      <Grid className={classes.grid} item container direction="column" wrap="nowrap">
        {
          flows.map((curFlow: any, index: number) =>
            (
              curFlow ? (
                <Grid item key={curFlow.id}>
                  <Flow flow={curFlow} activeFlow={flow} setFlow={setFlow}/>
                </Grid>
              ) : (
                <Grid item key={index}>
                  <Box height="100px">
                    <Skeleton variant="text" width={"40%"}/>
                    <Skeleton variant="text"/>
                    <Skeleton variant="rect" height={"60%"}/>
                  </Box>
                </Grid>
              )
            )
          )
        }
      </Grid>
    </Grid>
  )
  
  return (
    <Box height="100%">
      <Box height="8vh">
        <Path pathList={pathList} onClick={onPathLickClickHandler}/>
      </Box>
      <Box height="80vh">
        <SplitPane split="vertical" defaultSize="15vw" maxSize={300} minSize={100} style={{height: "80vh"}}>
          <Box height="100%">
            {FlowsPanel}
          </Box>
          <Box height="100%">
            <FlowRuns flow={flow} flowruns={(loading || error) ? DUMMY_FLOWRUNS : data.get_flowruns}/>
          </Box>
        </SplitPane>
      
      </Box>
    </Box>
  )
}

export default Flows;
