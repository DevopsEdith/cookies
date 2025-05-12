import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { AiOutlineEye } from 'react-icons/ai';
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore'; // Importer serverTimestamp ici
import { toast } from 'react-toastify';


export default function SignUp() {
  // Initialisation de l'état pour gérer les données du formulaire
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const { name, email, password } = formData;
  const navigate = useNavigate();

  // Gestion de la modification des champs du formulaire
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value
    }));
  };

  
  const onSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const auth = getAuth();
      // Création de l'utilisateur avec l'email et le mot de passe
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Mise à jour du profil de l'utilisateur avec son nom
      await updateProfile(auth.currentUser, { displayName: name });
  
      // Création d'une copie des données sans le mot de passe
      const formDataCopy = { ...formData };
      delete formDataCopy.password; // Supprime le mot de passe avant d'enregistrer les données
      formDataCopy.timestamp = serverTimestamp(); // Ajoute un timestamp pour la création
  
      console.log('Form Data:', formDataCopy); // Vérifie que les données sont bien structurées avant l'envoi
  
      // Enregistrement des données dans Firestore sous l'ID de l'utilisateur
      const db = getFirestore(); // Assurez-vous d'initialiser Firestore
      await setDoc(doc(db, 'users', user.uid), formDataCopy, { merge: true });
  
      // Notification de succès
      toast.success('Registration successful!');
      navigate('/'); // Redirection après l'inscription
    } catch (error) {
      // Gestion des erreurs
      toast.error('Something went wrong with registration');
      console.log(error.message);
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white shadow-lg rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create your account</h2>

        <form onSubmit={onSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={onChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              placeholder="Name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={onChange}
              required
              className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
              placeholder="Email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={onChange}
                required
                className="mt-1 w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                placeholder="Password"
              />
              <AiOutlineEye
                className="absolute right-3 top-3 h-5 w-5 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)} // Toggle visibility of password
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200 flex justify-center items-center gap-2"
          >
            <span className="font-semibold">Sign Up</span>
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/sign-in" className="text-blue-600 hover:underline">
            Sign In Instead
          </Link>
        </p>
      </div>
    </div>
  );
}
