// src/components/Home.js
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <h1>Welcome!</h1>
      <p>This portal helps students access educational resources and manage their academic journey.</p>
      <Link to="/signup" className="btn">Sign Up Now</Link>
    </div>
  );
};

export default Home;