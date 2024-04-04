export const data = {
    nodes: [
      { id: '1', group: 'team1' , value: '0'},
      { id: '2', group: 'team2' , value: '0'},
      { id: '3', group: 'team3' , value: '0'},
      { id: '4', group: 'team4' , value: '0'},
      { id: '5', group: 'team4' , value: '0'},
      { id: '6', group: 'team4' , value: '0'},
      { id: '7', group: 'team4' , value: '0'},
    ],
    links: [
      { source: '2', target: '1', value: 1 },
      { source: '3', target: '1', value: 1 },
      { source: '4', target: '1', value: 1 },
      { source: '4', target: '6', value: 1 },
      { source: '7', target: '1', value: 1 },
      { source: '7', target: '5', value: 1 },
      { source: '7', target: '4', value: 1 },
    ],
  };
  