import {Box, createStyles, makeStyles, Theme, Typography} from "@material-ui/core"
import {Handle, Position} from "react-flow-renderer";
import React, {memo} from "react";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      color: "white",
      background: "#455064",
      borderRadius: "10%",
      textAlign: "center",
      overflow: "hidden",
      display: "flex",
      flexDirection: 'column',
      alignItems: 'start',
      justifyContent: 'center'
    }
  })
);

// @ts-ignore
function ChannelNode({id, data}) {
  const {width, height} = data;
  const classes = useStyles()
  return (
    <Box className={classes.root} height={`${height}px`} width={`${width}px`}>
      <Box width={"100%"}>
        <Typography>
          Channel
        </Typography>
      </Box>
      <Handle
        type="source"
        position={Position.Right}
        id={id}
        style={{background: "blue"}}
      />

    </Box>
  )
};


export default memo(ChannelNode);