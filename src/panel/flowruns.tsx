import React, {useEffect, useState} from "react";
import Skeleton from '@material-ui/lab/Skeleton';
import {Box, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import FlowRun from "./flowrun";
import SplitPane from "react-split-pane";
import ShowPanel from "./show/show";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    flowrunsPanel: {
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
function FlowRuns({flow, flowruns}) {
  const classes = useStyles()
  
  const [flowrun, setFlowrun] = useState(null)
  // any other way?
  useEffect(() => {
    setFlowrun(null)
  }, [flow])
  console.log(flowrun)
  
  const FlowRunsPanel = (
    <Grid className={classes.flowrunsPanel} container direction="column" wrap="nowrap">
      <Grid className={classes.panel} item>
        <Box height={"50px"}>
          <Typography variant={"h4"}>Flow Runs</Typography>
        </Box>
      </Grid>
      <Grid className={classes.grid} item container direction="column" wrap="nowrap">
        {
          flowruns.map((curFlowrun: any, index: number) => (
            curFlowrun ? (
              <Grid item key={curFlowrun.id}>
                <FlowRun flowrun={curFlowrun} setFlowRun={setFlowrun} activeFlowrun={flowrun}/>
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
          ))
        }
      </Grid>
    </Grid>
  )
  
  return (
    <SplitPane split="vertical" defaultSize="15vw" maxSize={300} minSize={100}>
      <Box height="100%">
        {FlowRunsPanel}
      </Box>
      <Box height="100%">
        <ShowPanel flow={flow} flowrun={flowrun}/>
      </Box>
    </SplitPane>
  )
}

export default FlowRuns