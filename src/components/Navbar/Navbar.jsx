import React, { useState } from 'react'
import Dashboard from '../dashboard/Dashboard';
import Leaderboard from '../leaderboard/Leaderboard';
import useAuth from '../../hooks/useAuth';
import "./navbar.css"
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {token, logoutUser, user} = useAuth()
  const [active, setActive] = useState(false)
  const handelLogout = ()=>{
    if(token)
      logoutUser()
    navigate('/login')
  }
  const navigate = useNavigate();
  return (
    <div>

      <div className='navbar-container'>
          <div className='container1'>
              <div className='brand'>
                Mindsweeper
              </div>
              <div className='links-container active'>
                <div onClick={()=>navigate("/")} className='links'>
                  Dashboard
                </div>
                <div onClick={()=>navigate("/rules")} className='links'>
                  Rules
                </div>
                <div onClick={()=>navigate("/leaderboard")} className='links'>
                  Leaderboard
                </div>
              </div>
          </div>
          <div className="containerPhone">
              <button onClick={(e)=>setActive(!active)}>
                Open
              </button>
          </div>
          <div className='container2'>
            {
              token && (
                <div className='points'>
                  {user?.points} pts
                </div>
              )
            }
            <button className='navbar-btn' onClick={handelLogout}>
              {token? "Logout" : "Login"}
            </button>
          </div>

      </div>
          {
            active && (
              <div className='open'>
                <div onClick={()=>navigate("/")} className='links'>
                  Dashboard
                </div>
                <div onClick={()=>navigate("/rules")} className='links'>
                  Rules
                </div>
                <div onClick={()=>navigate("/leaderboard")} className='links'>
                  Leaderboard
                </div>
              </div>
            )
          }
    </div>
  )
}

export default Navbar