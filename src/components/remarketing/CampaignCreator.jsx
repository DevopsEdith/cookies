import React, { useState } from 'react';
import { useCookieData } from '../../context/CookieContext';

const CampaignCreator = () => {
    const { cookies } = useCookieData();
  const [campaign, setCampaign] = useState({
    name: '',
    description: '',
    audience: 'abandoned_cart',
    budget: 0,
    startDate: '',
    endDate: '',
    platforms: {
      facebook: false,
      google: false,
      instagram: false
    }
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCampaign({
      ...campaign,
      [name]: value
    });
  };

  const handlePlatformChange = (platform) => {
    setCampaign({
      ...campaign,
      platforms: {
        ...campaign.platforms,
        [platform]: !campaign.platforms[platform]
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Campaign created:', campaign);
    // Ici, vous appelleriez votre API pour créer la campagne
    alert('Campagne créée avec succès !');
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6">Créer une campagne de remarketing</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 font-medium">Nom de la campagne</label>
            <input
              type="text"
              name="name"
              value={campaign.name}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Audience cible</label>
            <select
              name="audience"
              value={campaign.audience}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
            >
              <option value="abandoned_cart">Paniers abandonnés</option>
              <option value="recent_visitors">Visiteurs récents</option>
              <option value="previous_customers">Anciens clients</option>
              <option value="specific_product">Visiteurs de produit spécifique</option>
            </select>
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Budget (€)</label>
            <input
              type="number"
              name="budget"
              value={campaign.budget}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              min="0"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Description</label>
            <textarea
              name="description"
              value={campaign.description}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              rows="3"
            ></textarea>
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Date de début</label>
            <input
              type="date"
              name="startDate"
              value={campaign.startDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
          
          <div>
            <label className="block mb-2 font-medium">Date de fin</label>
            <input
              type="date"
              name="endDate"
              value={campaign.endDate}
              onChange={handleChange}
              className="w-full p-3 border rounded-md"
              required
            />
          </div>
        </div>
        
        <div>
          <label className="block mb-2 font-medium">Plateformes</label>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={campaign.platforms.facebook}
                onChange={() => handlePlatformChange('facebook')}
                className="mr-2"
              />
              Facebook
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={campaign.platforms.google}
                onChange={() => handlePlatformChange('google')}
                className="mr-2"
              />
              Google Ads
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={campaign.platforms.instagram}
                onChange={() => handlePlatformChange('instagram')}
                className="mr-2"
              />
              Instagram
            </label>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md"
          >
            Créer la campagne
          </button>
        </div>
      </form>
    </div>
  );
};

export default CampaignCreator;