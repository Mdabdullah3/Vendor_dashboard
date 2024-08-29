import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from './layout/admin';
import './App.css'
import Register from './page/auth/Register';
import Login from './page/auth/Login';
import Profile from './page/Profile/Profile';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ForgetPassword from './page/auth/ForgetPassword';
import ResetPassword from './page/auth/ResetPassword';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="admin/*" element={<Admin />} />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;