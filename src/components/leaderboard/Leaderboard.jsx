import React, { useEffect, useState } from 'react'
import Loader from '../loader/Loader'
import { ranking } from '../../api/leaderboard';
import './leaderboard.css'

const Leaderboard = () => {
  const [rankings, setRankings] = useState([])
  useEffect(() => {
    ranking().then((data) => {
      setRankings(data.rankings)
      console.log(data)
    })
  },[])
  return (
    <div className='main-container'>
      <div className='main-leaderboard'>
        <h1>Leaderboard</h1>
        {rankings.length === 0 ? <Loader /> : (
          <div className='entry-container'>
            <div className='entry-head'>
              <div>Username</div>
              <div>Points</div>
            </div>
            <div className='entry-div'>
              {rankings.map((ranking, index) => (
                <div className='entry' key={index}>
                  <div className='username'>
                    <div className='sl'>
                      {index+1}.
                    </div>
                    {ranking.username}
                  </div>
                  <div className='points-entry'>{ranking.points}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Leaderboard