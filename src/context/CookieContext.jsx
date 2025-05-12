// src/context/CookieContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';
import { fetchCookieData, updateCookieData } from '../services/cookieService';

const CookieContext = createContext();

export const CookieProvider = ({ children }) => {
  const [cookieData, setCookieData] = useState({
    userTracking: {
      viewedArticles: [],
      categoriesViewed: [],
      mostClickedProducts: []
    },
    cart: {
      items: [],
      abandonedCarts: []
    },
    remarketing: {
      campaigns: [],
      userInterests: []
    }
  });
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Charger les données initiales
  useEffect(() => {
    const loadCookieData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCookieData();
        setCookieData(data);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des données de cookies');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadCookieData();
  }, []);

  // Mettre à jour les données de cookies
  const updateCookies = async (newData) => {
    try {
      setIsLoading(true);
      await updateCookieData(newData);
      setCookieData(prevData => ({ ...prevData, ...newData }));
      return true;
    } catch (err) {
      setError('Erreur lors de la mise à jour des cookies');
      console.error(err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    cookieData,
    updateCookies,
    isLoading,
    error
  };

  return (
    <CookieContext.Provider value={value}>
      {children}
    </CookieContext.Provider>
  );
};

// Hook personnalisé pour faciliter l'accès au contexte
export const useCookieData = () => {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookieData doit être utilisé dans un CookieProvider');
  }
  return context;
};