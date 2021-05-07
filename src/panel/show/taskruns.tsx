import React, {useEffect, useState} from "react";
import {Box, createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import {useQuery} from "@apollo/client";
import {GET_TASKRUNS} from "../graphql"
import Skeleton from "@material-ui/lab/Skeleton";


const DUMMY_TASKRUNS = Array(15).fill(null);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    taskrunsPanel: {
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

const useTaskStyles = makeStyles((theme: Theme) =>
  createStyles({})
)


// @ts-ignore
function TaskRun({taskrun, activeTaskrun, setTaskrun}) {
  let className = `tensorsite-card ${activeTaskrun && (activeTaskrun.id === taskrun.id) ? "active" : ""}`
  return (
    <Box className={className} height="100px">
      <Box className="tensorsite-content" height="100%" onClick={() => setTaskrun(taskrun)}>
        {taskrun.id}
      </Box>
    </Box>
  )
  
}

// @ts-ignore
function TaskRuns({flowrun, task}) {
  const classes = useStyles()
  const [taskrun, setTaskrun] = useState(null)
  const {data, loading, error, startPolling, stopPolling} = useQuery(GET_TASKRUNS, {
    variables: {
      input: {
        flowrun_id: flowrun ? [flowrun.id] : ["NOT_SET"],
        task_id: task ? [task.id] : ["NOT_SET"]
      },
    },
  })
  
  useEffect(() => {
    if (flowrun && task)
      startPolling(2000);
    return () => {
      stopPolling()
    }
  }, [flowrun, task]);
  
  
  const taskruns = (flowrun && task) ? ((loading || error) ? DUMMY_TASKRUNS : data.get_taskruns) : []
  
  const TaskRunsPanel = (
    <Grid className={classes.taskrunsPanel} container direction="column" wrap="nowrap">
      <Grid className={classes.panel} item>
        <Box height={"50px"}>
          <Typography variant={"h5"}>TaskRuns</Typography>
        </Box>
      </Grid>
      <Grid className={classes.grid} item container direction="column" wrap="nowrap">
        {
          taskruns.map((curTaskrun: any, index: number) => (
            curTaskrun ? (
              <Grid item key={curTaskrun.id}>
                <TaskRun taskrun={curTaskrun} setTaskrun={setTaskrun} activeTaskrun={taskrun}/>
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
    <Box height={"100%"} width={"100"}>
      {TaskRunsPanel}
    </Box>
  )
  
}


export default TaskRuns;