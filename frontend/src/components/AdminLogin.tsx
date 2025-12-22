import React, { useState } from 'react';
import api from '../services/api';

interface Props {
  onLogin: () => void;
}

const AdminLogin: React.FC<Props> = ({ onLogin }) => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post('/admins/login', formData);
      localStorage.setItem('token', res.data.access_token);
      onLogin();
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
      <input type="text" name="username" placeholder="Username" onChange={handleChange} className="border p-2 w-full mb-4" />
      <input type="password" name="password" placeholder="Password" onChange={handleChange} className="border p-2 w-full mb-4" />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-secondary text-white p-2 rounded">Login</button>
    </form>
  );
};

export default AdminLogin;