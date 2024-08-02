import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/VerifyAccount.css';

const VerifyLoginCode = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const email = localStorage.getItem('email');
      if (!email) {
        throw new Error('Email not found in localStorage');
      }

      const response = await axios.post('http://ec2-3-235-102-184.compute-1.amazonaws.com/api/auth/verify-code', { email, code: verificationCode });
      const { token, role, userId } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.removeItem('email'); // Clear email from localStorage

      console.log('Role received:', role); // Debugging

      if (role === 'user') {
        navigate('/user-dashboard');
      } else if (role === 'admin') {
        navigate('/admin-dashboard');
      } else if (role === 'specialist') {
        navigate('/specialist-dashboard');
      } else {
        console.error('Unrecognized role:', role);
      }
    } catch (error) {
      console.error('Error verifying code:', error);
      setError('Error verifying code. Please try again.');
    }
  };

  return (
    <div className="verify-page">
      <Header />
      <div className="verify-container">
        <h2>Verify Your Code</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Verification Code"
            value={verificationCode}
            onChange={handleChange}
            required
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Verify</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyLoginCode;
