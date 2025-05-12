import React, { useState, useEffect } from 'react';

const ConsentBanner = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [cookiePreferences, setCookiePreferences] = useState({
    necessary: true, // Toujours nécessaire
    analytics: false,
    marketing: false,
    preferences: false
  });
  
  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fait un choix
    const savedConsent = localStorage.getItem('cookieConsent');
    if (!savedConsent) {
      setShowBanner(true);
    } else {
      setCookiePreferences(JSON.parse(savedConsent));
    }
  }, []);

  const handleAcceptAll = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true
    };
    
    setCookiePreferences(allAccepted);
    localStorage.setItem('cookieConsent', JSON.stringify(allAccepted));
    setShowBanner(false);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('cookieConsent', JSON.stringify({
      ...cookiePreferences,
      necessary: true // Toujours nécessaire
    }));
    setShowBanner(false);
  };

  const handleRejectAll = () => {
    const onlyNecessary = {
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false
    };
    
    setCookiePreferences(onlyNecessary);
    localStorage.setItem('cookieConsent', JSON.stringify(onlyNecessary));
    setShowBanner(false);
  };

  const handlePreferenceChange = (category) => {
    setCookiePreferences({
      ...cookiePreferences,
      [category]: !cookiePreferences[category]
    });
  };

  // Bannière de consentement des cookies pour affichage sur le site
  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="mb-4 md:mb-0 md:mr-6">
            <h3 className="text-lg font-bold mb-2">Vos choix en matière de cookies</h3>
            <p className="text-gray-700 text-sm mb-2">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site, personnaliser le contenu et les publicités, 
              fournir des fonctionnalités de médias sociaux et analyser notre trafic.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleAcceptAll}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Accepter tout
            </button>
            <button
              onClick={handleRejectAll}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Refuser tout
            </button>
            <button
              onClick={() => document.getElementById('preferences-panel').classList.toggle('hidden')}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300"
            >
              Préférences
            </button>
          </div>
        </div>
        
        <div id="preferences-panel" className="hidden mt-4 pt-4 border-t">
          <h4 className="font-medium mb-2">Détails des cookies</h4>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Cookies nécessaires</h5>
                <p className="text-sm text-gray-600">Ces cookies sont indispensables au fonctionnement du site.</p>
              </div>
              <label className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  checked={true} 
                  disabled 
                  className="h-5 w-5 text-blue-600" 
                />
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Cookies d'analyse</h5>
                <p className="text-sm text-gray-600">Nous aident à comprendre comment les visiteurs interagissent avec le site.</p>
              </div>
              <label className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  checked={cookiePreferences.analytics} 
                  onChange={() => handlePreferenceChange('analytics')} 
                  className="h-5 w-5 text-blue-600" 
                />
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Cookies marketing</h5>
                <p className="text-sm text-gray-600">Utilisés pour vous présenter des publicités pertinentes.</p>
              </div>
              <label className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  checked={cookiePreferences.marketing} 
                  onChange={() => handlePreferenceChange('marketing')} 
                  className="h-5 w-5 text-blue-600" 
                />
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h5 className="font-medium">Cookies de préférences</h5>
                <p className="text-sm text-gray-600">Permettent au site de se souvenir de vos préférences.</p>
              </div>
              <label className="inline-flex items-center">
                <input 
                  type="checkbox" 
                  checked={cookiePreferences.preferences} 
                  onChange={() => handlePreferenceChange('preferences')} 
                  className="h-5 w-5 text-blue-600" 
                />
              </label>
            </div>
          </div>
          
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSavePreferences}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Enregistrer mes préférences
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;