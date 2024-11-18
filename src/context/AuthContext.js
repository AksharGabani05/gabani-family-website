// src/context/AuthContext.js
import React, { createContext, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = async (email, password) => {
    try {
      // Fetch user data from the API
      const response = await fetch('http://localhost:5000/admin-users'); // Adjust this URL as needed
      const users = await response.json();

      // Check if the email and password match any user in the API data
      const foundUser = users.find(
        (user) => user.email === email && user.password === password
      );

      if (foundUser) {
        setUser({ username: foundUser.name }); // You can set additional user info if needed
        navigate('/admin/dashboard');
      } else {
        alert('Invalid credentials');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      alert('Failed to log in. Please try again later.');
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/admin/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
