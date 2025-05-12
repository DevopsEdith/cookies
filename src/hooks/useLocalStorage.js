import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour utiliser le localStorage
 * @param {string} key - La clé pour stocker la valeur dans localStorage
 * @param {any} initialValue - Valeur initiale si aucune n'est trouvée
 * @returns {Array} - [storedValue, setValue]
 */
const useLocalStorage = (key, initialValue) => {
  // État pour stocker notre valeur
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Récupérer depuis localStorage
      const item = window.localStorage.getItem(key);
      // Analyser le JSON stocké ou retourner initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // En cas d'erreur, utiliser la valeur initiale
      console.error(`Erreur lors de la récupération de ${key} depuis localStorage:`, error);
      return initialValue;
    }
  });

  // Fonction pour mettre à jour la valeur stockée et localStorage
  const setValue = (value) => {
    try {
      // Permettre à value d'être une fonction
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      
      // Enregistrer dans l'état
      setStoredValue(valueToStore);
      
      // Enregistrer dans localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Erreur lors de l'enregistrement de ${key} dans localStorage:`, error);
    }
  };

  // Écouter les changements dans d'autres onglets/fenêtres
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        try {
          setStoredValue(JSON.parse(event.newValue));
        } catch (error) {
          console.error(`Erreur lors de la synchronisation de ${key} entre onglets:`, error);
        }
      }
    };

    // Ajouter l'écouteur d'événement
    window.addEventListener('storage', handleStorageChange);
    
    // Nettoyer l'écouteur d'événement
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue];
};

export default useLocalStorage;