import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { UserPlus, UserCircle, Edit, Trash2, Shield, Mail } from 'lucide-react';

interface Admin {
  id: number;
  name: string;
  username: string;
  email: string;
}

const AdminManager: React.FC = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const res = await api.get('/admins/');
      setAdmins(res.data);
    } catch (err) {
      console.error('Failed to fetch admins', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleEdit = (admin: Admin) => {
    setFormData({ name: admin.name, username: admin.username, email: admin.email, password: '' });
    setIsEditing(true);
    setEditingId(admin.id);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editingId) {
        await api.put(`/admins/${editingId}`, formData);
      } else {
        await api.post('/admins/', formData);
      }
      setFormData({ name: '', username: '', email: '', password: '' });
      setIsEditing(false);
      setEditingId(null);
      fetchAdmins();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Sidebar: Form */}
      <div className="lg:col-span-1">
        <div className="card-glass sticky top-24">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-emerald-600" />
            {isEditing ? 'Update User' : 'Add Admin'}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label-text">Full Name</label>
              <input name="name" value={formData.name} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="label-text">Username</label>
              <input name="username" value={formData.username} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="label-text">Email Address</label>
              <input name="email" value={formData.email} onChange={handleChange} className="input-field" required />
            </div>
            <div>
              <label className="label-text">Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} className="input-field" placeholder={isEditing ? 'Leave blank to keep current' : ''} required={!isEditing} />
            </div>
            <div className="pt-4 flex flex-col gap-2">
              <button type="submit" className="btn-primary w-full">
                {isEditing ? 'Update Credentials' : 'Create Account'}
              </button>
              {isEditing && (
                <button type="button" onClick={() => { setIsEditing(false); setFormData({ name: '', username: '', email: '', password: '' }); }} className="btn-secondary w-full">Cancel</button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Main: Admin List */}
      <div className="lg:col-span-2 space-y-6">
        <h3 className="text-xl font-bold">Authorized Administrators</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {admins.map((admin) => (
            <div key={admin.id} className="card-glass hover:border-emerald-100 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-emerald-50 p-3 rounded-2xl text-emerald-600">
                  <UserCircle className="w-10 h-10" />
                </div>
                <div className="flex gap-1">
                   <button onClick={() => handleEdit(admin)} className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={async () => { if(confirm('Remove access?')) { await api.delete(`/admins/${admin.id}`); fetchAdmins(); } }} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <h4 className="font-bold text-slate-900">{admin.name}</h4>
              <div className="mt-3 space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Shield className="w-3 h-3" />
                  <span>@{admin.username}</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Mail className="w-3 h-3" />
                  <span>{admin.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminManager;