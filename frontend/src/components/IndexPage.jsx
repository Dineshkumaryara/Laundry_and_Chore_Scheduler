import React from 'react';
import { Link } from 'react-router-dom';
import './styles/indexPage.css'; // Import the CSS file

const IndexPage = () => {
  return (
    <div className="container">
      <header>
        <h1>Laundry & Chore Scheduler</h1>
      </header>

      <div className="main-content">
        <h1>Welcome to the Laundry & Chore Scheduler</h1>
        <p>Manage your laundry tasks efficiently and set timely reminders. Never miss a chore!</p>

        <div className="buttons-container">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>

        <div className="features">
          <div className="feature">
            <h3>Laundry Queue Management</h3>
            <p>Join a virtual queue for laundry machines. Get real-time updates on availability and wait times.</p>
          </div>
          <div className="feature">
            <h3>Reminder Notifications</h3>
            <p>Set reminders for your laundry tasks, chores, and other important activities. Get notified via email.</p>
          </div>
          <div className="feature">
            <h3>User-friendly Interface</h3>
            <p>Our platform is designed to be intuitive and easy to navigate, ensuring a hassle-free experience.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndexPage;
