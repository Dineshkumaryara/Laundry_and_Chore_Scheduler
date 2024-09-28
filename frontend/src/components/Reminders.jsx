import React, { useState, useEffect } from 'react';
import './styles/Reminders.css'; // Import the CSS file

const Reminders = () => {
  const [reminders, setReminders] = useState([]);
  const [reminderText, setReminderText] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  // Fetch reminders from the backend
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const res = await fetch('/api/reminders', {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch reminders. Please login.');
        }

        const data = await res.json();
        setReminders(data);
      } catch (error) {
        setError(error.message);
      }
    };

    if (token) {
      fetchReminders();
    } else {
      setError('You must log in to view reminders.');
    }
  }, [token]);

  // Add a new reminder
  const addReminder = async (e) => {
    e.preventDefault();

    const newReminder = { reminderText, scheduledTime };

    try {
      const res = await fetch('/api/reminders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`, // Attach token
        },
        body: JSON.stringify(newReminder),
      });

      if (!res.ok) {
        throw new Error('Failed to add reminder.');
      }

      const data = await res.json();
      setReminders([...reminders, data]);

      // Clear input fields
      setReminderText('');
      setScheduledTime('');
    } catch (error) {
      setError(error.message);
    }
  };

  // Delete a reminder
  const deleteReminder = async (id) => {
    try {
      const res = await fetch(`/api/reminders/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // Attach token
        },
      });

      if (!res.ok) {
        throw new Error('Failed to delete reminder.');
      }

      setReminders(reminders.filter((reminder) => reminder._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <h1>Laundry & Chore Scheduler</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {token ? (
        <>
          <form onSubmit={addReminder}>
            <input
              type="text"
              value={reminderText}
              onChange={(e) => setReminderText(e.target.value)}
              placeholder="Enter reminder"
              required
            />
            <input
              type="datetime-local"
              value={scheduledTime}
              onChange={(e) => setScheduledTime(e.target.value)}
              required
            />
            <button type="submit">Add Reminder</button>
          </form>

          <h2>Upcoming Reminders</h2>
          <ul>
            {reminders.map((reminder) => (
              <li key={reminder._id}>
                <span>{reminder.reminderText} - {new Date(reminder.scheduledTime).toLocaleString()}</span>
                <button onClick={() => deleteReminder(reminder._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p>Please log in to manage your reminders.</p>
      )}
    </div>
  );
};

export default Reminders;
