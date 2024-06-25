import React from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import GlobalSearch from './GlobalSearch';
import logoImage from '../imgs/logor.png'; // Ajusta la ruta a tu imagen
import '../styles/AdminDashboard.css';

const adminRoutes = [
  { name: 'Book an Appointment', path: '/appointment' },
  { name: 'Register Daily Habits', path: '/daily-habits' },
  { name: 'User Profile', path: '/profile' },
  { name: 'Specialist Recommendations', path: '/recommendations' },
  { name: 'Dashboard', path: '/dashboard' },
  { name: 'Register New User', path: '/register' },
  { name: 'View Summary', path: '/summary' },
];

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <header className="dashboard-header">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src={logoImage} alt="Habit Tracker Logo" className="logo-image" />
            </Link>
            <h1>Habit Tracker</h1>
          </div>
          <div className="search-bar">
            <GlobalSearch routes={adminRoutes} />
          </div>
        </div>
      </header>
      <Breadcrumbs />
      <h2>Welcome, Admin!</h2>
      <div className="dashboard-options">
        {adminRoutes.map(route => (
          <Link key={route.path} to={route.path} className="dashboard-option">
            <button>{route.name}</button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
