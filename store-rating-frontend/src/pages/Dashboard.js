import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome, {user?.name}</p>
      <button onClick={() => navigate('/stores')}>View Stores</button>
      <button onClick={() => navigate('/profile')}>Update Profile</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}