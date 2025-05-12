import { useState } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase.config';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function Profile() {
  const auth = getAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: auth.currentUser?.displayName || '',
    email: auth.currentUser?.email || ''
  });
  const [changeDetails, setChangeDetails] = useState(false);
  const { name, email } = formData;

  const onLogout = () => {
    auth.signOut();
    navigate('/');
  };

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value
    }));
  };

  const onSubmit = async () => {
    try {
      if (auth.currentUser.displayName !== name) {
        await updateProfile(auth.currentUser, { displayName: name });
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, { name });
        toast.success('Profile updated!');
      }
    } catch (error) {
      toast.error('Could not update profile details');
      console.error(error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Profile</h1>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          onClick={onLogout}
        >
          Logout
        </button>
      </header>

      <main>
        <div className="flex justify-between items-center mb-4">
          <p className="font-medium">Personal Details</p>
          <p
            className="text-blue-600 cursor-pointer hover:underline"
            onClick={() => {
              changeDetails && onSubmit();
              setChangeDetails((prev) => !prev);
            }}
          >
            {changeDetails ? 'Done' : 'Change'}
          </p>
        </div>

        <div className="bg-gray-100 p-4 rounded-md">
          <form className="space-y-4">
            <input
              type="text"
              id="name"
              disabled={!changeDetails}
              value={name}
              onChange={onChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
                changeDetails
                  ? 'bg-white border-blue-500 focus:ring-2 focus:ring-blue-500'
                  : 'bg-gray-200 cursor-not-allowed'
              }`}
            />
            <input
              type="text"
              id="email"
              disabled
              value={email}
              onChange={onChange}
              className="w-full px-4 py-2 border bg-gray-200 rounded-md cursor-not-allowed"
            />
          </form>
        </div>
      </main>
    </div>
  );
}
