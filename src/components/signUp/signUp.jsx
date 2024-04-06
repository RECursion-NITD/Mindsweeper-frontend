import React from 'react';
import './signUp.css';
import space from './space.mp4';
import spacegif from './spacegif.mp4'
import useAuth from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function SignUp() {
    const [formData, setFormData] = React.useState({
        name: '',
        rollNumber: '',
        phoneNumber: '',
        username: '',
        password: ''
    });
    
  const { signupUser } = useAuth();
  
  const navigate = useNavigate();

  const submitHandler = async () => {
    const userData = {
      username: formData.username,
      password: formData.password,
      phone_number: formData.phoneNumber,
    };
  
    try {
      await signupUser(userData);
      navigate('/');
    } catch (error) {
      console.error('Error occurred during signup:', error);
      toast.error(error.response.data.error);
      // Handle the error appropriately
    }
  };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to server
        console.log(formData);
        // Reset form after submission
        setFormData({
            name: '',
            rollNumber: '',
            phoneNumber: '',
            username: '',
            password: ''
        });
    };

    return (
        <>
        <ToastContainer />
        <div className="main">
            <video src={spacegif} autoPlay loop muted></video>
            <div className="signUp">
            <div className="header">
                <h1>Mind</h1>
                <div className="btm">
                    <h1>Sweepers</h1>
                    <p>2024</p>
                </div>
            </div>
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name"
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="rollNumber">Roll Number:</label>
          <input 
            type="text" 
            id="rollNumber"
            name="rollNumber" 
            value={formData.rollNumber} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input 
            type="tel" 
            id="phoneNumber"
            name="phoneNumber" 
            value={formData.phoneNumber} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input 
            type="text" 
            id="username"
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input 
            type="password" 
            id="password"
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>
        <button type="submit" onClick={submitHandler}>Sign Up</button>
      </form>
    </div>
        </div>
        </>
    );
}

export default SignUp
