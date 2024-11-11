// src/components/Login.js
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password, navigate);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100 flex-column">
      <div className="card p-4 shadow" style={{ maxWidth: '400px', width: '100%' }}>
        <h1 className="text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username" className="form-label">
              <FaUser className="me-2" /> Username
            </label>
            <input
              type="text"
              id="username"
              className="form-control"
              placeholder="Enter Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-4">
            <label htmlFor="password" className="form-label">
              <FaLock className="me-2" /> Password
            </label>
            <input
              type="password"
              id="password"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>
      </div>
      {/* Footer */}
      <footer className="mt-4 text-center">
        <p>Powered By - DexWire Infotech - 7600617002</p>
      </footer>
    </div>
  );
};

export default Login;
