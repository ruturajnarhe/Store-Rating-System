// src/components/StoreCard.js
import React, { useState } from 'react';
import api from '../api/axios';

export default function StoreCard({ store }) {
  const [userRating, setUserRating] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (userRating < 1 || userRating > 5) {
      alert('Rating must be between 1 and 5');
      return;
    }

    await api.post('/stores/rate', { storeId: store.id, rating: userRating });
    setSubmitted(true);
    alert('Rating submitted!');
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', margin: '10px 0' }}>
      <h3>{store.name}</h3>
      <p>{store.address}</p>
      <p>Average Rating: {store.avgRating?.toFixed(1) || "N/A"}</p>

      <input
        type="number"
        min={1}
        max={5}
        value={userRating}
        onChange={(e) => setUserRating(e.target.value)}
        placeholder="Your rating (1-5)"
        disabled={submitted}
      />
      <button onClick={handleSubmit} disabled={submitted}>Submit</button>
    </div>
  );
}