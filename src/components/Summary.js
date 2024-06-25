// src/components/Summary.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumbs from './Breadcrumbs'; // Importa el componente Breadcrumbs

function Summary() {
  const [summaries, setSummaries] = useState([]);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:5000/api/user/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    const fetchSummaries = async () => {
      const userId = localStorage.getItem('userId');
      try {
        const response = await axios.get(`/api/summary/${userId}`);
        setSummaries(response.data);
      } catch (error) {
        console.error('Error fetching summaries:', error);
      }
    };

    fetchUserRole();
    fetchSummaries();
  }, []);

  return (
    <div>
      <Breadcrumbs role={userRole} /> {/* Incluye el componente Breadcrumbs con el rol adecuado */}
      <h2>Appointment Summaries</h2>
      <ul>
        {summaries.map((summary, index) => (
          <li key={index}>{summary.date}: {summary.summary}</li>
        ))}
      </ul>
    </div>
  );
}

export default Summary;
