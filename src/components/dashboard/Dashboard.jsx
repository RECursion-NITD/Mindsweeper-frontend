import React from 'react';
import './Dashboard.css';
import space from '../signUp/space.mp4';
import game1 from './game1.png';
import { useNavigate } from 'react-router-dom';
import game2 from './game2.png';
import { data } from '../game2/data';
import useAuth from '../../hooks/useAuth';
import { createGame, validate, fetchGame2 } from '../../api/game2';

const Dashboard = () => {
  const { user,token } = useAuth();
  const navigate = useNavigate(); // Initialize navigate

  const handleGameClick = (game) => {
    if (game === 'game1') {
      navigate('/game1'); // Use navigate to go to /game1
    } else if (game === 'game2') {
      // fetchGame2(token.access,user.phone_number)
      //   .then((tree)=>{
      //       console.log('tree',tree);
      //       data.nodes=tree.nodes;
      //       data.links=tree.links;
      //       console.log(data);
            
      //   });
        navigate('/game2');// Use navigate to go to /game2
    }
  };
  return (
    <>
      <div className="main">
        <video src={space} autoPlay loop muted></video>
        <div className="dashboard">
          <h1>Pick a Game</h1>
          <div className="games">
            <div className="game" onClick={() => handleGameClick('game1')}>
              <img src={game1} alt="" />
              <p>Nerdle</p>
            </div>
            <div className="game" onClick={() => handleGameClick('game2')}>
              <img src={game2} alt="" />
              <p>Constellations</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard