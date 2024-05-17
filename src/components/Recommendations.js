// src/components/Recommendations.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios.get(`/api/recommendations/${userId}`)
      .then(response => setRecommendations(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Specialist Recommendations</h2>
      <ul>
        {recommendations.map((rec, index) => (
          <li key={index}>{rec.specialistType}: {rec.specialistName}</li>
        ))}
      </ul>
    </div>
  );
}

export default Recommendations;
