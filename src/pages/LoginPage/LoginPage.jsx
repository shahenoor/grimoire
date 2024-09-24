// LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, NavLink } from 'react-router-dom';
import './LoginPage.scss';

const LoginPage = ({ setAuthToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/users/login', { email, password }, { 
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const { token, user} = response.data;
      setAuthToken(token); 
      localStorage.setItem('authToken', token);
      localStorage.setItem('userId', user.id);
      navigate('/calendar'); 
    } catch (error) {
      console.error('Login failed:', error.response?.data?.message || error.message);
      alert("Login failed. Please check your email and password and try again.");
    }
  };

  return (
   
    <form onSubmit={handleLogin} className='login-form'>
      <h1 className='login-form__tagline'> Ready to Stay on Top of Your Job Hunt ? Log In!</h1>
      <div className='login-form__row'>
        <div className='login-form__element'>
          <label className='login-form__label'>Email</label>
          <input className='login-form__input login-form__input--email' type="email" value={email} onChange={(e) => setEmail(e.target.value)}  placeholder="Please enter your email" />
        </div>
        <div className='login-form__element'>
          <label className='login-form__label'>Password</label>
          <input className='login-form__input login-form__input--password' type="password" value={password} onChange={(e) => setPassword(e.target.value)}  placeholder="Please enter your password" />
        </div>
      </div>

      <div className='login-form__actions'>
        <button type="submit" className='login-form__actions--button'>Log in</button>
        <p className='login-form__actions--text'> Don't have an account ?  <NavLink to='/signup' className='signup-form__actions--link'>  Sign up </NavLink> </p>
      </div>
    </form>
  );
};

export default LoginPage;
