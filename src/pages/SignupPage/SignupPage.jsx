// SignupPage.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    }
  };

  return (
    <form onSubmit={handleSignup}>
      <input
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
        required
      />
      <input
        type="text"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
        required
      />
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
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignupPage;
