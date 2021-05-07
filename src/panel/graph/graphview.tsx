import React, {useCallback, useEffect, useState} from "react";
import ReactFlow, {
  ConnectionLineType,
  ControlButton,
  Controls,
  isNode,
  MiniMap,
  Position,
  ReactFlowProvider
} from 'react-flow-renderer';

import {Box, createStyles, makeStyles, Theme} from "@material-ui/core";
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import HorizontalSplitIcon from '@material-ui/icons/HorizontalSplit';


import {graphlib, layout} from 'dagre';

import TaskNode from "./tasknode";
import ChannelNode from "./channelnode"
import OperatorNode from "./operatornode"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    controls: {
      position: "relative",
      top: "10px",
      left: "10px",
      zIndex: 99999999999,
    }
  })
)

const connectionLineStyle = { stroke: '#fff' };
const nodeTypes = {
  taskNode: TaskNode,
  operatorNode: OperatorNode,
  channelNode: ChannelNode
};


function resolve_flow(flow: any, flowrun: any) {
  if (!flow) return []
  const tasks: any = [...flow.tasks]
  const edges: any = []
  const input_channels: any = []
  
  let ch_task_map = new Map()
  tasks.forEach((task: any) => {
    task.output.forEach((ch: any) => {
      // @ts-ignore
      ch_task_map.set(ch.id, task.id)
    })
  })
  
  let task_input_map = new Map()
  
  // @ts-ignore
  flow.edges.forEach((edge, index) => {
    const channel_id: String = edge.channel_id
    const task_id: String = edge.task_id
    // add reverse link
    if (!task_input_map.has(task_id)) {
      task_input_map.set(task_id, [])
    }
    let output_task_input = task_input_map.get(task_id)
    const output_task_input_id = `${channel_id}-${output_task_input.length}`
    output_task_input.push(output_task_input_id)
  
    // channel-task
    if (!ch_task_map.get(channel_id)) {
      ch_task_map.set(channel_id, channel_id);
      input_channels.push({
        id: channel_id,
        type: 'channelNode',
        data: {
          label: "Input Channel",
          width: 50,
          height: 25
        },
        position: {x: 0, y: 0},
        sourcePosition: "right",
      })
    }
    // task-task
    // @ts-ignore
    edges.push({
      id: `${channel_id}|${task_id}|${index}`,
      source: ch_task_map.get(channel_id),
      target: task_id,
      sourceHandle: channel_id,
      targetHandle: output_task_input_id,
      animated: true,
    })
      
  })
  const nodes = tasks.map((task: any) => {
    const name = task.context.task_config.name;
    const is_operator = name.startsWith("Operator")
    return {
      id: task.id,
      type: is_operator ? "operatorNode" : "taskNode",
      data: {
        ...task,
        input: task_input_map.get(task.id) || [],
        width: is_operator ? 40: 80,
        height: is_operator ? 40 : 120,
        flowrun_id: (is_operator || !flowrun) ? null : flowrun.id,
      },
      position: {
        x: 0,
        y: 0
      }
    }
  })
  
  const elements =  [...nodes, ...input_channels, ...edges]
  // console.log(elements)
  return elements
}





const dagreGraph = new graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

// In order to keep this example simple the node width and height are hardcoded.
// In a real world app you would use the correct width and height values of
// const nodes = useStoreState(state => state.nodes) and then node.__rf.width, node.__rf.height


// @ts-ignore
const getLayoutedElements = (elements, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });
  
  elements.forEach((el: any) => {
    if (isNode(el)) {
      // @ts-ignore
      dagreGraph.setNode(el.id, { width: el.data.width, height: el.data.height });
    } else {
      dagreGraph.setEdge(el.source, el.target);
    }
  });
  
  layout(dagreGraph);
  
  return elements.map((el: any) => {
    if (isNode(el)) {
      const nodeWithPosition = dagreGraph.node(el.id);
      el.targetPosition = isHorizontal ? Position.Left : Position.Top;
      el.sourcePosition = isHorizontal ? Position.Right : Position.Bottom;
      
      // unfortunately we need this little hack to pass a slighltiy different position
      // to notify react flow about the change. More over we are shifting the dagre node position
      // (anchor=center center) to the top left so it matches the react flow node anchor point (top left).
      // @ts-ignore
      // @ts-ignore
      el.position = {
        x: nodeWithPosition.x - el.data.width / 2 + Math.random() / 1000,
        y: nodeWithPosition.y - el.data.height / 2,
      };
    }
    
    return el;
  });
};



// @ts-ignore
function GraphView({flow, flowrun}) {
  const classes = useStyles()
  const [flowInstance, setFlowInstance] = useState(null)
  const [elements, setElements] = useState([])
  
  
  useEffect(() => {
    const elements = resolve_flow(flow, flowrun)
    const layoutedElements = getLayoutedElements(elements, "LR")
    // @ts-ignore
    setElements(layoutedElements)
  }, [flow, flowrun])
  
  
  useEffect(() => {
    if (flowInstance && elements.length > 0) {
      // @ts-ignore
      flowInstance.fitView()
    }
  }, [flow, elements.length])
  
  const onConnect = useCallback(
    (params) => {
      return
    }
      , []
  )
  
  const onLoad = useCallback(
    (flow) => {
      if (!flowInstance) {
        setFlowInstance(flow)
      }
    },
    [flowInstance]
  )
  
  const onLayout = useCallback(
    (direction) => {
      const layoutedElements = getLayoutedElements(elements, direction);
      setElements(layoutedElements);
    },
    [elements]
  );
  
  // @ts-ignore
  return (
    <Box height="100%" width="100%">
      <ReactFlowProvider>
        <ReactFlow
          elements={elements}
          onConnect={onConnect}
          onLoad={onLoad}
          nodeTypes={nodeTypes}
          connectionLineStyle={connectionLineStyle}
          connectionLineType={ConnectionLineType.SmoothStep}
          snapToGrid={true}
          snapGrid={[2, 2]}
          defaultZoom={1}
          onlyRenderVisibleElements={true}
        >
  
          <MiniMap
            // @ts-ignore
            nodeStrokeColor={(n:any) => {
              if (n.type === 'taskNode') return '#3474e0';
              if (n.type === 'operatorNode') return '#ff6f00';
              if (n.type === 'channelNode') return 'red';
              return '#fff';
            }}
            // @ts-ignore
            nodeColor={(n:any) => {
              if (n.type === 'taskNode') return '#3474e0';
              if (n.type === 'operatorNode') return '#ff6f00';
              if (n.type === 'channelNode') return '#455064';
              return '#fff';
          }}
          >
          </MiniMap>
          <Controls>
            <ControlButton onClick={() => onLayout('LR')}>
              <VerticalSplitIcon/>
            </ControlButton>
            <ControlButton onClick={() => onLayout('TB')}>
              <HorizontalSplitIcon/>
            </ControlButton>
          </Controls>
        </ReactFlow>

      </ReactFlowProvider>
    </Box>
  )
}

export default GraphView
