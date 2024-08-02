import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/VerifyAccount.css';

const VerifyAccount = () => {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state ? location.state.email : null;

  useEffect(() => {
    if (!email) {
      navigate('/login'); // Redirect to login if email is not available
    }
  }, [email, navigate]);

  const handleChange = (e) => {
    setVerificationCode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://ec2-3-235-102-184.compute-1.amazonaws.com/api/auth/verify-account', { email, code: verificationCode });
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
