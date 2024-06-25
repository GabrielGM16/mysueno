import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ErrorPage.css';

const ErrorPage = () => {
  const location = useLocation();
  const error = location.state?.error || 'Unknown error';

  return (
    <div className="error-page">
      <img src="https://i0.wp.com/www.silocreativo.com/wp-content/uploads/2017/11/error-404-web-creativa.gif?resize=600%2C323&quality=100&strip=all&ssl=1" alt="Error 404" />
      <h1>Error Occurred</h1>
      <p>{error}</p>
      <button onClick={() => window.history.back()}>Go Back</button>
    </div>
  );
};

export default ErrorPage;
