import React, { useState, useEffect } from 'react';
import './styles/LaundryQueue.css';

const LaundryQueue = () => {
  const [machines, setMachines] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [timer, setTimer] = useState({});  // State to track the countdown timer for each machine

  const token = localStorage.getItem('token');

  // Function to extract user ID from JWT token
  const getUserIdFromToken = (token) => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
      return payload.id || payload.userId;  // Use the correct key from your JWT (adjust as necessary)
    } catch (error) {
      console.error('Error decoding token', error);
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      const id = getUserIdFromToken(token);  // Get the userId from the token
      setUserId(id);  // Set the userId in the state
    }
  
    const fetchMachines = async () => {
      try {
        const res = await fetch('/api/laundry', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error('Failed to fetch machines.');
        const data = await res.json();
        
        // Log the data to see if queue data exists
        console.log('Fetched machines:', data);
        
        setMachines(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
  
    fetchMachines();
  }, [token]);
  

  // Define the joinQueue function
  const joinQueue = async (machineId) => {
    try {
      const response = await fetch(`/api/laundry/${machineId}/queue`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Use the token from localStorage
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Successfully joined the queue, now update the machines state with new data
        setMachines((prevMachines) =>
          prevMachines.map((machine) =>
            machine._id === data._id ? data : machine
          )
        );
      } else {
        console.error('Failed to join queue:', data.message);
      }
    } catch (error) {
      console.error('Error joining queue:', error);
    }
  };

  // Calculate remaining time for the user currently using the machine
  const calculateRemainingTime = (startTime, usageDuration) => {
    if (!startTime || !usageDuration) return 0; // If no startTime or usageDuration, return 0
    const now = Date.now(); // Get current time in milliseconds
    const elapsed = (now - new Date(startTime).getTime()) / 1000 / 60;  // Calculate elapsed time in minutes
    const remaining = usageDuration - elapsed;  // Subtract elapsed time from the usage duration
    return remaining > 0 ? Math.floor(remaining) : 0;  // Return remaining time or 0 if time is up
  };
  

  // Calculate waiting time for users in queue
  const calculateWaitingTime = (machine, index) => {
    const remainingTime = calculateRemainingTime(machine.startTime, machine.usageDuration);
  
    if (index === 0 || index === 1) {
      // For position 1 and 2, return the remaining time of the current user
      return remainingTime;
    }
  
    // For position 3 and beyond, calculate waiting time
    let totalWaitingTime = remainingTime;
    for (let i = 1; i < index; i++) {
      totalWaitingTime += machine.usageDuration;
    }
  
    return totalWaitingTime;
  };
 

  // Automatically update the queue when the timer hits 0
  useEffect(() => {
    const intervalId = setInterval(() => {
      setMachines((prevMachines) => {
        return prevMachines.map((machine) => {
          const remainingTime = calculateRemainingTime(machine.startTime, machine.usageDuration);
  
          // If the timer hits zero, shift the queue and update the machine's status
          if (remainingTime <= 0 && machine.queue.length > 0) {
            // Shift the queue
            machine.queue.shift();  // Remove the first person from the queue
  
            if (machine.queue.length > 0) {
              // Start the next user in the queue
              machine.startTime = Date.now();  // Set start time for the next user
              machine.isAvailable = false;     // Mark machine as in use
            } else {
              // If no one is left in the queue, make the machine available
              machine.isAvailable = true;
              machine.startTime = null;
              machine.usageDuration = null;
            }
  
            // Update the backend with the new machine status
            fetch(`/api/laundry/${machine._id}/status`, {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
              body: JSON.stringify({
                isAvailable: machine.isAvailable,
                usageDuration: machine.usageDuration,
              }),
            })
            .then((res) => res.json())
            .catch((err) => console.error('Error updating machine status:', err));
          }
  
          // Update the countdown timer in state for the current machine
          setTimer((prevTimers) => ({
            ...prevTimers,
            [machine._id]: remainingTime > 0 ? remainingTime : 0  // Ensure the timer doesn't go below 0
          }));
  
          return machine;
        });
      });
    }, 1000);  // Update every second
  
    return () => clearInterval(intervalId);  // Cleanup the interval on unmount
  }, [machines]);


  return (
    <div className="container">
      <h1>Laundry Queue System</h1>

      {error && <p className="error-message">{error}</p>}
      {loading && <p>Loading machines...</p>}

      {!loading && machines.length === 0 && <p className="no-machines">No machines available.</p>}

      {!loading && machines.length > 0 && (
        <ul>
          {machines.map((machine) => (
            <li key={machine._id}>
              <div>
                <p>Machine {machine.machineNumber} ({machine.type})</p>
                {machine.isAvailable ? (
                  <span className="available">Available</span>
                ) : (
                  <span className="in-use">In Use (Remaining: {timer[machine._id] || '0'} minutes)</span>
                )}
              </div>
              <button onClick={() => joinQueue(machine._id)}>Join Queue</button>
              <ul className="queue-list">
                {machine.queue.length > 0 ? (
                  machine.queue.map((q, index) => (
                    <li key={index} className="queue-item">
                      {q.user === userId ? (
                        <strong>Your Queue Position: {index + 1}</strong>
                      ) : (
                        <>Queue Position: {index + 1}</>
                      )}
                      {index === 0 ? (
                        <span> (Timer: {timer[machine._id] || '0'} minutes)</span>
                      ) : (
                        <span> (Waiting time: {calculateWaitingTime(machine, index)} minutes)</span>
                      )}
                    </li>
                  ))
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
