import React from "react";
import {Box, createStyles, makeStyles, Theme} from "@material-ui/core";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100px',
      width: "100%"
    }
  })
)

// @ts-ignore
function FlowRun({flowrun, setFlowRun, activeFlowrun}) {
  const classes = useStyles()
  let className = `tensorsite-card ${activeFlowrun && (activeFlowrun.id === flowrun.id) ? "active" : ""}`
  return (
    <Box className={className} height="100px">
      <Box className="tensorsite-content" onClick={() => setFlowRun(flowrun)}>
        {flowrun.name}
      </Box>
    </Box>
  )
}


export default FlowRun;