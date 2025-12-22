import React, { useState } from 'react';
import api from '../services/api';
import { Lock, User, AlertCircle } from 'lucide-react';

interface Props {
  onLogin: () => void;
}

const AdminLogin: React.FC<Props> = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const res = await api.post('/admins/login', formData);
      localStorage.setItem('token', res.data.access_token);
      onLogin();
    } catch (err) {
      setError('The credentials you entered are incorrect. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="card-glass space-y-6">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Secure Access</h2>
          <p className="text-slate-500 text-sm">Enter your administrative credentials</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="text" 
              name="username" 
              placeholder="Username" 
              onChange={handleChange} 
              className="input-field !pl-12"
              required 
            />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input 
              type="password" 
              name="password" 
              placeholder="Password" 
              onChange={handleChange} 
              className="input-field !pl-12"
              required 
            />
          </div>
        </div>

        {error && (
          <div className="flex items-center gap-2 p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-100">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full btn-primary !py-4 shadow-lg shadow-emerald-200 flex justify-center items-center"
        >
          {isLoading ? "Authenticating..." : "Sign In to Dashboard"}
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;