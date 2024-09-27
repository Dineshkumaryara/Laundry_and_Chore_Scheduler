import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Reminders from './components/Reminders';
import Supplies from './components/Supplies';
import Dashboard from './components/Dashboard';
import LaundryQueue from './components/LaundryQueue';
import IndexPage from './components/IndexPage'; 

const App = () => {
  const [user, setUser] = useState(null);

  // Check for the token when the app loads
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); // Set user if token exists
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <div>
        {user ? (
          <div style={{ textAlign: 'right', margin: '10px' }}>
            <button onClick={handleLogout}>Logout</button>
          </div>
        ) : null}

        <Routes>
          {/* IndexPage for logged-out users */}
          <Route
            path="/"
            element={!user ? <IndexPage /> : <Navigate to="/dashboard" />}
          />

          {/* Login and Register Routes */}
          <Route
            path="/login"
            element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/register"
            element={!user ? <Register onRegister={handleLogin} /> : <Navigate to="/dashboard" />}
          />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/user/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />
          <Route
            path="/reminders"
            element={user ? <Reminders /> : <Navigate to="/login" />}
          />
          <Route
            path="/supplies"
            element={user ? <Supplies /> : <Navigate to="/login" />}
          />
          <Route
            path="/laundry"
            element={user ? <LaundryQueue /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
