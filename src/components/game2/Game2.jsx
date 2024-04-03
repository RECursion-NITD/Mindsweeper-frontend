import React from 'react'
import { NetworkDiagram } from './NetworkDiagram';
import { data } from './data';

const Game2 = () => {
    function handleClick(event){
        console.log(data);
    }

    const handleBtnClick = (event) => {
        handleClick(event);
    }
    return (
        <div>
            <NetworkDiagram data={data} width={800} height={800} />
        </div>
    )
}

export default Game2