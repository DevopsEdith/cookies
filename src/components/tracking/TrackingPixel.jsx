import React, { useEffect, useState } from 'react';

const TrackingPixel = () => {
  const [trackers, setTrackers] = useState([
    { id: 1, name: 'Google Analytics', enabled: true, code: 'UA-XXXXX-Y' },
    { id: 2, name: 'Facebook Pixel', enabled: true, code: '123456789012345' },
    { id: 3, name: 'Hotjar', enabled: false, code: '1234567' }
  ]);

  const [newTracker, setNewTracker] = useState({
    name: '',
    code: '',
    enabled: true
  });

  const handleToggleTracker = (id) => {
    setTrackers(trackers.map(tracker => 
      tracker.id === id ? { ...tracker, enabled: !tracker.enabled } : tracker
    ));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTracker({
      ...newTracker,
      [name]: value
    });
  };

  const handleAddTracker = (e) => {
    e.preventDefault();
    if (newTracker.name && newTracker.code) {
      setTrackers([
        ...trackers,
        {
          id: Date.now(),
          ...newTracker
        }
      ]);
      // Reset form
      setNewTracker({
        name: '',
        code: '',
        enabled: true
      });
    }
  };

  const handleDeleteTracker = (id) => {
    setTrackers(trackers.filter(tracker => tracker.id !== id));
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-6">Gestion des pixels de suivi</h2>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h3 className="text-lg font-semibold mb-4">Pixels de suivi actuels</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Nom</th>
                <th className="px-4 py-2 text-left">Code</th>
                <th className="px-4 py-2 text-left">Statut</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trackers.map(tracker => (
                <tr key={tracker.id} className="border-b">
                  <td className="px-4 py-2">{tracker.name}</td>
                  <td className="px-4 py-2">
                    <code className="bg-gray-100 px-2 py-1 rounded">{tracker.code}</code>
                  </td>
                  <td className="px-4 py-2">
                    <label className="inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={tracker.enabled}
                        onChange={() => handleToggleTracker(tracker.id)}
                        className="sr-only peer" 
                      />
                      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-900">
                        {tracker.enabled ? 'Actif' : 'Inactif'}
                      </span>
                    </label>
                  </td>
                  <td className="px-4 py-2">
                    <button 
                      onClick={() => handleDeleteTracker(tracker.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Ajouter un nouveau pixel</h3>
        <form onSubmit={handleAddTracker} className="space-y-4">
          <div>
            <label className="block mb-1">Nom du tracker</label>
            <input 
              type="text" 
              name="name"
              value={newTracker.name}
              onChange={handleInputChange}
              className="w-full border rounded p-2" 
              placeholder="Google Analytics, Facebook Pixel, etc." 
            />
          </div>
          <div>
            <label className="block mb-1">Code du pixel</label>
            <input 
              type="text" 
              name="code"
              value={newTracker.code}
              onChange={handleInputChange}
              className="w-full border rounded p-2" 
              placeholder="UA-XXXXX-Y ou identifiant similaire" 
            />
          </div>
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Ajouter le pixel
          </button>
        </form>
      </div>
      
      <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-700">
        <h4 className="font-medium">Remarque importante</h4>
        <p>L'utilisation de pixels de suivi peut être soumise à des réglementations comme le RGPD en Europe. Assurez-vous d'informer vos utilisateurs et d'obtenir leur consentement si nécessaire.</p>
      </div>
    </div>
  );
};

export default TrackingPixel;