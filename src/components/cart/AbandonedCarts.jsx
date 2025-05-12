import React, { useState, useEffect } from 'react';
import { fetchAbandonedCarts } from '../../services/cookieService';

const AbandonedCarts = () => {
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('all'); // 'all', 'today', 'week', 'month'

  useEffect(() => {
    const loadCarts = async () => {
      setIsLoading(true);
      try {
        const data = await fetchAbandonedCarts();
        setCarts(data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des paniers abandonnés');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCarts();
  }, []);

  const calculateTotal = (items = []) => {
    if (!Array.isArray(items)) return '0.00';
    return items.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? 'Date invalide' : date.toLocaleDateString('fr-FR');
  };

  const filteredCarts = carts.filter(cart => {
    if (filter === 'all') return true;

    const abandonedDate = new Date(cart.abandonedAt);
    const now = new Date();

    if (filter === 'today') {
      return abandonedDate.toDateString() === now.toDateString();
    } else if (filter === 'week') {
      const oneWeekAgo = new Date(now);
      oneWeekAgo.setDate(now.getDate() - 7);
      return abandonedDate >= oneWeekAgo;
    } else if (filter === 'month') {
      const oneMonthAgo = new Date(now);
      oneMonthAgo.setMonth(now.getMonth() - 1);
      return abandonedDate >= oneMonthAgo;
    }

    return true;
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Paniers abandonnés</h1>
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Période:</label>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="form-input py-1 text-sm"
          >
            <option value="all">Tous</option>
            <option value="today">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
          </select>
        </div>
      </div>

      {filteredCarts.length === 0 ? (
        <div className="card text-center py-12">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun panier abandonné</h3>
          <p className="mt-1 text-gray-500">Aucun panier abandonné trouvé pour la période sélectionnée.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Utilisateur</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date d'abandon</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Articles</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Rappel envoyé</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredCarts.map((cart, index) => {
                const items = Array.isArray(cart.items) ? cart.items : [];

                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{cart.userId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatDate(cart.abandonedAt)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="text-gray-900">{items.length} article{items.length > 1 ? 's' : ''}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {items.slice(0, 2).map((item, i) => (
                          <div key={i}>{item.quantity}x {item.id}</div>
                        ))}
                        {items.length > 2 && <div>+ {items.length - 2} autres...</div>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {calculateTotal(items)} €
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${cart.reminderSent ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                        {cart.reminderSent ? 'Oui' : 'Non'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-primary hover:text-primary-dark mr-3">Voir détails</button>
                      {!cart.reminderSent && (
                        <button className="text-yellow-600 hover:text-yellow-900">Envoyer rappel</button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AbandonedCarts;
