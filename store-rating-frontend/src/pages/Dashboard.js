import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Redirect to login if user is not logged in
  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <div>
      <Navbar />
      <h1>Dashboard</h1>
      {user ? (
        <>
          <p>Welcome, {user.name}</p>
          <button onClick={() => navigate('/stores')}>View Stores</button>
          <button onClick={() => navigate('/profile')}>Update Profile</button>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading user info...</p>
      )}
    </div>
  );
}
