import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || !allowedRoles.includes(role)) {
    // Si el usuario no está autenticado o no tiene el rol adecuado, redirigir al login
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
