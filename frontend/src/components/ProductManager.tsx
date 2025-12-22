import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({ id: null, name: '', /* add all fields */ });
  // ... state for editing

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await api.get('/admins/products');
      setProducts(res.data);
    };
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.id) {
      await api.put(`/admins/products/${formData.id}`, formData);
    } else {
      await api.post('/admins/products', formData);
    }
    // Refresh products
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/admins/products/${id}`);
    // Refresh
  };

  // Form fields for all product props

  return (
    <div className="card mb-8">
      <h3 className="text-xl font-bold mb-2">Manage Products</h3>
      {/* Form for add/edit */}
      <form onSubmit={handleSubmit}>
        {/* Inputs for name, description, type, etc. */}
        <button type="submit" className="bg-primary text-white p-2 rounded">Save</button>
      </form>
      <ul>
        {products.map((p: any) => (
          <li key={p.id} className="flex justify-between">
            {p.name}
            <div>
              <button onClick={() => setFormData(p)}>Edit</button>
              <button onClick={() => handleDelete(p.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductManager;