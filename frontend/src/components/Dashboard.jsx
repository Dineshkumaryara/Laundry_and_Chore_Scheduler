import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>User Dashboard</h1>
      <p>Welcome to your dashboard! Choose an option below:</p>
      
      <button
        style={{ padding: '10px 20px', margin: '10px' }}
        onClick={() => navigate('/reminders')}
      >
        Manage Reminders
      </button>

      <button
        style={{ padding: '10px 20px', margin: '10px' }}
        onClick={() => navigate('/supplies')}
      >
        Manage Supplies
      </button>

      <button
        style={{ padding: '10px 20px', margin: '10px' }}
        onClick={() => navigate('/laundry')}
      >
        Laundry Queue
      </button>
    </div>
  );
};

export default Dashboard;
