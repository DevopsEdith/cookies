// src/components/cookies/CookieForm.jsx
import React, { useState } from 'react';

const CookieForm = ({ cookie, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: cookie?.name || '',
    type: cookie?.type || 'userTracking',
    duration: cookie?.duration || 30,
    data: cookie?.data || {}
  });
  
  const [jsonError, setJsonError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDataChange = (e) => {
    try {
      const parsedData = JSON.parse(e.target.value);
      setFormData(prev => ({ ...prev, data: parsedData }));
      setJsonError('');
    } catch (err) {
      setJsonError('Format JSON invalide');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jsonError) {
      onSave(formData);
    }
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold mb-6">
        {cookie?.name ? `Modifier le cookie: ${cookie.name}` : 'Créer un nouveau cookie'}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="form-label">Nom du cookie</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        
        <div>
          <label htmlFor="type" className="form-label">Type de cookie</label>
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="form-input"
          >
            <option value="userTracking">Suivi utilisateur</option>
            <option value="cart">Panier</option>
            <option value="remarketing">Remarketing</option>
          </select>
        </div>
        
        <div>
          <label htmlFor="duration" className="form-label">Durée (jours)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            className="form-input"
            min="1"
            required
          />
        </div>
        
        <div>
          <label htmlFor="data" className="form-label">
            Données (format JSON)
            {jsonError && <span className="text-red-500 text-xs ml-2">{jsonError}</span>}
          </label>
          <textarea
            id="data"
            name="data"
            defaultValue={JSON.stringify(formData.data, null, 2)}
            onChange={handleDataChange}
            className={`form-input font-mono h-64 ${jsonError ? 'border-red-500 focus:ring-red-500' : ''}`}
            required
          ></textarea>
        </div>
        
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="btn bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!!jsonError}
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default CookieForm;