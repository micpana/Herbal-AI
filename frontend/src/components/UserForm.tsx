import React, { useState } from 'react';
import api from '../services/api';
import RecommendationDisplay from './RecommendationDisplay';
import { Loader2, Send, HeartPulse, User } from 'lucide-react';

const UserForm: React.FC = () => {
  const [formData, setFormData] = useState({
    age: 0,
    allergies: '',
    gender: 'Male',
    pregnant: false,
    on_medication: false,
    medications: '',
    text_input: '',
    recommendation_types: [] as string[],
  });
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { value: checkboxValue, checked } = e.target as HTMLInputElement;
      if (name === 'recommendation_types') {
        setFormData((prev) => ({
          ...prev,
          recommendation_types: checked
            ? [...prev.recommendation_types, checkboxValue]
            : prev.recommendation_types.filter((t) => t !== checkboxValue),
        }));
      } else {
        setFormData(prev => ({ ...prev, [name]: checked }));
      }
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
      // Smooth scroll to results
      setTimeout(() => {
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <form onSubmit={handleSubmit} className="card-glass overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Demographic Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-emerald-600" />
              <h3 className="text-lg font-bold">Personal Profile</h3>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label-text">Age</label>
                <input type="number" name="age" onChange={handleChange} className="input-field" placeholder="Years" required />
              </div>
              <div>
                <label className="label-text">Gender</label>
                <select name="gender" onChange={handleChange} className="input-field">
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {formData.gender === 'Female' && (
              <label className="flex items-center gap-3 p-4 bg-emerald-50/50 rounded-xl cursor-pointer hover:bg-emerald-50 transition-colors">
                <input type="checkbox" name="pregnant" onChange={handleChange} className="w-5 h-5 accent-emerald-600 rounded" />
                <span className="text-sm font-medium text-slate-700">Currently Pregnant or Nursing?</span>
              </label>
            )}

            <div>
              <label className="label-text">Known Allergies</label>
              <input type="text" name="allergies" onChange={handleChange} className="input-field" placeholder="Pollen, specific herbs, etc." />
            </div>
          </div>

          {/* Health Section */}
          <div className="space-y-6">
             <div className="flex items-center gap-2 mb-4">
              <HeartPulse className="w-5 h-5 text-rose-500" />
              <h3 className="text-lg font-bold">Health Context</h3>
            </div>

            <label className="flex items-center gap-3 p-4 bg-slate-50 rounded-xl cursor-pointer hover:bg-slate-100 transition-colors">
              <input type="checkbox" name="on_medication" onChange={handleChange} className="w-5 h-5 accent-emerald-600" />
              <span className="text-sm font-medium text-slate-700">Taking regular medication?</span>
            </label>
            
            {formData.on_medication && (
              <div className="animate-in fade-in slide-in-from-top-2">
                <label className="label-text">Current Medications</label>
                <input type="text" name="medications" onChange={handleChange} className="input-field" placeholder="List medications to check for interactions" />
              </div>
            )}

            <div>
              <label className="label-text">Symptoms or Wellness Goals</label>
              <textarea 
                name="text_input" 
                onChange={handleChange} 
                className="input-field min-h-[120px] resize-none" 
                placeholder="How are you feeling? What are you looking to improve (e.g., sleep, digestion)?"
                required 
              />
            </div>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="mt-8 pt-8 border-t border-slate-100">
          <label className="label-text mb-4">Preferred Recommendation Formats</label>
          <div className="flex flex-wrap gap-3">
            {['fresh_herbs', 'dried_herbs', 'herbal_drugs', 'herbal_capsules', 'herbal_supplements'].map((type) => (
              <label key={type} className="group cursor-pointer">
                <input 
                  type="checkbox" 
                  name="recommendation_types"
                  value={type} 
                  onChange={handleChange} 
                  className="peer hidden" 
                />
                <span className="inline-block px-4 py-2 rounded-full border border-slate-200 text-sm font-medium text-slate-600 peer-checked:bg-emerald-600 peer-checked:text-white peer-checked:border-emerald-600 group-hover:border-emerald-200 transition-all">
                  {type.replace('_', ' ').toUpperCase()}
                </span>
              </label>
            ))}
          </div>
        </div>

        <button 
          type="submit" 
          disabled={loading} 
          className="w-full mt-10 btn-primary py-4 text-lg flex justify-center items-center gap-3 shadow-lg shadow-emerald-200"
        >
          {loading ? (
            <Loader2 className="w-6 h-6 animate-spin" />
          ) : (
            <>
              <Send className="w-5 h-5" />
              Generate My Herbal Roadmap
            </>
          )}
        </button>
      </form>

      {response && (
        <div id="results" className="animate-in slide-in-from-bottom-10 fade-in duration-700">
           <RecommendationDisplay response={response} />
        </div>
      )}
    </div>
  );
};

export default UserForm;