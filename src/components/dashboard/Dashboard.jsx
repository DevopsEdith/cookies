// src/components/dashboard/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useCookieData } from '../../context/CookieContext';
import StatCards from './StatCards';
import SummaryCharts from './SummaryCharts';
import { fetchCookieStats } from '../../services/cookieService';

const Dashboard = () => {
  const { cookieData, isLoading, error } = useCookieData();
  const [stats, setStats] = useState(null);
  const [timeframe, setTimeframe] = useState('week');
  const [isStatsLoading, setIsStatsLoading] = useState(false);

  useEffect(() => {
    const loadStats = async () => {
      setIsStatsLoading(true);
      try {
        const statsData = await fetchCookieStats(timeframe);
        setStats(statsData);
      } catch (err) {
        console.error('Erreur lors du chargement des statistiques:', err);
      } finally {
        setIsStatsLoading(false);
      }
    };

    loadStats();
  }, [timeframe]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
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
        <h1 className="text-2xl font-bold text-gray-800">Tableau de bord des cookies</h1>
        
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-600">Période:</label>
          <select 
            value={timeframe} 
            onChange={(e) => setTimeframe(e.target.value)}
            className="form-input py-1 text-sm"
          >
            <option value="day">Aujourd'hui</option>
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="year">Cette année</option>
          </select>
        </div>
      </div>

      {isStatsLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : (
        <>
          <StatCards 
            totalUsers={stats?.totalUsers || 0}
            activeUsers={stats?.activeUsers || 0}
            abandonedCarts={stats?.abandonedCarts || 0}
            conversionRate={stats?.conversionRate || 0}
          />
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Catégories consultées</h2>
              <SummaryCharts 
                data={stats?.viewedCategories || []}
                type="category"
              />
            </div>
            
            <div className="card">
              <h2 className="text-lg font-semibold mb-4">Produits populaires</h2>
              <SummaryCharts 
                data={stats?.clickedProducts || []}
                type="product"
              />
            </div>
          </div>
          
          <div className="card">
            <h2 className="text-lg font-semibold mb-4">Activité récente</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="px-4 py-2">Date</th>
                    <th className="px-4 py-2">Utilisateur</th>
                    <th className="px-4 py-2">Action</th>
                    <th className="px-4 py-2">Détails</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {(stats?.recentActivity || []).map((activity, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-500">
                        {new Date(activity.timestamp).toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-medium">{activity.userId}</span>
                      </td>
                      <td className="px-4 py-3">{activity.action}</td>
                      <td className="px-4 py-3 text-gray-500">{activity.details}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;