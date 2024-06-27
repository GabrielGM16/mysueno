import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', code: '' });
  const [step, setStep] = useState(1);
  const [error, setError] = useState(null); // State for errors
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      if (step === 1) {
        const response = await axios.post('https://back-end-sueno.onrender.com/api/auth/login', { email: formData.email, password: formData.password });
        localStorage.setItem('email', formData.email); // Store email for the next step
        setFormData({ ...formData, password: '' }); // Clear password after the first step
        setStep(2);
      } else if (step === 2) {
        const email = localStorage.getItem('email');
        const response = await axios.post('https://back-end-sueno.onrender.com/api/auth/verify-code', { email, code: formData.code });
        const { token, role, userId } = response.data;

        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        // Redirect to the appropriate dashboard based on role
        if (role === 'user') {
          navigate('/user-dashboard');
        } else if (role === 'admin') {
          navigate('/admin-dashboard');
        } else if (role === 'specialist') {
          navigate('/specialist-dashboard');
        } else {
          console.error('Rol no reconocido:', role);
        }
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setError('Invalid email or password.'); // Set error message
    }
  };

  return (
    <div className="login-page">
      <Header />
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {step === 1 ? (
            <>
              <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            </>
          ) : (
            <>
              <input type="text" name="code" placeholder="Verification Code" value={formData.code} onChange={handleChange} required />
            </>
          )}
          <button type="submit">{step === 1 ? 'Next' : 'Verify'}</button>
        </form>
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <p><Link to="/forgot-password">Forgot your password?</Link></p>
          </div>
        )}
        {step === 1 && (
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Login;
