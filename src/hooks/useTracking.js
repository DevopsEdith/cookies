import { useEffect, useState } from 'react';

/**
 * Hook personnalisé pour gérer les pixels de suivi
 * @param {Object} options - Options de configuration des trackers
 * @returns {Object} - Méthodes pour déclencher des événements de suivi
 */
const useTracking = (options = {}) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [trackingEnabled, setTrackingEnabled] = useState(false);

  useEffect(() => {
    // Vérifier si le suivi est autorisé en fonction du consentement des cookies
    const checkConsentAndInitialize = () => {
      const consent = localStorage.getItem('cookieConsent');
      if (consent) {
        try {
          const { analytics, marketing } = JSON.parse(consent);
          setTrackingEnabled(analytics || marketing);
        } catch (error) {
          console.error('Erreur lors de la lecture du consentement:', error);
          setTrackingEnabled(false);
        }
      } else {
        setTrackingEnabled(false);
      }
    };

    checkConsentAndInitialize();
    
    // Initialiser les scripts de suivi ici si nécessaire
    if (trackingEnabled && !isInitialized) {
      // Code pour initialiser les trackers
      console.log('Initialisation des trackers...');
      setIsInitialized(true);
    }

    // Écouter les changements de consentement
    const handleStorageChange = (event) => {
      if (event.key === 'cookieConsent') {
        checkConsentAndInitialize();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [trackingEnabled, isInitialized]);

  // Méthode pour suivre un événement de page vue
  const trackPageView = (pageTitle, pagePath) => {
    if (!trackingEnabled) return;
    
    console.log(`Tracking page view: ${pageTitle} at ${pagePath}`);
    // Implémentation du suivi Google Analytics ou autre ici
  };

  // Méthode pour suivre un événement personnalisé
  const trackEvent = (category, action, label = null, value = null) => {
    if (!trackingEnabled) return;
    
    console.log(`Tracking event: ${category} - ${action} - ${label} - ${value}`);
    // Implémentation du suivi d'événement ici
  };

  //// Méthode pour suivre une conversion
  const trackConversion = (conversionId, value = 0, currency = 'EUR') => {
    if (!trackingEnabled) return;
    
    console.log(`Tracking conversion: ${conversionId} - ${value} ${currency}`);
    // Implémentation du suivi de conversion ici
  };

  // Méthode pour suivre un ajout au panier
  const trackAddToCart = (product, quantity, price) => {
    if (!trackingEnabled) return;
    
    console.log(`Tracking add to cart: ${product} - ${quantity} - ${price}`);
    // Implémentation du suivi d'ajout au panier ici
  };

  return {
    isEnabled: trackingEnabled,
    isInitialized,
    trackPageView,
    trackEvent,
    trackConversion,
    trackAddToCart
  };
};

export default useTracking;