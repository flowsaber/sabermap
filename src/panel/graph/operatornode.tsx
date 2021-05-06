import React, {memo} from "react"
import {createStyles, makeStyles, Theme, Typography} from "@material-ui/core";
import {Box} from "@material-ui/core"
import {Handle, Position} from "react-flow-renderer"
import NodeWrapper from "./nodewrapper"


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "5px",
      color: "white",
      background: '#ff6f00',
      borderRadius: "10%",
      textAlign: "center",
      overflow: "scroll",
      display: "flex",
      flexDirection: 'column',
      alignItems: 'start',
      justifyContent: 'center',
    }
  })
);

// @ts-ignore
function OperatorNode(props) {
  const classes = useStyles()
  
  const {data, isCircle=false} = props;
  const {width, height} = data;
  const task = data;
  
  const label = task.name.replace("Operator", "").replace(/\[.*\]/g, '')
  
  return (
    <NodeWrapper {...props} isCircle={isCircle} className={classes.root} width={width} height={height}>
      <Box width={"100%"} overflow={"scroll"}>
        <Typography>{label}</Typography>
      </Box>
    </NodeWrapper>
  )
}

export default memo(OperatorNode)