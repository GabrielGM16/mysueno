// src/components/DailyHabits.js
import React, { useState } from 'react';
import axios from 'axios';
import './DailyHabits.css';  // Importa el archivo CSS

function DailyHabits() {
  const [sleepDuration, setSleepDuration] = useState('');
  const [mealTimes, setMealTimes] = useState('');
  const [bathroomFrequency, setBathroomFrequency] = useState('');
  const [mood, setMood] = useState('');

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId');
    await axios.post('/api/habits', {
      userId,
      sleepDuration,
      mealTimes: mealTimes.split(','),
      bathroomFrequency,
      mood,
    });
  };

  return (
    <div className="daily-habits">
      <h2>Register Daily Habits</h2>
      <input type="number" value={sleepDuration} onChange={(e) => setSleepDuration(e.target.value)} placeholder="Sleep Duration (hours)" />
      <input type="text" value={mealTimes} onChange={(e) => setMealTimes(e.target.value)} placeholder="Meal Times (comma separated)" />
      <input type="number" value={bathroomFrequency} onChange={(e) => setBathroomFrequency(e.target.value)} placeholder="Bathroom Frequency" />
      <input type="text" value={mood} onChange={(e) => setMood(e.target.value)} placeholder="Mood" />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default DailyHabits;

