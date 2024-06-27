import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    try {
      const response = await axios.post('https://back-end-sueno.onrender.com/api/auth/forgot-password', { email });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      setError('Error sending password reset email. Please try again.');
    }
  };

  return (
    <div className="forgot-password-page">
      <Header />
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={handleChange} required />
          <button type="submit">Send Reset Link</button>
        </form>
        {message && <p className="success">{message}</p>}
        {error && <p className="error">{error}</p>}
      </div>
      <Footer />
    </div>
  );
};

export default ForgotPassword;
