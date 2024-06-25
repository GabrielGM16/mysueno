import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Footer.css'; // Crea y ajusta la ruta a tu archivo de estilos

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Habit Tracker. All rights reserved.</p>
      <p><Link to="/contact">Contact Us</Link> | <Link to="/privacy">Privacy Policy</Link></p>
    </footer>
  );
};

export default Footer;
