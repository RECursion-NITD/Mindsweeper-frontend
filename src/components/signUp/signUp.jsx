import React from 'react';
import './signUp.css';
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
    if(!formData.username || !formData.password || !formData.phoneNumber || !formData.rollNumber){
      toast('Please fill all the fields',{
        position:'bottom-center'
      })
      return
    }
    const userData = {
      username: formData.username.trim(),
      password: formData.password.trim(),
      phone_number: formData.phoneNumber.trim(),
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
      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div className="form-group">
          <input 
            type="text" 
            id="name"
            name="name" 
            placeholder='Name'
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            id="rollNumber"
            name="rollNumber" 
            placeholder='Roll Number'
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="tel" 
            id="phoneNumber"
            name="phoneNumber" 
            placeholder='Phone Number'
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="text" 
            id="username"
            name="username" 
            placeholder='Username'
            onChange={handleChange} 
            required 
          />
        </div>
        <div className="form-group">
          <input 
            type="password" 
            id="password"
            name="password" 
            placeholder='Password'
            onChange={handleChange} 
            required 
          />
        </div>
        <button className='submit-btn' type="submit" onClick={submitHandler}>Sign Up</button>
      </form>
    </>
    );
}

export default SignUp
