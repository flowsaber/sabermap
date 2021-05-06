export const data = {
  nodes: [
    {
      id: '1',
      label: 'task1',
      inputAnchors: [],
      outputAnchors: [[1, 0.6]]
    },
    {
      id: '2',
      label: 'task2',
    },
    {
      id: '3',
      label: 'task3'
    },
    {
      id: '4',
      label: 'task4'
    },
  ],
  edges: [
    {
      source: '1',
      target: '2',
      label: 'A',
      sourceAnchor: 0,
      targetAnchor: 0,
    },
    {
      source: '1',
      target: '3',
      sourceAnchor: 0,
      targetAnchor: 0,
    },
    {
      source: '3',
      target: '4',
      sourceAnchor: 1,
      targetAnchor: 0,
    },
  ]
};
