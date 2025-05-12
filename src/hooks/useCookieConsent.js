import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour gérer le consentement des cookies
 * @param {Object} defaultPreferences - Les préférences par défaut pour les cookies
 * @returns {Array} - [cookieConsent, updateCookieConsent, resetCookieConsent]
 */
const useCookieConsent = (defaultPreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false
}) => {
  const [cookieConsent, setCookieConsent] = useState(defaultPreferences);
  const [isLoaded, setIsLoaded] = useState(false);

  // Charger les préférences au montage du composant
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookieConsent');
    if (savedConsent) {
      try {
        setCookieConsent(JSON.parse(savedConsent));
      } catch (error) {
        console.error('Erreur lors du chargement des préférences de cookies:', error);
        // En cas d'erreur, utiliser les valeurs par défaut
        setCookieConsent(defaultPreferences);
      }
    }
    setIsLoaded(true);
  }, []);

  // Mettre à jour les préférences
  const updateCookieConsent = (newPreferences) => {
    const updatedPreferences = {
      ...cookieConsent,
      ...newPreferences,
      necessary: true // Les cookies nécessaires sont toujours acceptés
    };
    
    setCookieConsent(updatedPreferences);
    localStorage.setItem('cookieConsent', JSON.stringify(updatedPreferences));
    return updatedPreferences;
  };

  // Réinitialiser les préférences
  const resetCookieConsent = () => {
    localStorage.removeItem('cookieConsent');
    setCookieConsent(defaultPreferences);
    return defaultPreferences;
  };

  return [cookieConsent, updateCookieConsent, resetCookieConsent, isLoaded];
};

export default useCookieConsent;