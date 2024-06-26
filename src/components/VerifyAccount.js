import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/VerifyAccount.css';

const VerifyAccount = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://back-end-sueno.onrender.com/api/auth/verify', { verificationCode });
      if (response.data.message === 'Account verified successfully') {
        navigate('/login');
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error('Error verifying account:', error);
      setError('Error verifying account. Please try again.');
    }
  };

  return (
    <div className="verify-page">
      <Header />
      <div className="verify-container">
        <h2>Verify Your Account</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Verification Code" value={verificationCode} onChange={handleChange} required />
          {error && <p className="error">{error}</p>}
          <button type="submit">Verify</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyAccount;
