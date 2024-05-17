// src/App.js
import React from 'react';
import './App.css';
import Profile from './components/Profile';
import DailyHabits from './components/DailyHabits';
import Recommendations from './components/Recommendations';
import Appointment from './components/Appointment';
import Summary from './components/Summary';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Habit Tracker</h1>
      </header>
      <main>
        <Profile />
        <DailyHabits />
        <Recommendations />
        <Appointment />
        <Summary />
      </main>
    </div>
  );
}

export default App;
