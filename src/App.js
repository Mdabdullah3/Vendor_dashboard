import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Admin from './layout/admin';
import './App.css'
import Register from './page/auth/Register';
const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="admin/*" element={<Admin />} />
      </Routes>
    </div>
  );
};

export default App;