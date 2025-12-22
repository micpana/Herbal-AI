import React, { useEffect, useState } from 'react';
import api from '../services/api';

interface Product {
  id: number;
  name: string;
  images: string;
  description: string;
  type: string;
  ingredients: string;
  age_range: string;
  genders: string;
  pregnancy_friendly: boolean;
  product_url: string;
}

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [formData, setFormData] = useState<Partial<Product>>({
    id: undefined,
    name: '',
    images: '',
    description: '',
    type: '',
    ingredients: '',
    age_range: '0-100',
    genders: 'Male,Female,Other',
    pregnancy_friendly: false,
    product_url: '',
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await api.get('/admins/products');
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (formData.id) {
        await api.put(`/admins/products/${formData.id}`, formData);
      } else {
        await api.post('/admins/products', formData);
      }
      fetchProducts();
      setFormData({
        name: '',
        images: '',
        description: '',
        type: '',
        ingredients: '',
        age_range: '0-100',
        genders: 'Male,Female,Other',
        pregnancy_friendly: false,
        product_url: '',
      });
      setIsEditing(false);
    } catch (err) {
      console.error('Failed to save product', err);
    }
  };

  const handleEdit = (product: Product) => {
    setFormData(product);
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await api.delete(`/admins/products/${id}`);
        fetchProducts();
      } catch (err) {
        console.error('Failed to delete product', err);
      }
    }
  };

  return (
    <div className="card mb-8">
      <h3 className="text-xl font-bold mb-4">{isEditing ? 'Edit Product' : 'Add New Product'}</h3>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-1">Name</label>
          <input name="name" value={formData.name || ''} onChange={handleChange} className="border p-2 w-full rounded" required />
        </div>
        <div>
          <label className="block mb-1">Images (comma-separated filenames)</label>
          <input name="images" value={formData.images || ''} onChange={handleChange} className="border p-2 w-full rounded" placeholder="ginger1.jpg,ginger2.jpg" />
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1">Description</label>
          <textarea name="description" value={formData.description || ''} onChange={handleChange} className="border p-2 w-full rounded" rows={3} required />
        </div>
        <div>
          <label className="block mb-1">Type</label>
          <input name="type" value={formData.type || ''} onChange={handleChange} className="border p-2 w-full rounded" required />
        </div>
        <div>
          <label className="block mb-1">Ingredients (comma-separated)</label>
          <input name="ingredients" value={formData.ingredients || ''} onChange={handleChange} className="border p-2 w-full rounded" />
        </div>
        <div>
          <label className="block mb-1">Age Range</label>
          <input name="age_range" value={formData.age_range || ''} onChange={handleChange} className="border p-2 w-full rounded" />
        </div>
        <div>
          <label className="block mb-1">Genders (comma-separated)</label>
          <input name="genders" value={formData.genders || ''} onChange={handleChange} className="border p-2 w-full rounded" />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="pregnancy_friendly"
            checked={formData.pregnancy_friendly || false}
            onChange={handleChange}
            className="mr-2"
          />
          <label>Pregnancy Friendly</label>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1">Product URL (external link)</label>
          <input name="product_url" value={formData.product_url || ''} onChange={handleChange} className="border p-2 w-full rounded" placeholder="https://example.com/buy" />
        </div>
        <div className="md:col-span-2 flex justify-end gap-4">
          <button type="submit" className="bg-primary text-white px-6 py-2 rounded hover:bg-green-600">
            {isEditing ? 'Update Product' : 'Add Product'}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={() => {
                setFormData({ /* reset */ });
                setIsEditing(false);
              }}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <h3 className="text-xl font-bold mt-8 mb-4">Existing Products</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded-lg shadow">
            <h4 className="font-bold">{product.name}</h4>
            <p className="text-sm text-gray-600">{product.type}</p>
            <div className="mt-4 flex justify-end gap-3">
              <button onClick={() => handleEdit(product)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(product.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductManager;