import React, { useState } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Panel</h1>
      {isLoggedIn ? <AdminDashboard /> : <AdminLogin onLogin={handleLogin} />}
    </div>
  );
};

export default AdminPage;