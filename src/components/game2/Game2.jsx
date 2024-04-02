import React from 'react'
import { NetworkDiagram } from './NetworkDiagram';
import { data } from './data';

const Game2 = () => {
  return (
    <div>
      <NetworkDiagram data={data} width={800} height={800} />
    </div>
  )
}

export default Game2