import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumbs from './Breadcrumbs';
import '../styles/Appointment.css';

function Appointment() {
  const [specialties, setSpecialties] = useState([]);
  const [specialists, setSpecialists] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedSpecialist, setSelectedSpecialist] = useState('');
  const [date, setDate] = useState('');
  const [reason, setReason] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    const fetchUserRole = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`https://back-end-sueno.onrender.com/api/user/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserRole(response.data.role);
      } catch (error) {
        console.error('Error fetching user role:', error);
      }
    };

    const fetchSpecialties = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('https://back-end-sueno.onrender.com/api/specialists/specialties', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSpecialties(response.data);
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };

    fetchUserRole();
    fetchSpecialties();
  }, []);

  const handleSpecialtyChange = async (e) => {
    setSelectedSpecialty(e.target.value);
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`https://back-end-sueno.onrender.com/api/specialists/${e.target.value}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setSpecialists(response.data);
    } catch (error) {
      console.error('Error fetching specialists:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    try {
      await axios.post('https://back-end-sueno.onrender.com/api/appointments', {
        userId,
        specialistId: selectedSpecialist,
        date,
        reason
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setConfirmation('Appointment booked successfully!');
      setSelectedSpecialty('');
      setSelectedSpecialist('');
      setDate('');
      setReason('');
    } catch (error) {
      console.error('Error booking appointment:', error);
      setConfirmation('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="appointment">
      <Breadcrumbs role={userRole} />
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <select value={selectedSpecialty} onChange={handleSpecialtyChange} required>
          <option value="">Select Specialty</option>
          {specialties.map(specialty => (
            <option key={specialty.specialty} value={specialty.specialty}>
              {specialty.specialty}
            </option>
          ))}
        </select>
        {selectedSpecialty && (
          <select value={selectedSpecialist} onChange={(e) => setSelectedSpecialist(e.target.value)} required>
            <option value="">Select Specialist</option>
            {specialists.map(specialist => (
              <option key={specialist.id} value={specialist.id}>
                {specialist.name}
              </option>
            ))}
          </select>
        )}
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Reason for appointment"
          required
        />
        <button type="submit">Book</button>
      </form>
      {confirmation && <p className="confirmation">{confirmation}</p>}
    </div>
  );
}

export default Appointment;
