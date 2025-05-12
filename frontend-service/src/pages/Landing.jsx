import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Landing.css";

const Landing = () => {
  return (
    <div className='landing-main'>
      <h1>Landing Page</h1>
      <Link to="/register" className="landing-register-button">Register</Link>
      <Link to="/login" className="landing-login-button">Login</Link>
    </div>
  );
};

export default Landing;