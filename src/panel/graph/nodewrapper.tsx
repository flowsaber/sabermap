import React, {memo} from "react";

import {Box} from "@material-ui/core"
import {Handle, Position} from "react-flow-renderer";
import {layout} from "dagre";

// TODO NodeWrapper is aimed for automatically layout input and output handles
// TODO Now only rectangular are supported


function getHandleLayoutStyles(width: number, height: number, num: number, isLeft: boolean)  {
  if (num <= 0) return []
  num += 1
  const sep = height / num;
  let styles = []
  let top = 0, left = isLeft ? 0 : width;
  for (let i = 0; i < num; i++) {
    top += sep;
    styles.push({
      top: top,
      // left: left
    })
  }
  
  return styles;
}

// @ts-ignore
function NodeWrapper(props) {
  let {
    data,
    children,
    className,
    width = 100,
    height = 100,
    isCircle = false,
  } = props;
  const task = data;
  const inputStyles = getHandleLayoutStyles(width, height, task.input.length, true)
  const InputHandles = (
    task.input.map((ch_id: string, index: number) => (
      <Handle
        key={ch_id}
        type="target"
        id={ch_id}
        position={Position.Left}
        style={{background: "red", ...inputStyles[index]}}
      />
    ))
  );
  const outputStyles = getHandleLayoutStyles(width, height, task.output.length, false)
  const OutputHandles = (
    task.output.map((ch: any, index: number) => (
      <Handle
        key={ch.id}
        type="source"
        position={Position.Right}
        id={ch.id}
        style={{background: "blue", ...outputStyles[index]}}
      />
    ))
  );
  
  return (
    <Box className={className} height={height} width={width} style={{borderRadius: isCircle ? "50%" : "1%", padding: 0}}>
      {InputHandles}
      {children}
      {OutputHandles}
    </Box>
  )
}


export default memo(NodeWrapper);