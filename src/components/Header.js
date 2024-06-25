import React from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../imgs/logor.png'; // Ajusta la ruta a tu logo
import '../styles/Header.css'; // Crea y ajusta la ruta a tu archivo de estilos

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logoImage} alt="Habit Tracker Logo" className="logo-image" />
        </Link>
        <h1>Habit Tracker</h1>
      </div>
      <nav className="nav">
        <ul>
        <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact us</Link></li>
          <li><Link to="/profile">Profile</Link></li>
          <li><Link to="/login">Login</Link></li>

          
          
        </ul>
      </nav>
    </header>
  );
};

export default Header;
