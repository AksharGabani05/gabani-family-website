// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoute';
import Home from './components/UserPanel/Home';
import Login from './components/AdminPanel/Login';
import Dashboard from './components/AdminPanel/Dashboard';
import ManageEvents from './components/AdminPanel/ManageEvents';
import ManageGallery from './components/AdminPanel/ManageGallery';
import ManageNews from './components/AdminPanel/ManageNews';
import ManageMembers from './components/AdminPanel/ManageMembers';
import FamilyTree from './components/UserPanel/FamilyTree';
import Gallery from './components/UserPanel/Gallery';



function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/family-tree" element={<FamilyTree/>} />
          <Route path='/gallery' element={<Gallery/>}/>
          <Route path="/admin/login" element={<Login />} />
          
          <Route path="/admin/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/admin/manage-events" element={<PrivateRoute><ManageEvents /></PrivateRoute>} />
          <Route path="/admin/manage-gallery" element={<PrivateRoute><ManageGallery /></PrivateRoute>} />
          <Route path="/admin/manage-news" element={<PrivateRoute><ManageNews /></PrivateRoute>} />
          <Route path="/admin/manage-members" element={<PrivateRoute><ManageMembers /></PrivateRoute>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
