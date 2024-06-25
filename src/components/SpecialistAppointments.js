import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumbs from './Breadcrumbs';
import '../styles/SpecialistAppointments.css';

function SpecialistAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [summary, setSummary] = useState('');
  const [userRole, setUserRole] = useState('');
  const [specialty, setSpecialty] = useState('');

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
        setSpecialty(response.data.specialty); // Assuming the specialty is part of the user profile
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
        summary,
        specialty // Include specialty in the request
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAppointments(appointments.map(appointment => 
        appointment.id === appointmentId ? { ...appointment, attended: true, summary, specialty } : appointment
      ));
      setSelectedAppointment(null); // Reset the form
      setSummary('');
    } catch (error) {
      console.error('Error attending appointment:', error);
    }
  };

  const pendingAppointments = appointments.filter(appointment => !appointment.attended);

  return (
    <div className="specialist-appointments">
      <Breadcrumbs role={userRole} />
      <h2>My Appointments</h2>
      <ul>
        {appointments.map(appointment => (
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
  );
}

export default SpecialistAppointments;
