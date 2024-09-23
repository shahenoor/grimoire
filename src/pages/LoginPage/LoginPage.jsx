// LoginPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
