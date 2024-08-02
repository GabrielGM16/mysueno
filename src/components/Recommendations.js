import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Breadcrumbs from './Breadcrumbs';
import '../styles/Recommendations.css';

function Recommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [filter, setFilter] = useState('');
  const [specialties, setSpecialties] = useState([]);

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

    const fetchRecommendations = async () => {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get(`http://ec2-3-235-102-184.compute-1.amazonaws.com/api/appointments/${userId}/recommendations`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    const fetchSpecialties = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://ec2-3-235-102-184.compute-1.amazonaws.com/api/specialists/specialties', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setSpecialties(response.data.map(s => s.specialty));
      } catch (error) {
        console.error('Error fetching specialties:', error);
      }
    };

    fetchUserRole();
    fetchRecommendations();
    fetchSpecialties();
  }, []);

  const filteredRecommendations = filter
    ? recommendations.filter(recommendation => recommendation.specialty === filter)
    : recommendations;

  return (
    <div className="recommendations">
      <div className="recommendations-content">
        <Breadcrumbs role={userRole} />
        <h2>Session Summaries</h2>
        <div>
          <label htmlFor="filter">Filter by Specialist: </label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">All</option>
            {specialties.map((specialty, index) => (
              <option key={index} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
        <ul>
          {filteredRecommendations.map((recommendation, index) => (
            <li key={index}>
              <p>Date: {recommendation.date}</p>
              <p>Summary: {recommendation.summary}</p>
              <p>Specialty: {recommendation.specialty}</p> {/* Display the specialist's specialty */}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Recommendations;

