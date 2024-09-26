import React, { useState, useEffect } from 'react';

const LaundryQueue = () => {
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  const token = localStorage.getItem('token');

  // Function to extract user ID from the JWT token without using jwt-decode
  const getUserIdFromToken = (token) => {
    if (!token) return null;
    try {
      // JWT format: header.payload.signature
      const payload = token.split('.')[1]; // Extract the payload part of the token
      const decodedPayload = JSON.parse(atob(payload)); // Decode the base64 payload
      return decodedPayload.id; // Assuming the user ID is stored as 'id'
    } catch (error) {
      console.error('Failed to decode token:', error);
      return null;
    }
  };

  // Fetch the user ID from the token when the component mounts
  useEffect(() => {
    if (token) {
      const userId = getUserIdFromToken(token);
      setUserId(userId);
    }

    const fetchMachines = async () => {
      if (!token) {
        setError('User is not authenticated.');
        return;
      }

      try {
        const res = await fetch('/api/laundry', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error('Failed to fetch machines.');
        }

        const data = await res.json();
        setMachines(data);
        setLoading(false); // Stop loading after data is fetched
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchMachines();
  }, [token]);

  // Join queue for a machine
  const joinQueue = async (machineId) => {
    if (!token) {
      setError('User is not authenticated.');
      return;
    }

    try {
      const res = await fetch(`/api/laundry/${machineId}/queue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to join the queue.');
      }

      const updatedMachine = await res.json();
      setMachines((prevMachines) =>
        prevMachines.map((machine) => (machine._id === updatedMachine._id ? updatedMachine : machine))
      );
    } catch (error) {
      setError(error.message);
    }
  };

  // Calculate remaining time for machines in use
  const calculateRemainingTime = (startTime, usageDuration) => {
    if (!startTime) return null;

    const start = new Date(startTime).getTime();
    const now = Date.now();
    const elapsed = (now - start) / 1000 / 60;  // convert to minutes
    const remaining = usageDuration - elapsed;

    return remaining > 0 ? Math.floor(remaining) : 0;  // return remaining minutes or 0
  };

  return (
    <div>
      <h1>Laundry Queue System</h1>

      {/* Show error message */}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Show loading spinner */}
      {loading && <p>Loading machines...</p>}

      {/* Display machines when not loading and machines exist */}
      {!loading && machines.length === 0 && <p>No machines available.</p>}

      {!loading && machines.length > 0 && (
        <ul>
          {machines.map((machine) => (
            <li key={machine._id}>
              Machine {machine.machineNumber} ({machine.type}) -{' '}
              {machine.isAvailable ? (
                <span style={{ color: 'green' }}>Available</span>
              ) : (
                <span style={{ color: 'red' }}>
                  In Use (Remaining: {calculateRemainingTime(machine.startTime, machine.usageDuration)} minutes)
                </span>
              )}
              <button
                onClick={() => joinQueue(machine._id)}
                disabled={!machine.isAvailable}
                style={{ marginLeft: '10px' }}
              >
                {machine.isAvailable ? 'Join Queue' : 'Unavailable'}
              </button>
              <ul>
                {machine.queue.length > 0 ? (
                  machine.queue.map((q, index) =>
                    q.user === userId ? (
                      <li key={index}>Your Queue Position: {index + 1}</li>
                    ) : null
                  )
                ) : (
                  <li>No one in the queue yet</li>
                )}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LaundryQueue;
