import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsLogin(prev => !prev);
    setError('');
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin
      ? `${import.meta.env.VITE_API_BASE_URL}/api/auth/login`
      : `${import.meta.env.VITE_API_BASE_URL}/api/auth/signup`;

    try {
      console.log("🌐 Sending request to:", url);
      console.log("📦 Payload:", formData);

      const res = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true, // Helps with CORS cookies (if used)
      });

      console.log('✅ Auth success:', res.data);
      localStorage.setItem('token', res.data.token);
      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Auth error:', err.response?.data || err.message);
      setError(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div className="min-h-screen pt-32 bg-gradient-to-b from-purple-100 via-pink-50 to-blue-100 flex items-center justify-center overflow-hidden">
      <div className="relative w-full max-w-md p-8 bg-white/80 rounded-3xl shadow-2xl backdrop-blur-lg animate-fadeIn">
        <h2 className="text-3xl font-bold text-center mb-6 text-purple-800 drop-shadow-md">
          {isLogin ? 'Welcome Back 👋' : 'Join the Journey 🚀'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
          />

          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(prev => !prev)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-600 hover:text-purple-600"
              tabIndex={-1}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-800 text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isLogin ? 'New user?' : 'Already have an account?'}{' '}
          <button onClick={toggleMode} className="text-purple-600 underline font-semibold">
            {isLogin ? 'Sign up here' : 'Login here'}
          </button>
        </p>
        {error && <p className="text-red-600 mt-2 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Auth;
