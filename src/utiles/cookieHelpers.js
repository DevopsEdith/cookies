/**
 * Utilitaires pour la gestion des cookies
 */

/**
 * Définir un cookie
 * @param {string} name - Nom du cookie
 * @param {string} value - Valeur du cookie
 * @param {number} days - Durée de vie du cookie en jours
 */
export const setCookie = (name, value, days = 30) => {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/;SameSite=Lax";
  };
  
  /**
   * Récupérer la valeur d'un cookie
   * @param {string} name - Nom du cookie à récupérer
   * @returns {string|null} - Valeur du cookie ou null si non trouvé
   */
  export const getCookie = (name) => {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');
    
    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return null;
  };
  
  /**
   * Supprimer un cookie
   * @param {string} name - Nom du cookie à supprimer
   */
  export const deleteCookie = (name) => {
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
  };
  
  /**
   * Vérifier si un cookie existe
   * @param {string} name - Nom du cookie à vérifier
   * @returns {boolean} - True si le cookie existe, false sinon
   */
  export const cookieExists = (name) => {
    return getCookie(name) !== null;
  };
  
  /**
   * Générer un ID de cookie unique
   * @returns {string} - ID unique de format UUID
   */
  export const generateCookieId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  };
  
  /**
   * Obtenir tous les cookies sous forme d'objet
   * @returns {Object} - Tous les cookies du site
   */
  export const getAllCookies = () => {
    const cookies = {};
    const cookieString = document.cookie;
    
    if (cookieString === '') return cookies;
    
    const cookiePairs = cookieString.split(';');
    for (let i = 0; i < cookiePairs.length; i++) {
      const cookiePair = cookiePairs[i].split('=');
      const cookieName = cookiePair[0].trim();
      const cookieValue = cookiePair.length > 1 ? cookiePair[1] : '';
      cookies[cookieName] = decodeURIComponent(cookieValue);
    }
    
    return cookies;
  };