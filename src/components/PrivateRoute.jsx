// components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { useState, useEffect } from 'react';

export default function PrivateRoute({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const checkAuth = () => {
      const unsubscribe = auth.onAuthStateChanged(user => {
        console.log(user);  // Ajoutez cette ligne pour voir les informations de l'utilisateur dans la console
        if (user) {
          setIsAuthenticated(true);
        }
        setIsLoading(false);
      });

      return unsubscribe;
    };

    const unsubscribe = checkAuth();
    return unsubscribe;
  }, [auth]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/sign-in" />;
}
