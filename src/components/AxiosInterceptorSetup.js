// src/components/AxiosInterceptorSetup.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { setupInterceptors } from '../utils/axiosConfig';

const AxiosInterceptorSetup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    setupInterceptors(navigate);
  }, [navigate]);

  return null; // Este componente no renderiza nada
};

export default AxiosInterceptorSetup;
