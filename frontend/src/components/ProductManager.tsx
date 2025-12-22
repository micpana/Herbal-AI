import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Plus, Edit, Trash2, X, Image as ImageIcon } from 'lucide-react';

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
    type: 'fresh_herbs',
    ingredients: '',
    age_range: '0-100',
    genders: 'Male,Female,Other',
    pregnancy_friendly: false,
    product_url: '',
  });
  const [files, setFiles] = useState<File[]>([]);
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

  const handleEdit = (product: Product) => {
    setFormData(product);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      images: '',
      description: '',
      type: 'fresh_herbs',
      ingredients: '',
      age_range: '0-100',
      genders: 'Male,Female,Other',
      pregnancy_friendly: false,
      product_url: '',
    });
    setFiles([]);
    setIsEditing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== 'id') data.append(key, String((formData as any)[key]));
    });
    files.forEach((file) => data.append('files', file));

    try {
      if (isEditing && formData.id) {
        await api.put(`/admins/products/${formData.id}`, data);
      } else {
        await api.post('/admins/products/', data);
      }
      resetForm();
      fetchProducts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-12">
      {/* Form Section */}
      <div className="card-glass">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          {isEditing ? <Edit className="w-5 h-5 text-emerald-600" /> : <Plus className="w-5 h-5 text-emerald-600" />}
          {isEditing ? 'Edit Product' : 'Add New Inventory Item'}
        </h3>
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="label-text">Product Name</label>
              <input 
                type="text" 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                className="input-field" 
                required 
              />
            </div>
            <div>
              <label className="label-text">Type</label>
              <select 
                value={formData.type} 
                onChange={e => setFormData({...formData, type: e.target.value})} 
                className="input-field"
              >
                <option value="fresh_herbs">Fresh Herbs</option>
                <option value="dried_herbs">Dried Herbs</option>
                <option value="herbal_capsules">Capsules</option>
                <option value="herbal_supplements">Supplements</option>
              </select>
            </div>
            <div>
              <label className="label-text">Description</label>
              <textarea 
                value={formData.description} 
                onChange={e => setFormData({...formData, description: e.target.value})} 
                className="input-field min-h-[100px]" 
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="label-text">Store URL</label>
              <input 
                type="text" 
                value={formData.product_url} 
                onChange={e => setFormData({...formData, product_url: e.target.value})} 
                className="input-field" 
              />
            </div>
            <div>
              <label className="label-text">Ingredients</label>
              <input 
                type="text" 
                value={formData.ingredients} 
                onChange={e => setFormData({...formData, ingredients: e.target.value})} 
                className="input-field" 
              />
            </div>
            <div>
              <label className="label-text">Upload Images</label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-slate-200 border-dashed rounded-xl cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <ImageIcon className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-xs text-slate-500 font-medium">Click to select files</p>
                  </div>
                  <input type="file" multiple className="hidden" onChange={e => setFiles(Array.from(e.target.files || []))} />
                </label>
              </div>
              {files.length > 0 && <p className="text-[10px] mt-2 text-emerald-600 font-bold">{files.length} files staged</p>}
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end gap-3 pt-6 border-t border-slate-100">
            {isEditing && (
              <button type="button" onClick={resetForm} className="btn-secondary">Cancel</button>
            )}
            <button type="submit" className="btn-primary">
              {isEditing ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>

      {/* List Section */}
      <div className="space-y-6">
        <h3 className="text-xl font-bold">Current Inventory ({products.length})</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h4 className="font-bold text-slate-800">{product.name}</h4>
                  <span className="text-[10px] uppercase font-bold text-emerald-600">{product.type.replace('_', ' ')}</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(product)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={async () => { if(confirm('Delete?')) { await api.delete(`/admins/products/${product.id}`); fetchProducts(); } }} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-slate-500 line-clamp-2">{product.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManager;