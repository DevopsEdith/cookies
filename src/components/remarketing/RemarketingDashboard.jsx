import React, { useState, useEffect } from 'react';

import { useCookieData } from '../../context/CookieContext';
const RemarketingDashboard = () => {
    const { cookies } = useCookieData();
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    // Simuler le chargement des campagnes de remarketing
    const mockCampaigns = [
      { id: 1, name: 'Produits abandonnés', audience: 'Visiteurs sans achat', budget: 500, status: 'active' },
      { id: 2, name: 'Clients fidèles', audience: 'Acheteurs réguliers', budget: 750, status: 'paused' },
      { id: 3, name: 'Reconquête', audience: 'Anciens clients', budget: 300, status: 'active' }
    ];
    
    setCampaigns(mockCampaigns);
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Remarketing Dashboard</h2>
      
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <h3 className="text-lg font-semibold mb-3">Campagnes actives</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Audience</th>
                <th className="px-4 py-2 text-left">Budget</th>
                <th className="px-4 py-2 text-left">Statut</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(campaign => (
                <tr key={campaign.id} className="border-b">
                  <td className="px-4 py-2">{campaign.name}</td>
                  <td className="px-4 py-2">{campaign.audience}</td>
                  <td className="px-4 py-2">{campaign.budget}€</td>
                  <td className="px-4 py-2">
                    <span className={`px-2 py-1 rounded text-sm ${campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {campaign.status === 'active' ? 'Active' : 'En pause'}
                    </span>
                  </td>
                  <td className="px-4 py-2">
                    <button className="text-blue-500 hover:text-blue-700 mr-2">Éditer</button>
                    <button className="text-red-500 hover:text-red-700">Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-semibold mb-3">Créer une nouvelle campagne</h3>
        <form className="space-y-4">
          <div>
            <label className="block mb-1">Nom de la campagne</label>
            <input type="text" className="w-full border rounded p-2" placeholder="Nom de la campagne" />
          </div>
          <div>
            <label className="block mb-1">Audience cible</label>
            <select className="w-full border rounded p-2">
              <option>Visiteurs sans achat</option>
              <option>Acheteurs réguliers</option>
              <option>Anciens clients</option>
              <option>Visiteurs uniques</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Budget quotidien (€)</label>
            <input type="number" className="w-full border rounded p-2" placeholder="Budget" />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Créer la campagne
          </button>
        </form>
      </div>
    </div>
  );
};

export default RemarketingDashboard;