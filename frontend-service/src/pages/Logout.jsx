import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import "../styles/Logout.css";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth');
    toast.success('Logout successful');
    navigate('/login');
  };

  return (
    <div className='logout-main'>
      <h1>Are you sure you want to logout?</h1>
      <button onClick={handleLogout} className="logout-button">Logout</button>
      <Link to="/dashboard">Go Back</Link>
    </div>
  );
};

export default Logout;