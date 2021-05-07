import React, {useEffect, useState} from "react"
import Box from "@material-ui/core/Box";
import SplitPane from "react-split-pane";
import {createStyles, Grid, makeStyles, Theme, Typography} from "@material-ui/core";
import TaskRuns from "./taskruns";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tasksPanel: {
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
function Task({task, setTask, activeTask}) {
  const classes = useTaskStyles()
  let className = `tensorsite-card ${activeTask && (activeTask.id === task.id) ? "active" : ""}`
  return (
    <Box className={className} height="100px">
      <Box className="tensorsite-content" height="100%" onClick={() => setTask(task)}>
        {task.name}
      </Box>
    </Box>
  )
}


// @ts-ignore
function Tasks({flow, flowrun}) {
  const classes = useStyles()
  const [task, setTask] = useState(null)
  let all_tasks = flow ? flow.tasks : []
  // @ts-ignore
  const tasks = all_tasks.filter((task) => !task.name.startsWith("Operator"))
  
  useEffect(() => {
    if (!task && tasks.length > 0) {
      setTask(flow.tasks[0])
    } else if (!flow) {
      setTask(null)
    }
  }, [flow])
  
  const TasksPanel = (
    <Grid className={classes.tasksPanel} container direction="column" wrap="nowrap">
      <Grid className={classes.panel} item>
        <Box height={"50px"}>
          <Typography variant={"h5"}>Tasks</Typography>
        </Box>
      </Grid>
      <Grid className={classes.grid} item container direction="column" wrap="nowrap">
        {
          tasks.map((curTask: any) =>
            (
              <Grid item key={curTask.id}>
                <Task task={curTask} activeTask={task} setTask={setTask}/>
              </Grid>
            )
          )
        }
      </Grid>
    </Grid>
  )
  return (
    <Box height={"100%"} width={"100%"}>
      <SplitPane split="vertical" defaultSize="50%" maxSize={600} minSize={100} style={{height: "100%"}}>
        <Box height="100%">
          {TasksPanel}
        </Box>
        <Box height="100%">
          <TaskRuns flowrun={flowrun} task={task}/>
        </Box>
      </SplitPane>
    
    </Box>
  )
}


export default Tasks;



