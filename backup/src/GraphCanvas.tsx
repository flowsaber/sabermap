/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import G6 from '@antv/g6';

import { nodesStyle, registerTaskNode } from './styles/nodes'
import { edgeStyle } from './styles/edges'
import { canvasStyle } from './styles/canvas'
import { data } from './data'


const GraphCanvas = () => {
  const ref = React.useRef(null);
  let graph: any = null;

  useEffect(() => {
    let targetAnchorIdx: any, sourceAnchorIdx: any

    if (!graph) {
      registerTaskNode()
      let container = ReactDOM.findDOMNode(ref.current) as HTMLElement

      graph = new G6.Graph({
        container: container,
        width: container.scrollWidth,
        height: container.scrollHeight,
        fitView: false,
        fitCenter: true,
        modes: {
          default: [
            'drag-canvas',
            'zoom-canvas',
            {
              type: 'drag-node',
              shouldBegin: e => {
                if (e.target.get('name') === 'anchor-point') return false
                return true
              }
            },
            {
              type: 'create-edge',
              trigger: 'drag',
              shouldBegin: e => {
                if (e.target && e.target.get('name') !== 'anchor-point') return false
                sourceAnchorIdx = e.target.get('anchorPointIdx')
                e.target.set('links', e.target.get('links') + 1)
                return true
              },
              shouldEnd: e => {
                if (e.target && e.target.get('name') !== 'anchor-point') return false
                if (e.target) {
                  targetAnchorIdx = e.target.get('anchorPointIdx')
                  e.target.set('links', e.target.get('links') + 1)
                  return true
                }
                targetAnchorIdx = undefined
                return true
              }
            }
          ],
        },
        layout: {
          type: 'dagre',
          rankdir: 'LR',
          nodesep: 10,
        },
        defaultNode: nodesStyle,
        defaultEdge: edgeStyle,
      });
    }
    graph.data(data);
    graph.render();

    graph.on('aftercreateedge', (e: any) => {
      graph.updateItem(e.edge, {
        sourceAnchor: sourceAnchorIdx,
        targetAnchor: targetAnchorIdx
      })
    })

    graph.on('afteradditem', (e: any) => {
      if (e.item && e.item.getType() === 'edge') {
        graph.updateItem(e.item, {
          sourceAnchor: sourceAnchorIdx,
        targetAnchor: targetAnchorIdx
        });
      }
    })

    graph.on('afterremoveitem', (e: any) => {
      if (e.item && e.item.source && e.item.target) {
      const sourceNode = graph.findById(e.item.source);
      const targetNode = graph.findById(e.item.target);
      const { sourceAnchor, targetAnchor } = e.item;
      if (sourceNode && !isNaN(sourceAnchor)) {
        const sourceAnchorShape = sourceNode.getContainer().
          find((ele: any) => (
            ele.get('name') === 'anchor-point' &&
            ele.get('anchorPointIdx') === sourceAnchor
          ));
        sourceAnchorShape.set('links', sourceAnchorShape.get('links') - 1);
      }
      if (targetNode && !isNaN(targetAnchor)) {
        const targetAnchorShape = targetNode.getContainer().
          find((ele: any) => (
            ele.get('name') === 'anchor-point' &&
            ele.get('anchorPointIdx') === targetAnchor
          ));
        targetAnchorShape.set('links', targetAnchorShape.get('links') - 1);
      }
    }
})

  }, []);

  return <div ref={ref} css={canvasStyle}></div>;
}

export default GraphCanvas
