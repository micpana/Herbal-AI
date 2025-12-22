import React, { useEffect, useState } from 'react';
import api from '../services/api';
import ProductManager from './ProductManager';
import AdminManager from './AdminManager';
import { BarChart3, Database, Users, Settings } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ total_calls: 0, total_tokens: 0 });
  const [activeTab, setActiveTab] = useState<'products' | 'admins'>('products');

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
    <div className="space-y-10">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card-glass flex items-center gap-6">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-2xl">
            <BarChart3 className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total AI Recommendations</p>
            <h3 className="text-3xl font-extrabold text-slate-900">{stats.total_calls.toLocaleString()}</h3>
          </div>
        </div>
        <div className="card-glass flex items-center gap-6">
          <div className="p-4 bg-emerald-100 text-emerald-600 rounded-2xl">
            <Database className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500">Total Tokens Processed</p>
            <h3 className="text-3xl font-extrabold text-slate-900">{stats.total_tokens.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200">
        <button 
          onClick={() => setActiveTab('products')}
          className={`flex items-center gap-2 px-8 py-4 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'products' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Settings className="w-4 h-4" />
          Inventory Management
        </button>
        <button 
          onClick={() => setActiveTab('admins')}
          className={`flex items-center gap-2 px-8 py-4 text-sm font-bold transition-all border-b-2 ${
            activeTab === 'admins' ? 'border-emerald-600 text-emerald-600' : 'border-transparent text-slate-400 hover:text-slate-600'
          }`}
        >
          <Users className="w-4 h-4" />
          Access Control
        </button>
      </div>

      <div className="animate-in fade-in duration-500">
        {activeTab === 'products' ? <ProductManager /> : <AdminManager />}
      </div>
    </div>
  );
};

export default AdminDashboard;