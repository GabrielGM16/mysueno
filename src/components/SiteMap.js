import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/SiteMap.css';

const SiteMap = () => {
  return (
    <div className="sitemap-container">
      <h2>Site Map</h2>
      <div className="card-container">
        <div className="card">
          <Link to="/">Home</Link>
        </div>
        <div className="card">
          <Link to="/about">About</Link>
        </div>
        <div className="card">
          <Link to="/register">Register</Link>
        </div>
        <div className="card">
          <Link to="/login">Login</Link>
        </div>
        <div className="card">
          <Link to="/contact">Contact us</Link>
        </div>
        {/* Agrega más tarjetas según las rutas de tu aplicación */}
      </div>
    </div>
  );
};

export default SiteMap;
