// components/OAuth.jsx
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';

export default function OAuth() {
  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Check for user in Firestore
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      // If user doesn't exist, create user in Firestore
      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp()
        });
      }

      navigate('/');
      toast.success('Signed in with Google successfully!');
    } catch (error) {
      toast.error('Could not authorize with Google');
    }
  };

  return (
    <div className="socialLogin">
      <p>
        Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with
      </p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img
          className="socialIconImg"
          src="/googleIcon.svg"
          alt="google"
        />
      </button>
    </div>
  );
}