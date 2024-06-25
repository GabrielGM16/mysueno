import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from '../imgs/logor.png'; // Ajusta la ruta a tu logo
import '../styles/Header.css'; // Crea y ajusta la ruta a tu archivo de estilos

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">
          <img src={logoImage} alt="Habit Tracker Logo" className="logo-image" />
        </Link>
        <h1>Habit Tracker</h1>
      </div>
      <nav className="nav">
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <ul className={menuOpen ? 'menu open' : 'menu'}>
          <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
          <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>Contact us</Link></li>
          <li><Link to="/profile" onClick={toggleMenu}>Profile</Link></li>
          <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
