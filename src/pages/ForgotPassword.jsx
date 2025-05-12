import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { toast } from 'react-toastify';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const onChange = (e) => setEmail(e.target.value);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Password reset email sent!');
    } catch (error) {
      toast.error('Could not send reset email');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <header className="mb-6 text-center">
        <h1 className="text-2xl font-semibold">Forgot Password</h1>
      </header>

      <main>
        <form onSubmit={onSubmit} className="space-y-4">
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Link to="/sign-in" className="text-blue-600 hover:underline text-sm inline-block">
            Sign In
          </Link>

          <div className="flex items-center justify-between bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
            <span className="font-medium">Send Reset Link</span>
            <button className="ml-2">
              <img src="/keyboardArrowRightIcon.svg" alt="arrow right" width="24" height="24" />
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
