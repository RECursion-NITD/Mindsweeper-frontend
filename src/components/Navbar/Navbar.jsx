import React from 'react'
import Dashboard from '../dashboard/Dashboard';
import Leaderboard from '../leaderboard/Leaderboard';
import useAuth from '../../hooks/useAuth';
import "./navbar.css"
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
  const { token, logoutUser } = useAuth()
  const handelLogout = () => {
    if (token)
      logoutUser()
    navigate('/login')
  }

  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }
  const navigate = useNavigate();
  return (
    <div className='navbar-container'>
  <div className='container1'>
    <div className='brand'>Mindsweeper</div>
    <div className='menu-icon' onClick={() => setShowNavbar(!showNavbar)}>
      <FontAwesomeIcon icon={faBars} />
    </div>
    <div className={`nav-elements  ${showNavbar && 'active'}`}>
      <ul>
        <li>
          <NavLink to="/" className='links'>Dashboard</NavLink>
        </li>
        <li>
          <NavLink to="/" className='links'>Rules</NavLink>
        </li>
        <li>
          <NavLink to="/leaderboard" className='links'>Leaderboard</NavLink>
        </li>
      </ul>
      {/* <div onClick={()=>navigate("/leaderboard")} className='links'>Leaderboard</div> */}
    </div>
  </div>
  <div className='container2'>
    <button className='navbar-btn' onClick={handelLogout}>
      {token ? "Logout" : "Login"}
    </button>
  </div>
</div>

  )
}

export default Navbar

{/* <div className='links-container'>
              <div onClick={()=>navigate("/")} className='links'>
                Dashboard
              </div>
              <div onClick={()=>navigate("/")} className='links'>
                Rules
              </div>
              <div onClick={()=>navigate("/leaderboard")} className='links'>
                Leaderboard
              </div>
            </div> */}