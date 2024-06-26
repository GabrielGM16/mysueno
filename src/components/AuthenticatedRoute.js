import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('token');

  return token ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default AuthenticatedRoute;
