// src/components/dashboard/StatCards.jsx
import React from 'react';

const StatCards = ({ totalUsers, activeUsers, abandonedCarts, conversionRate }) => {
  const stats = [
    {
      title: 'Utilisateurs Total',
      value: totalUsers,
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
      bgColor: 'bg-blue-500',
      textColor: 'text-blue-500',
      bgLightColor: 'bg-blue-100',
    },
    {
      title: 'Utilisateurs Actifs',
      value: activeUsers,
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      bgColor: 'bg-green-500',
      textColor: 'text-green-500',
      bgLightColor: 'bg-green-100',
    },
    {
      title: 'Paniers Abandonnés',
      value: abandonedCarts,
      icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z',
      bgColor: 'bg-yellow-500',
      textColor: 'text-yellow-500',
      bgLightColor: 'bg-yellow-100',
    },
    {
      title: 'Taux de Conversion',
      value: conversionRate + '%',
      icon: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6',
      bgColor: 'bg-purple-500',
      textColor: 'text-purple-500',
      bgLightColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="card">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-gray-500 mb-1">{stat.title}</p>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
            </div>
            <div className={`${stat.bgLightColor} p-2 rounded-lg`}>
              <svg
                className={`h-6 w-6 ${stat.textColor}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={stat.icon}
                />
              </svg>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatCards;