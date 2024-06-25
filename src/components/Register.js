import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user' // Fijamos el rol a 'user' por defecto
  });
  const [captchaToken, setCaptchaToken] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!captchaToken) {
      alert('Please verify that you are not a robot.');
      return;
    }

    try {
      await axios.post('https://back-end-sueno.onrender.com/api/auth/register', {
        ...formData,
        captchaToken
      });
      console.log('User registered with role:', formData.role); // Depuración
      navigate('/login');
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  const loadReCaptcha = () => {
    window.grecaptcha.ready(() => {
      window.grecaptcha.execute('6LdrZ_spAAAAAAFRRaRQcDhBSJ8G-WWCGO_nlYhV', { action: 'submit' }).then((token) => {
        setCaptchaToken(token);
        setLoading(false); // Desactivar el estado de carga
      });
    });
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=6LdrZ_spAAAAAAFRRaRQcDhBSJ8G-WWCGO_nlYhV`;
    script.async = true;
    script.onload = loadReCaptcha;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="register-page">
      <Header />
      <div className="register-container">
        <h2>Register</h2>
        {loading ? (
          <p>Loading reCAPTCHA...</p> // Indicador de carga
        ) : (
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            <button type="submit">Register</button>
          </form>
        )}
        <p className="login-link">
        Do you already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
