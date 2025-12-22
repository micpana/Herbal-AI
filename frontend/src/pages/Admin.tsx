import React, { useState } from 'react';
import AdminLogin from '../components/AdminLogin';
import AdminDashboard from '../components/AdminDashboard';
import { LogOut, ShieldCheck } from 'lucide-react';

const AdminPage: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <div className="min-h-screen bg-[#fcfdfc]">
      {/* Refined Navigation Bar */}
      <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-lg border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-xl">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-900 leading-none">Herbal-AI</h1>
              <span className="text-xs font-medium text-emerald-600 uppercase tracking-widest">Admin Control</span>
            </div>
          </div>

          {isLoggedIn && (
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-red-500 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {isLoggedIn ? (
          <AdminDashboard />
        ) : (
          <div className="flex justify-center items-center py-12">
             <AdminLogin onLogin={handleLogin} />
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminPage;