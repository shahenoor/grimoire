// SignupPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import './SignupPage.scss';

const SignupPage = ({ setAuthToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/signup', {
        email,
        password,
        first_name: firstName,
        last_name: lastName,
      }, { 
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { token , user} = response.data;
      setAuthToken(token); 
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', user.id);
      navigate('/calendar'); 
    } catch (error) {
      console.error('Signup failed:', error.response?.data?.message || error.message);
      alert("Failed to create an account. Please check your information and try again.");
    }
  };

  return (
    <form onSubmit={handleSignup} className='signup-form'>
      <h1 className='signup-form__tagline'>Ready to make job tracking less of a pain ?</h1>
      <div className='signup-form__row'>
        <div className='signup-form__element'>
          <label className='signup-form__label'>First Name</label>
          <input className='signup-form__input signup-form__input--first-name' type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Please enter your first name" />
        </div>
        <div className='signup-form__element'>
          <label className='signup-form__label'>Last Name</label>
          <input className='signup-form__input signup-form__input--last-name' type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}  placeholder="Please enter your last name" />
        </div>
      </div>
     
     <div className='signup-form__row'>
      <div className='signup-form__element'>
        <label className='signup-form__label'>Email</label>
        <input className='signup-form__input signup-form__input--email' type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Please enter your email" />
      </div>
      <div className='signup-form__element'>
        <label className='signup-form__label'>Password</label>
        <input className='signup-form__input signup-form__input--password' type="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Please enter your password" />
      </div>
     </div>

     <div className='signup-form__row'>
        <div>
          <img />
          <img />
          <img />
          <img />
          <img />
          <img />
        </div>
        
        <div>

        </div>

     </div>

      <div className='signup-form__actions'>
        <button type="submit" className='signup-form__actions--button'>Sign up</button>
        <p className='signup-form__actions--text'> Already have an account?  <NavLink to='/login' className='signup-form__actions--link'>  Log in </NavLink> </p>
      </div>
     
    </form>
  );
};

export default SignupPage;
