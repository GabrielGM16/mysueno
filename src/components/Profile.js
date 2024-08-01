import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs'; // Importa el componente Breadcrumbs
import '../styles/Profile.css'; // Importa el archivo CSS

function Profile() {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (userId && token) {
      axios.get(`http://ec2-54-208-245-218.compute-1.amazonaws.com/api/user/profile/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        console.log(response.data);
        setUser(response.data);
      })
      .catch(error => console.error(error));
    }
  }, []);

  const handleLogout = () => {
    console.log('Logging out');
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login'); // Redirige al usuario a la página de inicio de sesión
  };

  return (
    <div className="profile-container">
      <Breadcrumbs role={user.role} /> {/* Pasa el rol del usuario a Breadcrumbs */}
      <h2>User Profile</h2>
      <div className="profile-details">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Role:</strong> {user.role}</p>
      </div>
      <button onClick={handleLogout} className="logout-button">Cerrar Sesión</button>
    </div>
  );
}

export default Profile;
