import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumbs from './Breadcrumbs'; // Importa el componente Breadcrumbs
import './DailyHabits.css';

function DailyHabits() {
  const [sleepDuration, setSleepDuration] = useState('');
  const [mealTimes, setMealTimes] = useState('');
  const [bathroomFrequency, setBathroomFrequency] = useState('');
  const [mood, setMood] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://ec2-3-235-102-184.compute-1.amazonaws.com/api/user/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    fetchUserRole();
  }, []);

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    try {
      await axios.post('http://ec2-3-235-102-184.compute-1.amazonaws.com/api/habits', {
        userId,
        sleepDuration,
        mealTimes: mealTimes.split(','),
        bathroomFrequency,
        mood,
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setConfirmation('Habits recorded successfully!');
      // Limpiar los campos después del registro
      setSleepDuration('');
      setMealTimes('');
      setBathroomFrequency('');
      setMood('');
    } catch (error) {
      console.error('Error recording habits:', error);
      setConfirmation('Failed to record habits. Please try again.');
    }
  };

  return (
    <div className="daily-habits">
      <Breadcrumbs role={userRole} /> {/* Incluye el componente Breadcrumbs con el rol adecuado */}
      <h2>Register Daily Habits</h2>
      <input
        type="number"
        value={sleepDuration}
        onChange={(e) => setSleepDuration(e.target.value)}
        placeholder="Sleep Duration (hours)"
      />
      <input
        type="text"
        value={mealTimes}
        onChange={(e) => setMealTimes(e.target.value)}
        placeholder="Meal Times (comma separated)"
      />
      <input
        type="number"
        value={bathroomFrequency}
        onChange={(e) => setBathroomFrequency(e.target.value)}
        placeholder="Bathroom Frequency"
      />
      <select value={mood} onChange={(e) => setMood(e.target.value)}>
        <option value="">Select Mood</option>
        <option value="Ansiedad">Ansiedad</option>
        <option value="Desconcierto">Desconcierto</option>
        <option value="Asco">Asco</option>
        <option value="Enojo">Enojo</option>
        <option value="Alegría">Alegría</option>
        <option value="Tristeza">Tristeza</option>
      </select>
      <button onClick={handleSubmit}>Submit</button>
      {confirmation && <p className="confirmation">{confirmation}</p>}
    </div>
  );
}

export default DailyHabits;
