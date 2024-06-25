import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const InactivityHandler = ({ children }) => {
  const navigate = useNavigate();
  const logoutTimer = useRef(null);
  const warningTimer = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('No token found, skipping inactivity handler');
      return; // No hacer nada si no hay un token de sesión
    }

    const resetTimers = () => {
      console.log('Resetting timers');
      clearTimeout(logoutTimer.current);
      clearTimeout(warningTimer.current);

      warningTimer.current = setTimeout(() => {
        console.log('Inactivity warning: You will be logged out in 10 seconds.');
        alert('You will be logged out in 60 seconds due to inactivity.');
      }, 1200000); // 60 seconds of inactivity

      logoutTimer.current = setTimeout(() => {
        handleLogout();
      }, 150000); // 15 seconds of inactivity
    };

    const handleLogout = () => {
      console.log('Logging out due to inactivity');
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      navigate('/login');
    };

    const handleActivity = () => {
      console.log('User activity detected');
      resetTimers();
    };

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keypress', handleActivity);

    resetTimers(); // Inicializa los temporizadores al montar el componente

    return () => {
      console.log('Cleaning up timers and event listeners');
      clearTimeout(logoutTimer.current);
      clearTimeout(warningTimer.current);
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, [navigate]);

  return <>{children}</>;
};

export default InactivityHandler;
