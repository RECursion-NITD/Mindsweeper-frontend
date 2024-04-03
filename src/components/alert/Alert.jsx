import React from 'react';
import './Alert.css';
const Alert = ({heading, points, setGameOver}) => {
  return (
    <div className='alert-container'>
        <div className='alert'>
            <div className='close-container'>
                <button onClick={(e)=> setGameOver(false)}>
                    X
                </button>
            </div>
            <div className='heading-alert'>
                {heading}
            </div>
            <div className='points-alert'>
                Points Recieved: {points}
            </div>
        </div>
    </div>
  )
}

export default Alert