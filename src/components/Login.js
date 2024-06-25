import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      const { token, role, userId } = response.data;

      // Guardar el token y el ID del usuario en localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

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
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    
    <div className="login-page">
      <Header />
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
