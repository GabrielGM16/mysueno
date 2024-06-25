// src/components/Breadcrumbs.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Breadcrumbs.css';

const Breadcrumbs = ({ role }) => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  const getDashboardPath = () => {
    switch (role) {
      case 'admin':
        return '/admin-dashboard';
      case 'specialist':
        return '/specialist-dashboard';
      case 'user':
        return '/user-dashboard';
      default:
        return '/';
    }
  };

  return (
    <nav className="breadcrumbs">
      <Link to={getDashboardPath()}>Dashboard</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        return isLast ? (
          <span key={to}>{value}</span>
        ) : (
          <Link key={to} to={to}>{value}</Link>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
