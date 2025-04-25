// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{ padding: '10px', background: '#eee' }}>
      <Link to="/dashboard" style={{ marginRight: '15px' }}>Dashboard</Link>
      <Link to="/stores" style={{ marginRight: '15px' }}>Stores</Link>
      {user ? (
        <>
          <span style={{ marginRight: '15px' }}>Logged in as: {user.role}</span>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/" style={{ marginRight: '10px' }}>Login</Link>
          <Link to="/signup">Register</Link>
        </>
      )}
    </nav>
  );
}