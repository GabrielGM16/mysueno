// src/components/Summary.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Summary() {
  const [summaries, setSummaries] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    axios.get(`/api/summary/${userId}`)
      .then(response => setSummaries(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
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
