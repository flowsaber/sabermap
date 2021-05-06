import G6 from '@antv/g6';

export const nodesStyle = {
    type: 'task',
    labelCfg: {
      style: {
        fill: '#ffffff',
        fontSize: 15,
      },
      position: "bottom",
    },
    style: {
      stroke: '#aaaaaa',
      width: 350,
    }
}


const textXML = (cfg) => `
<group>
  <rect style={{
      width: 100, height: 20, fill: '#1890ff', stroke: '#1890ff', radius: [6, 6, 0, 0]
    }}
    draggable="true">
    <text style={{ marginTop: 2, marginLeft: 50, 
			textAlign: 'center',
			fontWeight: 'bold', 
			fill: '#fff' }}
      draggable="true">${cfg.id}: ${cfg.label}</text>
  </rect>
  <rect style={{ width: 100, height: 40,
                 fill: 'rgba(24,144,255,0.15)', 
		             radius: [0, 0, 6, 6] }} 
    >
  </rect>
</group>
`;


export const registerTaskNode = () => {
  G6.registerNode('task', {
    jsx: textXML,

    getAnchorPoints: function(cfg) {
      let anchors = []
      let inAnc = cfg.inputAnchors
      if (inAnc) {
        anchors.push(...inAnc)
      } else {
        anchors.push([0, 0.6])
      }
      let outAnc = cfg.outputAnchors
      if (outAnc) {
        anchors.push(...outAnc)
      } else {
        anchors.push([1, 0.6])
      }
      return anchors
    },

    afterDraw (cfg, group) {
      const bbox = group.getBBox();
      const anchorPoints = this.getAnchorPoints(cfg)
      anchorPoints.forEach((anchorPos, i) => {
        group.addShape('circle', {
          attrs: {
            r: 5,
            x: bbox.x + bbox.width * anchorPos[0],
            y: bbox.y + bbox.height * anchorPos[1],
            fill: '#fff',
            stroke: '#5F95FF'
          },
          name: `anchor-point`, // the name, for searching by group.find(ele => ele.get('name') === 'anchor-point')
          anchorPointIdx: i, // flag the idx of the anchor-point circle
          links: 0, // cache the number of edges connected to this shape
          visible: true, // invisible by default, shows up when links > 1 or the node is in showAnchors state
          draggable: true // allow to catch the drag events on this shape
        })
      })
    },

  });
}
