import React from 'react'
import Dashboard from '../dashboard/Dashboard';
import Leaderboard from '../leaderboard/Leaderboard';
import useAuth from '../../hooks/useAuth';
import "./navbar.css"
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const {token, logoutUser} = useAuth()
  const handelLogout = ()=>{
    if(token)
      logoutUser()
    navigate('/login')
  }
  const navigate = useNavigate();
  return (
    <div className='navbar-container'>
        <div className='container1'>
            <div className='brand'>
              Mindsweeper
            </div>
            <div className='links-container'>
              <div onClick={()=>navigate("/")} className='links'>
                Dashboard
              </div>
              <div onClick={()=>navigate("/")} className='links'>
                Rules
              </div>
              <div onClick={()=>navigate("/leaderboard")} className='links'>
                Leaderboard
              </div>
            </div>
        </div>
        <div className='container2'>
          <button className='navbar-btn' onClick={handelLogout}>
            {token? "Logout" : "Login"}
          </button>
        </div>
    </div>
  )
}

export default Navbar