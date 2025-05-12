/**
 * Utilitaires pour la validation des données
 */

/**
 * Valider une adresse email
 * @param {string} email - Email à valider
 * @returns {boolean} - True si l'email est valide
 */
export const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };
  
  /**
   * Valider un numéro de téléphone français
   * @param {string} phone - Numéro à valider
   * @returns {boolean} - True si le numéro est valide
   */
  export const isValidFrenchPhone = (phone) => {
    const re = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    return re.test(String(phone));
  };
  
  /**
   * Valider qu'une chaîne contient au moins un nombre
   * @param {string} str - Chaîne à vérifier
   * @returns {boolean} - True si la chaîne contient au moins un nombre
   */
  export const containsNumber = (str) => {
    return /\d/.test(str);
  };
  
  /**
   * Valider qu'une chaîne contient au moins une lettre majuscule
   * @param {string} str - Chaîne à vérifier
   * @returns {boolean} - True si la chaîne contient au moins une majuscule
   */
  export const containsUppercase = (str) => {
    return /[A-Z]/.test(str);
  };
  
  /**
   * Valider qu'une chaîne contient au moins un caractère spécial
   * @param {string} str - Chaîne à vérifier
   * @returns {boolean} - True si la chaîne contient au moins un caractère spécial
   */
  export const containsSpecialChar = (str) => {
    return /[!@#$%^&*(),.?":{}|<>]/.test(str);
  };
  
  /**
   * Valider la force d'un mot de passe
   * @param {string} password - Mot de passe à valider
   * @returns {Object} - Évaluation de la force du mot de passe
   */
  export const validatePasswordStrength = (password) => {
    let strength = 0;
    const feedback = [];
    
    if (password.length < 8) {
      feedback.push("Le mot de passe doit contenir au moins 8 caractères");
    } else {
      strength += 1;
    }
    
    if (!containsNumber(password)) {
      feedback.push("Le mot de passe doit contenir au moins un chiffre");
    } else {
      strength += 1;
    }
    
    if (!containsUppercase(password)) {
      feedback.push("Le mot de passe doit contenir au moins une lettre majuscule");
    } else {
      strength += 1;
    }
    
    if (!containsSpecialChar(password)) {
      feedback.push("Le mot de passe doit contenir au moins un caractère spécial");
    } else {
      strength += 1;
    }
    
    let strengthText = "";
    if (strength === 0) strengthText = "Très faible";
    else if (strength === 1) strengthText = "Faible";
    else if (strength === 2) strengthText = "Moyen";
    else if (strength === 3) strengthText = "Fort";
    else if (strength === 4) strengthText = "Très fort";
    
    return {
      score: strength,
      strength: strengthText,
      feedback
    };
  };
  
  /**
   * Valider que la valeur est un nombre
   * @param {any} value - Valeur à vérifier
   * @returns {boolean} - True si la valeur est un nombre
   */
  export const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };