// src/services/cookieService.js

// ============================
// 1. Données simulées
// ============================

// Cookies simulés
const mockCookies = [
  {
    id: '1',
    user: 'John Doe',
    accepted: true,
    date: '2025-04-01',
  },
  {
    id: '2',
    user: 'Jane Smith',
    accepted: false,
    date: '2025-04-05',
  },
];

// Statistiques simulées
const mockStats = {
  week: {
    accepted: 120,
    rejected: 30,
    total: 150,
  },
  month: {
    accepted: 400,
    rejected: 120,
    total: 520,
  },
};

// Paniers abandonnés simulés
const mockAbandonedCarts = [
  {
    id: 'c1',
    user: 'John Doe',
    items: 3,
    total: 45.99,
    date: '2025-04-10',
  },
  {
    id: 'c2',
    user: 'Alice Wonder',
    items: 2,
    total: 28.50,
    date: '2025-04-11',
  },
];

// Données de remarketing simulées
const mockRemarketingData = [
  {
    campaign: 'Spring Sale',
    views: 500,
    clicks: 120,
    conversions: 15,
  },
  {
    campaign: 'Abandoned Cart Recovery',
    views: 300,
    clicks: 80,
    conversions: 12,
  },
];

// ============================
// 2. Fonction utilitaire de délai
// ============================

const simulateDelay = (data, delay = 500) =>
  new Promise((resolve) => setTimeout(() => resolve(structuredClone(data)), delay));

// ============================
// 3. Fonctions exportées
// ============================

// Récupérer toutes les données de cookies
export const fetchCookieData = () => simulateDelay(mockCookies);

// Mettre à jour un cookie existant
export const updateCookieData = (newData) => {
  const index = mockCookies.findIndex((c) => c.id === newData.id);
  if (index !== -1) {
    mockCookies[index] = { ...mockCookies[index], ...newData };
  } else {
    console.warn(`Cookie avec l'id ${newData.id} non trouvé.`);
  }
  return simulateDelay(mockCookies);
};

// Récupérer les statistiques (par semaine ou mois)
export const fetchCookieStats = (timeframe = 'week') =>
  simulateDelay(mockStats[timeframe] || mockStats.week);



// Récupérer les données de remarketing
export const fetchRemarketingData = () => simulateDelay(mockRemarketingData);
const mockAbandonedCartsDetailed = [
  {
    id: 'c1',
    userId: 'John Doe',
    abandonedAt: '2025-04-10T14:00:00Z',
    items: [
      { id: 'prod1', quantity: 2, price: 10.00 },
      { id: 'prod2', quantity: 1, price: 25.99 },
    ],
    reminderSent: true,
  },
  {
    id: 'c2',
    userId: 'Alice Wonder',
    abandonedAt: '2025-04-11T09:30:00Z',
    items: [
      { id: 'prod3', quantity: 2, price: 14.25 },
    ],
    reminderSent: false,
  },
];

export const fetchAbandonedCarts = () => simulateDelay(mockAbandonedCartsDetailed);
