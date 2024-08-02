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
    confirmPassword: '',
    role: 'user' // Fijamos el rol a 'user' por defecto
  });
  const [errors, setErrors] = useState({});
  const [captchaToken, setCaptchaToken] = useState(null);
  const [loading, setLoading] = useState(true); // Estado de carga
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const errors = {};
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

    if (!emailRegex.test(formData.email)) {
      errors.email = 'Email must be a valid Gmail address';
    }

    if (!passwordRegex.test(formData.password)) {
      errors.password = 'Password must be at least 8 characters long and contain at least one uppercase letter.';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!captchaToken) {
      alert('Please verify that you are not a robot.');
      return;
    }

    try {
      const response = await axios.post('http://3.235.102.184/api/auth/register', {
        ...formData,
        captchaToken
      });
      console.log('User registered with role:', formData.role); // Depuración
      localStorage.setItem('email', formData.email); // Almacenar email en localStorage
      // Inside the handleSubmit function in the Register component
navigate('/verify-account', { state: { email: formData.email } });
// Redirigir a la página de verificación
    } catch (error) {
      console.error('Error registering user:', error.response.data); // Mostrar el mensaje de error del servidor
      setErrors({ server: error.response.data.message });
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
            {errors.name && <p className="error">{errors.name}</p>}
            <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
            {errors.email && <p className="error">{errors.email}</p>}
            <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
            {errors.password && <p className="error">{errors.password}</p>}
            <input type="password" name="confirmPassword" placeholder="Confirm Password" onChange={handleChange} required />
            {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            {errors.server && <p className="error">{errors.server}</p>}
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
