// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../utils/axiosConfig';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [habits, setHabits] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const habitsResponse = await axiosInstance.get(`/habits/${localStorage.getItem('userId')}`);
        const appointmentsResponse = await axiosInstance.get(`/appointments/${localStorage.getItem('userId')}`);
        setHabits(habitsResponse.data);
        setAppointments(appointmentsResponse.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Dashboard</h2>
      <div>
        <h3>Daily Habits</h3>
        {habits.map((habit) => (
          <div key={habit.id}>
            <p>Date: {habit.date}</p>
            <p>Sleep Duration: {habit.sleep_duration} hours</p>
            <p>Meal Times: {habit.meal_times}</p>
            <p>Bathroom Frequency: {habit.bathroom_frequency}</p>
            <p>Mood: {habit.mood}</p>
          </div>
        ))}
      </div>
      <div>
        <h3>Appointments</h3>
        {appointments.map((appointment) => (
          <div key={appointment.id}>
            <p>Date: {appointment.date}</p>
            <p>Specialist ID: {appointment.specialist_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;

