import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from './layout/admin';
import './App.css'
import Register from './page/auth/Register';
import Login from './page/auth/Login';
import Profile from './page/Profile/Profile';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="admin/*" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;