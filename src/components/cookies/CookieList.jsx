// src/components/cookies/CookieList.jsx
import React, { useState } from 'react';

const CookieList = ({ cookies, type, onEdit }) => {
  const [expandedItem, setExpandedItem] = useState(null);

  const toggleExpand = (key) => {
    setExpandedItem(expandedItem === key ? null : key);
  };

  // Fonction pour formater le type de cookie
  const getTypeLabel = (type) => {
    switch (type) {
      case 'userTracking':
        return 'Suivi utilisateur';
      case 'cart':
        return 'Panier';
      case 'remarketing':
        return 'Remarketing';
      default:
        return type;
    }
  };

  // Si les cookies sont vides ou ne contiennent aucune clé
  if (!cookies || Object.keys(cookies).length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <svg 
          className="mx-auto h-12 w-12 text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" 
          />
        </svg>
        <p className="mt-2">Aucun cookie configuré</p>
        <p className="text-sm">Ajoutez un nouveau cookie pour commencer</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-gray-200">
      {Object.entries(cookies).map(([key, value]) => (
        <div key={key} className="py-3">
          <div 
            className="flex items-center justify-between cursor-pointer"
            onClick={() => toggleExpand(key)}
          >
            <div className="flex items-center">
              <div className={`h-2 w-2 rounded-full ${type === 'userTracking' ? 'bg-blue-500' : type === 'cart' ? 'bg-yellow-500' : 'bg-green-500'} mr-2`}></div>
              <span className="font-medium">{key}</span>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit({ name: key, type, data: value });
                }}
                className="text-gray-400 hover:text-primary p-1"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleExpand(key);
                }}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <svg 
                  className={`h-4 w-4 transition-transform ${expandedItem === key ? 'transform rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>
          
          {expandedItem === key && (
            <div className="mt-2 pl-4 text-sm text-gray-600 border-l-2 border-gray-200">
              <div className="bg-gray-50 rounded p-3 font-mono text-xs overflow-auto max-h-40">
                {JSON.stringify(value, null, 2)}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CookieList;