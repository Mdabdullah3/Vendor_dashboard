import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from './layout/admin';
import './App.css'
import Register from './page/auth/Register';
import Login from './page/auth/Login';
import Profile from './page/Profile/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="admin/*" element={<Admin />} />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;