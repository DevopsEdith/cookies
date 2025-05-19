// src/services/cookieService.js

const API_URL = 'http://localhost:8080/api';

// Fonction pour envoyer les données de tracking
const sendTrackingData = async (eventType, data) => {
  try {
    const response = await fetch(`${API_URL}/track`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        trackingId: localStorage.getItem('trackingId') || 'anonymous',
        eventType,
        eventData: JSON.stringify(data),
        sessionId: localStorage.getItem('sessionId')
      })
    });
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de l\'envoi des données:', error);
    throw error;
  }
};

// Récupérer toutes les données de cookies
export const fetchCookieData = async () => {
  try {
    const response = await fetch(`${API_URL}/track/events`);
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
    throw error;
  }
};

// Mettre à jour un cookie existant
export const updateCookieData = async (newData) => {
  try {
    await sendTrackingData('cookie_update', newData);
    return true;
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    return false;
  }
};

// Récupérer les statistiques
export const fetchCookieStats = async (timeframe = 'week') => {
  try {
    const response = await fetch(`${API_URL}/track/stats?timeframe=${timeframe}`);
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    throw error;
  }
};

// Récupérer les données de remarketing
export const fetchRemarketingData = async () => {
  try {
    const response = await fetch(`${API_URL}/track/remarketing`);
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des données de remarketing:', error);
    throw error;
  }
};

// Récupérer les paniers abandonnés
export const fetchAbandonedCarts = async () => {
  try {
    const response = await fetch(`${API_URL}/track/abandoned-carts`);
    return await response.json();
  } catch (error) {
    console.error('Erreur lors de la récupération des paniers abandonnés:', error);
    throw error;
  }
};