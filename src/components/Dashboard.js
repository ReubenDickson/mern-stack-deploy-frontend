import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentData = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        navigate('/login');
        return;
      }
      
      try {
        const config = {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        };
        
        const response = await axios.get('http://localhost:5000/api/student', config);
        setStudent(response.data);
      } catch (err) {
        setError('Failed to load student data');
        // If token is invalid, redirect to login
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('studentInfo');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudentData();
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('studentInfo');
    navigate('/login');
  };

  if (loading) return <div className="loading">Loading...</div>;
  
  if (error) return <div className="error-message">{error}</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Student Dashboard</h1>
        <button onClick={logout} className="btn btn-logout">Logout</button>
      </div>
      
      {student && (
        <div className="dashboard-content">
          <div className="student-info-card">
            <h2>Welcome, {student.name}!</h2>
            <div className="student-details">
              <p><strong>Student ID:</strong> {student.studentId}</p>
              <p><strong>Email:</strong> {student.email}</p>
              <p><strong>Joined:</strong> {new Date(student.dateJoined).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="dashboard-section">
            <h3>Quick Actions</h3>
            <div className="action-buttons">
              <button className="btn btn-action">View Schedule</button>
              <button className="btn btn-action">View Grades</button>
              <button className="btn btn-action">Course Registration</button>
              <button className="btn btn-action">Update Profile</button>
            </div>
          </div>
          
          <div className="dashboard-section">
            <h3>Upcoming Deadlines</h3>
            <p>No upcoming deadlines at this time.</p>
          </div>
          
          <div className="dashboard-section">
            <h3>Recent Announcements</h3>
            <p>Welcome to the Student Portal! This is the first version of our platform.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;