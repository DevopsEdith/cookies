import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Importation du service d'authentification

// Configuration de ton application Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCz8XdVDEnrFv5ciaiH3yWJDaXWkLKAM08",
    authDomain: "mon-app-bcfa7.firebaseapp.com",
    projectId: "mon-app-bcfa7",
    storageBucket: "mon-app-bcfa7.firebasestorage.app",
    messagingSenderId: "235059455678",
    appId: "1:235059455678:web:f15a845aecc5857458e0ef"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Exportation des services nécessaires
export const db = getFirestore(app);  // Export Firestore
export const auth = getAuth(app);  // Export Auth

export default app;
