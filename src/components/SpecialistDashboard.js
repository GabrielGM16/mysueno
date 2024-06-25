import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';
import GlobalSearch from './GlobalSearch';
import logoImage from '../imgs/logor.png';
import '../styles/SpecialistDashboard.css';

const specialistRoutes = [
  
  { name: 'User Profile', path: '/profile' },

  { name: 'View Appointments', path: '/specialist-appointments' },
  
];

const SpecialistDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [summary, setSummary] = useState('');
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

    const fetchAppointments = async () => {
      const specialistId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://localhost:5000/api/appointments/${specialistId}/appointments`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchUserRole();
    fetchAppointments();
  }, []);

  const handleAttend = async (appointmentId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.patch(`http://localhost:5000/api/appointments/${appointmentId}/attend`, {
        summary
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAppointments(appointments.map(appointment => 
        appointment.id === appointmentId ? { ...appointment, attended: true, summary } : appointment
      ));
      setSelectedAppointment(null); // Resetear el formulario
      setSummary('');
    } catch (error) {
      console.error('Error attending appointment:', error);
    }
  };

  const pendingAppointments = appointments.filter(appointment => !appointment.attended);

  return (
    <div className="specialist-dashboard">
      <header className="dashboard-header">
        <div className="container">
          <div className="logo">
            <Link to="/">
              <img src={logoImage} alt="Habit Tracker Logo" className="logo-image" />
            </Link>
            <h1>Habit Tracker</h1>
          </div>
          <div className="search-bar">
            <GlobalSearch routes={specialistRoutes} />
          </div>
        </div>
      </header>
      <Breadcrumbs role={userRole} />
      <h2>Welcome, Specialist!</h2>
      <div className="dashboard-options">
        {specialistRoutes.map(route => (
          <Link key={route.path} to={route.path} className="dashboard-option">
            <button>{route.name}</button>
          </Link>
        ))}
      </div>
      <div className="pending-appointments">
        <h3>Pending Appointments</h3>
        <ul>
          {pendingAppointments.map(appointment => (
            <li key={appointment.id}>
              <p>Date: {appointment.date}</p>
              <p>Patient: {appointment.userName}</p>
              <p>Reason: {appointment.reason}</p>
              <p>Attended: {appointment.attended ? 'Yes' : 'No'}</p>
              {!appointment.attended && (
                <>
                  <button onClick={() => setSelectedAppointment(appointment.id)}>Attend</button>
                  {selectedAppointment === appointment.id && (
                    <div>
                      <textarea 
                        value={summary}
                        onChange={(e) => setSummary(e.target.value)}
                        placeholder="Enter session summary"
                      />
                      <button onClick={() => handleAttend(appointment.id)}>Submit Summary</button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default SpecialistDashboard;
