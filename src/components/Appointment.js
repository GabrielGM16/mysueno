// src/components/Appointment.js
import React, { useState } from 'react';
import axios from 'axios';

function Appointment() {
  const [specialistId, setSpecialistId] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId');
    await axios.post('/api/appointments', {
      userId,
      specialistId,
      date,
    });
  };

  return (
    <div>
      <h2>Book an Appointment</h2>
      <input type="text" value={specialistId} onChange={(e) => setSpecialistId(e.target.value)} placeholder="Specialist ID" />
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      <button onClick={handleSubmit}>Book</button>
    </div>
  );
}

export default Appointment;
