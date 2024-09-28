import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Dashboard.css'; // Import external CSS for styling

const Dashboard = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  // Simulating fetching the user's name (you can replace this with actual API call if needed)
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user')); // Assuming user data is stored in localStorage
    if (userData && userData.name) {
      setUserName(userData.name);
    }
  }, []);

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Welcome, {userName}!</h1>
      <p className="dashboard-subtitle">Choose an option below to manage your tasks:</p>
      
      <div className="dashboard-buttons">
        <button
          className="dashboard-button"
          onClick={() => navigate('/reminders')}
        >
          Manage Reminders
        </button>

        <button
          className="dashboard-button"
          onClick={() => navigate('/supplies')}
        >
          Manage Supplies
        </button>

        <button
          className="dashboard-button"
          onClick={() => navigate('/laundry')}
        >
          Laundry Queue
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
