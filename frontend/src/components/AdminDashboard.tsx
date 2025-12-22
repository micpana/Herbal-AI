import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductManager from './ProductManager';
import AdminManager from './AdminManager';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ total_calls: 0, total_tokens: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/admins/stats');
        setStats(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <div className="card mb-8">
        <h3>Usage Stats</h3>
        <p>Total AI Calls: {stats.total_calls}</p>
        <p>Total Tokens Used: {stats.total_tokens}</p>
      </div>
      <ProductManager />
      <AdminManager />
    </div>
  );
};

export default AdminDashboard;