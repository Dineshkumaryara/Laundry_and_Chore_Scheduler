import React from 'react';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  return (
    <div style={containerStyle}>
      <header style={headerStyle}>
        <h1>Laundry & Chore Scheduler</h1>
      </header>

      <div style={mainContentStyle}>
        <h1>Welcome to the Laundry & Chore Scheduler</h1>
        <p>Manage your laundry tasks efficiently and set timely reminders. Never miss a chore!</p>

        <div style={buttonsContainerStyle}>
          <Link to="/login" style={buttonStyle}>Login</Link>
          <Link to="/register" style={buttonStyle}>Register</Link>
        </div>

        <div style={featuresStyle}>
          <div style={featureStyle}>
            <h3>Laundry Queue Management</h3>
            <p>Join a virtual queue for laundry machines. Get real-time updates on availability and wait times.</p>
          </div>
          <div style={featureStyle}>
            <h3>Reminder Notifications</h3>
            <p>Set reminders for your laundry tasks, chores, and other important activities. Get notified via email.</p>
          </div>
          <div style={featureStyle}>
            <h3>User-friendly Interface</h3>
            <p>Our platform is designed to be intuitive and easy to navigate, ensuring a hassle-free experience.</p>
          </div>
        </div>
      </div>

      <footer style={footerStyle}>
        <p>&copy; 2024 Laundry & Reminder Scheduler. All rights reserved.</p>
      </footer>
    </div>
  );
};

  
// Styles (inline styles for simplicity)
const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  justifyContent: 'space-between', // Spread the content evenly
};

const headerStyle = {
  width: '100%',
  backgroundColor: '#333',
  padding: '20px',
  textAlign: 'center',
  color: '#fff',
};

const navStyle = {
  marginTop: '10px',
};

const navLinkStyle = {
  color: '#fff',
  margin: '0 15px',
  textDecoration: 'none',
  fontSize: '18px',
};

const mainContentStyle = {
    maxWidth: '1200px',  // Ensure the content width is constrained
    margin: '0 auto',    // Center it properly
    padding: '40px 20px',
    textAlign: 'center',
    boxSizing: 'border-box',
    overflow: 'hidden',  // Make sure nothing spills out horizontally
  };
  

const buttonsContainerStyle = {
  marginTop: '20px',
  marginBottom: '40px',
};

const buttonStyle = {
  display: 'inline-block',
  backgroundColor: '#333',
  color: '#fff',
  padding: '15px 30px',
  borderRadius: '5px',
  textDecoration: 'none',
  fontSize: '18px',
  margin: '0 15px',
  transition: 'background-color 0.3s',
};

const featuresStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',  // Center the features in the middle
    margin: '30px 0',
    gap: '20px',  // Add space between feature cards
  };
  
  const featureStyle = {
    backgroundColor: '#fff',
    padding: '20px',
    width: '300px',
    margin: '15px',       // Make sure this isn’t causing overflow
    border: '1px solid #ddd',
    borderRadius: '8px',
    boxSizing: 'border-box',
  };
  

const footerStyle = {
  backgroundColor: '#333',
  color: '#fff',
  padding: '20px',
  textAlign: 'center',
  width: '100%',
};

// Button hover effect
buttonStyle[':hover'] = {
  backgroundColor: '#444',
};

// Feature hover effect
featureStyle[':hover'] = {
  transform: 'scale(1.05)',
};

export default IndexPage;
