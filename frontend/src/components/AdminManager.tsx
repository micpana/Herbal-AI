import React, { useEffect, useState } from 'react';
import api from '../services/api';

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing && editingId) {
        await api.put(`/admins/${editingId}`, formData);
      } else {
        await api.post('/admins/', formData);
      }
      fetchAdmins();
      setFormData({ name: '', username: '', email: '', password: '' });
      setIsEditing(false);
      setEditingId(null);
    } catch (err) {
      console.error('Failed to save admin', err);
    }
  };

  const handleEdit = (admin: Admin) => {
    setFormData({
      name: admin.name,
      username: admin.username,
      email: admin.email,
      password: '', // Don't prefill password
    });
    setIsEditing(true);
    setEditingId(admin.id);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this admin?')) {
      try {
        await api.delete(`/admins/${id}`);
        fetchAdmins();
      } catch (err) {
        console.error('Failed to delete admin', err);
      }
    }
  };

  return (
    <div className="card">
      <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Admin' : 'Add New Admin'}</h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Name</label>
          <input name="name" value={formData.name} onChange={handleChange} className="border p-2 w-full rounded" required />
        </div>
        <div>
          <label className="block mb-1">Username</label>
          <input name="username" value={formData.username} onChange={handleChange} className="border p-2 w-full rounded" required />
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input name="email" type="email" value={formData.email} onChange={handleChange} className="border p-2 w-full rounded" required />
        </div>
        <div>
          <label className="block mb-1">Password {isEditing && '(leave blank to keep current)'}</label>
          <input name="password" type="password" value={formData.password} onChange={handleChange} className="border p-2 w-full rounded" required={!isEditing} />
        </div>
        <div className="md:col-span-2 flex justify-end gap-4">
          <button type="submit" className="bg-secondary text-white px-6 py-2 rounded hover:bg-blue-600">
            {isEditing ? 'Update Admin' : 'Add Admin'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setFormData({ name: '', username: '', email: '', password: '' });
                setIsEditing(false);
                setEditingId(null);
              }}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-bold mt-8 mb-4">Existing Admins</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Username</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin.id}>
                <td className="border p-3">{admin.name}</td>
                <td className="border p-3">{admin.username}</td>
                <td className="border p-3">{admin.email}</td>
                <td className="border p-3 text-center">
                  <button onClick={() => handleEdit(admin)} className="text-blue-600 hover:underline mr-3">Edit</button>
                  <button onClick={() => handleDelete(admin.id)} className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminManager;