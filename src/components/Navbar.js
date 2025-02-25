import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;
  
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('studentInfo');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h1>Vanis University Student Portal</h1>
      <ul>
        <li><Link to="/">Home</Link></li>
        {!isLoggedIn ? (
          <>
            <li><Link to="/signup">Sign Up</Link></li>
            <li><Link to="/login">Login</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/dashboard">Dashboard</Link></li>
            <li><a href="#!" onClick={logout}>Logout</a></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;