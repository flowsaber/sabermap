import React from "react";
import "../style/App.css"
import {createStyles, makeStyles, Paper, Theme} from "@material-ui/core";
import Box from "@material-ui/core/Box"


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
  })
)


// @ts-ignore
function Flow({flow, setFlow, activeFlow}) {
  const classes = useStyles()
  let className = `tensorsite-card ${activeFlow && (activeFlow.id === flow.id) ? "active" : ""}`
  return (
    <Box className={className} height="100px">
      <Box className="tensorsite-content" height="100%" onClick={() => setFlow(flow)}>
        {flow.name}
      </Box>
      
    </Box>
  )
}

export default Flow;