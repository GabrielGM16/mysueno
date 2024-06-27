import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Updated import statement

const ProtectedRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const { role } = decodedToken;

    if (allowedRoles.includes(role)) {
      return <Outlet />;
    } else {
      return <Navigate to="/unauthorized" />;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
