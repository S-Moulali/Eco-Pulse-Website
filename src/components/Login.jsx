import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // If user is already logged in, redirect to the dashboard
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate('/dashboard');
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [navigate]);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      toast.success("Logged in successfully!");
      navigate('/dashboard');  // Ensure navigate after successful login
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError("No account found with this email.");
      } else if (err.code === 'auth/wrong-password') {
        setError("Incorrect password.");
      } else {
        setError("Login failed. Please try again.");
      }
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        setError("No account found for this Google email. Please sign up first.");
        await auth.signOut();
        return;
      }

      toast.success("Logged in with Google!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed.");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center px-6 py-12 bg-black/70">
      {/* Background Image */}
      <img
        src="/assets/background-nature.png"  // Ensure this path is correct
        alt="Nature background"
        className="absolute inset-0 w-full h-full object-cover opacity-50 z-0"
      />

      {/* Login Form */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-10 space-y-6">
        <h2 className="text-4xl font-bold text-center text-white drop-shadow">Welcome Back 👋</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-lg font-semibold text-white mb-1">Email</label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-white/40 rounded-lg bg-white/30 text-white text-base placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold text-white mb-1">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-white/40 rounded-lg bg-white/30 text-white text-base placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-green-400"
                placeholder="••••••••"
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white/80 cursor-pointer text-sm font-medium"
              >
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white text-lg font-semibold py-3 rounded-lg hover:bg-green-700 transition hover:shadow-lg"
          >
            Log In
          </button>
        </form>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/30"></div>
          </div>
          <div className="relative flex justify-center text-base text-white/80 bg-white/10 px-4">
            or
          </div>
        </div>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 border border-white/40 py-3 rounded-lg bg-white/30 text-white text-lg hover:bg-white/40 hover:shadow-md transition"
        >
          <FcGoogle size={24} /> Sign in with Google
        </button>
        {error && <p className="text-center text-red-400 text-base">{error}</p>}
        <p className="text-base text-center text-white/90">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-green-300 font-semibold cursor-pointer hover:underline"
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
