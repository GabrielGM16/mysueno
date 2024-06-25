import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import GlobalSearch from './GlobalSearch';
import { Line } from 'react-chartjs-2';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import logoImage from '../imgs/logor.png';
import '../styles/UserDashboard.css';

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const accessibleRoutes = [
  { name: 'Book an Appointment', path: '/appointment' },
  { name: 'Register Daily Habits', path: '/daily-habits' },
  { name: 'User Profile', path: '/profile' },
  { name: 'Specialist Recommendations', path: '/recommendations' },
  
];

const UserDashboard = () => {
  const [habitsData, setHabitsData] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchHabitsData = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:5000/api/habits/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setHabitsData(response.data);
      } catch (error) {
        console.error('Error fetching habits data:', error);
      }
    };

    const fetchRecommendations = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:5000/api/habits/recommendations/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRecommendations(response.data.recommendations);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchHabitsData();
    fetchRecommendations();
  }, []);

  const chartData = {
    labels: habitsData.map(habit => habit.date).filter(date => date),
    datasets: [
      {
        label: 'Sleep Duration',
        data: habitsData.map(habit => habit.sleep_duration).filter(duration => duration != null),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Bathroom Frequency',
        data: habitsData.map(habit => habit.bathroom_frequency).filter(frequency => frequency != null),
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
    ],
  };

  return (
    <div className="user-dashboard">
      <header className="dashboard-header">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src={logoImage} alt="Habit Tracker Logo" className="logo-image" />
            </Link>
            <h1>Habit Tracker</h1>
          </div>
          <div className="search-bar">
            <GlobalSearch routes={accessibleRoutes} />
          </div>
        </div>
      </header>
      <Breadcrumbs />
      <h2>Welcome, User!</h2>
      <div className="dashboard-options">
        {accessibleRoutes.map(route => (
          <Link key={route.path} to={route.path} className="dashboard-option">
            <button>{route.name}</button>
          </Link>
        ))}
      </div>
      <div className="chart-container">
        <h3>Daily Habits Overview</h3>
        <Line data={chartData} />
      </div>
      <div className="recom">
        <h3>Specialist Recommendations</h3>
        {recommendations.length > 0 ? (
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        ) : (
          <p>No recommendations at this time.</p>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
