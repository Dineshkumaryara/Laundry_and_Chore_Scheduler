import React, { useState, useEffect } from 'react';

const Supplies = () => {
  const [supplies, setSupplies] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [lowThreshold, setLowThreshold] = useState(2);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  // Fetch supplies from the backend
  useEffect(() => {
    const fetchSupplies = async () => {
      try {
        const res = await fetch('/api/supplies', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setSupplies(data);
      } catch (error) {
        setError('Failed to fetch supplies');
      }
    };

    if (token) {
      fetchSupplies();
    }
  }, [token]);

  // Add a new supply
  const addSupply = async (e) => {
    e.preventDefault();

    const newSupply = { name, quantity, lowThreshold };

    try {
      const res = await fetch('/api/supplies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newSupply),
      });

      const data = await res.json();
      setSupplies([...supplies, data]);

      // Clear input fields
      setName('');
      setQuantity(1);
      setLowThreshold(2);
    } catch (error) {
      setError('Failed to add supply');
    }
  };

  // Update the quantity of a supply
  const updateQuantity = async (id, newQuantity) => {
    try {
      const res = await fetch(`/api/supplies/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      const updatedSupply = await res.json();
      setSupplies(supplies.map(supply => supply._id === id ? updatedSupply : supply));
    } catch (error) {
      setError('Failed to update supply');
    }
  };

  return (
    <div>
      <h1>Supplies Tracker</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={addSupply}>
        <div>
          <label htmlFor="supply-name">Supply Name</label>
          <input
            id="supply-name"
            name="supplyName"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter supply name"
            required
          />
        </div>

        <div>
          <label htmlFor="supply-quantity">Quantity</label>
          <input
            id="supply-quantity"
            name="supplyQuantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            min="1"
            required
          />
        </div>

        <div>
          <label htmlFor="supply-low-threshold">Low Threshold</label>
          <input
            id="supply-low-threshold"
            name="supplyLowThreshold"
            type="number"
            value={lowThreshold}
            onChange={(e) => setLowThreshold(e.target.value)}
            placeholder="Enter low threshold"
            min="1"
            required
          />
        </div>

        <button type="submit">Add Supply</button>
      </form>

      <h2>Supply List</h2>
      <ul>
        {supplies.map((supply) => (
          <li key={supply._id}>
            {supply.name}: {supply.quantity} (Low threshold: {supply.lowThreshold})
            <input
              type="number"
              value={supply.quantity}
              onChange={(e) => updateQuantity(supply._id, e.target.value)}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Supplies;
