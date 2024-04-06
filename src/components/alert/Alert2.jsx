import React from 'react';
import './Alert.css';
const Alert2 = ({heading, setGameOver}) => {
  return (
    <div className='alert-container'>
        <div className='alert2'>
            <div className='close-container'>
                <button onClick={(e)=> setGameOver(false)}>
                    X
                </button>
            </div>
            <div className='heading-alert'>
                {heading}
            </div>
        </div>
    </div>
  )
}

export default Alert2