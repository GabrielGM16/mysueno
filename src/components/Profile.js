// src/components/Profile.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile() {
  const [user, setUser] = useState({});

  useEffect(() => {
    // Suponiendo que el ID del usuario está almacenado en el localStorage
    const userId = localStorage.getItem('userId');
    axios.get(`/api/user/profile/${userId}`)
      .then(response => setUser(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}

export default Profile;
