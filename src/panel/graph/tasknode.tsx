import React, {memo} from 'react'

import {Handle, Position, useStoreState} from 'react-flow-renderer'
import {Paper, Box, Typography, makeStyles, Theme, createStyles, Grid} from "@material-ui/core";
import NodeWrapper from "./nodewrapper"
import {useQuery} from "@apollo/client";
import {GET_TASKRUNS_STATE_ONLY} from "../graphql";
import Skeleton from "@material-ui/lab/Skeleton";
import LinearProgress from '@material-ui/core/LinearProgress';



const useTaskRunsStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "5px",
      width: "100%",
      overflow: "hidden" ,
      flexWrap: "nowrap",
      justifyContent: "start",
      height: "80px", // any better way?
    }
  })
);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "5px",
      color: "white",
      background: "#3474e0",
      opacity: 0.8,
      borderRadius: "10%",
      textAlign: "center",
      overflow: "hidden",
      display: "flex",
      flexDirection: 'column',
      alignItems: 'start',
      justifyContent: 'center',
    }
  })
);



// @ts-ignore
function TaskRunsPanel({task}) {
  const classes = useTaskRunsStyles()
  const {loading, error, data} = useQuery(GET_TASKRUNS_STATE_ONLY, {
    variables: {
      input: {
        flowrun_id: [task.flowrun_id],
        task_id: [task.id]
      },
    },
    pollInterval: 2000,
  });
  
  let stateCounts = [];
  if (loading || error) {
    stateCounts = Array(5).fill(null)
  }
  else {
    let stateMap = new Map();
    for (let taskrun of data.get_taskruns) {
      const state = taskrun.state.state_type
      if (!stateMap.has(state)) {
        stateMap.set(state, {
          state: state,
          count: 0,
        })
      }
      let state_info = stateMap.get(state)
      state_info.count += 1
    }
    stateMap.forEach((value, key) => {
      stateCounts.push(value);
    })
  }
  // console.log(stateCounts)
  
  return (
    <Grid container direction={"column"} className={classes.root}>
      {stateCounts.map((runState: any, index: number) => (
        runState ? (
          <Box key={runState.state} width={"100%"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
            <Box>
              <Typography variant={"subtitle2"}>{ runState.count }</Typography>
            </Box>
            <Box style={{marginLeft: 5, marginRight: 5}}>
              <LinearProgress style={{height: 8, width: 15}}/>
            </Box>
            <Box>
              <Typography variant={"subtitle2"}>{ runState.state }</Typography>
            </Box>
          </Box>
        ) : (
          <Box key={index} width={"100%"} display={"flex"} alignItems={"center"}>
            <Skeleton variant="circle" height={"9px"} width={"9px"}/>
            <Skeleton variant="text" width={"100%"}/>
          </Box>
        )
        )
      )}
    </Grid>
  )
};

// @ts-ignore
function TaskNode(props) {
  const classes = useStyles()
  const [, , zoom] = useStoreState((state) => state.transform);
  const showContent = zoom >= 1.5;
  
  const {data} = props;
  const {width, height} = data;
  const task = data;
  
  const label = task.name.replace("Operator", "").replace(/\[.*\]/g, '')
  return (
    <NodeWrapper {...props} className={`${classes.root} nowheel`} height={height} width={width}>
      <Box width={"100%"}>
        <Box>
          <Typography variant={"h5"}>
            {label}
          </Typography>
        </Box>
        <Box>
          {
            (showContent && data.flowrun_id) ?
            <TaskRunsPanel task={task}/>
            : ""
          }
        </Box>
      </Box>
    </NodeWrapper>
  )
}

export default memo(TaskNode);