import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Navigate, useLocation } from 'react-router-dom'
import "./login.css"

const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const location = useLocation();
  const from = location.state?.from.pathname || "/";

  const { loginUser, token } = useAuth();

  const submitHandler = async ()=>{
    const formData = {
      username: username.trim(),
      password: password.trim(),
    };
    await loginUser(formData)
  }

  return (
    <>
      {token && <Navigate to={from} />}
      <div className='login-container'>
          <div className='login-heading'>
            Login
          </div>
          <div className='input-container'>
              <input placeholder='username' onChange={(e)=>setUsername(e.target.value)}/>
              <input placeholder='password' type='password' onChange={(e)=>setPassword(e.target.value)}/>
          </div>
          <button className='submit-btn' type='submit' onClick={submitHandler}>
              Login
          </button>
      </div>
    </>
  )
}

export default Login