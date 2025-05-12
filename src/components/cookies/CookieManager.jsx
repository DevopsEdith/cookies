// src/components/cookies/CookieManager.jsx
import React, { useState } from 'react';
import { useCookieData } from '../../context/CookieContext';
import CookieForm from './CookieForm';
import CookieList from './CookieList';

const CookieManager = () => {
  const { cookieData, updateCookies, isLoading } = useCookieData();
  const [editMode, setEditMode] = useState(false);
  const [selectedCookie, setSelectedCookie] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const handleEditCookie = (cookie) => {
    setSelectedCookie(cookie);
    setEditMode(true);
  };

  const handleCreateNewCookie = () => {
    setSelectedCookie({
      name: '',
      type: 'userTracking',
      duration: 30,
      data: {}
    });
    setEditMode(true);
  };

  const handleSaveCookie = async (cookieData) => {
    const success = await updateCookies({
      ...cookieData
    });
    
    if (success) {
      setSuccessMessage('Cookie sauvegardé avec succès!');
      setTimeout(() => setSuccessMessage(''), 3000);
      setEditMode(false);
      setSelectedCookie(null);
    }
  };

  const handleCancelEdit = () => {
    setEditMode(false);
    setSelectedCookie(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestionnaire de Cookies</h1>
        
        {!editMode && (
          <button 
            onClick={handleCreateNewCookie}
            className="btn btn-primary flex items-center"
          >
            <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Créer un nouveau cookie
          </button>
        )}
      </div>
      
      {successMessage && (
        <div className="bg-green-50 border-l-4 border-green-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">{successMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      {editMode ? (
        <CookieForm 
          cookie={selectedCookie} 
          onSave={handleSaveCookie}
          onCancel={handleCancelEdit}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Cookie de suivi utilisateur
            </h2>
            <CookieList 
              cookies={cookieData.userTracking} 
              type="userTracking"
              onEdit={handleEditCookie} 
            />
          </div>
          
          <div className="card">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              Cookie de panier
            </h2>
            <CookieList 
              cookies={cookieData.cart} 
              type="cart"
              onEdit={handleEditCookie} 
            />
          </div>
          
          <div className="card">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <svg className="w-5 h-5 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              </svg>
              Cookie de remarketing
            </h2>
            <CookieList 
              cookies={cookieData.remarketing} 
              type="remarketing"
              onEdit={handleEditCookie} 
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CookieManager;