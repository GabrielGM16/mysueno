import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '', code: '' });
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (step === 1) {
        await axios.post('https://back-end-sueno.onrender.com/api/auth/login', { email: formData.email, password: formData.password });
        setFormData({ ...formData, password: '' }); // Limpiar la contraseña después del primer paso
        setStep(2);
        setError(''); // Limpiar errores si el login es exitoso
      } else if (step === 2) {
        const response = await axios.post('https://back-end-sueno.onrender.com/api/auth/verify-code', { email: formData.email, code: formData.code });
        const { token, role, userId } = response.data;

        // Guardar el token y el ID del usuario en localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('role', role);

        // Depuración: Imprimir el rol recibido
        console.log('Role received in frontend:', role);

        // Redirigir al dashboard correspondiente basado en el rol
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
      if (step === 1) {
        setError('Invalid email or password. Forgot your password?');
      } else if (step === 2) {
        setError('Invalid verification code. Please try again.');
      }
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
              {error && (
                <div className="error">
                  {error}
                  <Link to="/forgot-password" className="forgot-password-link">Reset Password</Link>
                </div>
              )}
            </>
          ) : (
            <>
              <input type="text" name="code" placeholder="Verification Code" value={formData.code} onChange={handleChange} required />
              {error && <div className="error">{error}</div>}
            </>
          )}
          <button type="submit">{step === 1 ? 'Next' : 'Login'}</button>
        </form>
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
