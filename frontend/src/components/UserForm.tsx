import React, { useState } from 'react';
import api from '../services/api';
import RecommendationDisplay from './RecommendationDisplay';

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState({
    age: 0,
    allergies: '',
    gender: '',
    pregnant: false,
    on_medication: false,
    medications: '',
    text_input: '',
    recommendation_types: [] as string[],
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({
        ...prev,
        recommendation_types: checked
          ? [...prev.recommendation_types, value]
          : prev.recommendation_types.filter((t) => t !== value),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.post('/users/recommend', formData);
      setResponse(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="card">
        <h2 className="text-2xl font-bold mb-4 text-primary">Get Herbal Recommendations</h2>
        
        <label className="block mb-2">Age:</label>
        <input type="number" name="age" onChange={handleChange} className="border p-2 w-full mb-4" required />
        
        <label className="block mb-2">Allergies:</label>
        <input type="text" name="allergies" onChange={handleChange} className="border p-2 w-full mb-4" />
        
        <label className="block mb-2">Gender:</label>
        <select name="gender" onChange={handleChange} className="border p-2 w-full mb-4" required>
          <option value="">Select</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        
        {formData.gender === 'Female' && (
          <>
            <label className="block mb-2">Pregnant?</label>
            <input type="checkbox" name="pregnant" onChange={(e) => setFormData({ ...formData, pregnant: e.target.checked })} className="mb-4" />
          </>
        )}
        
        <label className="block mb-2">On Medication?</label>
        <input type="checkbox" name="on_medication" onChange={(e) => setFormData({ ...formData, on_medication: e.target.checked })} className="mb-4" />
        
        {formData.on_medication && (
          <>
            <label className="block mb-2">Medications:</label>
            <input type="text" name="medications" onChange={handleChange} className="border p-2 w-full mb-4" />
          </>
        )}
        
        <label className="block mb-2">Your Goals/Symptoms:</label>
        <textarea name="text_input" onChange={handleChange} className="border p-2 w-full mb-4" required />
        
        <label className="block mb-2">Recommendation Types:</label>
        <div className="flex flex-wrap mb-4">
          {['fresh_herbs', 'dried_herbs', 'herbal_drugs', 'herbal_capsules', 'herbal_supplements'].map((type) => (
            <label key={type} className="mr-4">
              <input type="checkbox" value={type} onChange={handleChange} />
              {type.replace('_', ' ').toUpperCase()}
            </label>
          ))}
        </div>
        
        <button type="submit" className="bg-primary text-white p-2 rounded" disabled={loading}>
          {loading ? 'Loading...' : 'Get Recommendations'}
        </button>
      </form>
      
      {response && <RecommendationDisplay response={response} />}
    </div>
  );
};

export default UserForm;