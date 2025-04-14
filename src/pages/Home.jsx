import React from 'react';
import { useNavigate } from 'react-router-dom';
import './bubbles.css'; // We'll create this file next

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="relative h-screen bg-gradient-to-br from-teal-100 via-pink-50 to-purple-100 overflow-hidden">
      {/* Bubbles in the background */}
      <div className="absolute inset-0 z-0">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`bubble  bubble-${i + 1} blur-sm`} />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-5xl font-bold text-blue-800 drop-shadow-md mb-4">Welcome to NoteKeeper 📝</h1>
        <p className="text-lg text-gray-700 max-w-xl mb-6">
          Organize your thoughts effortlessly. Create, update, delete, and download your personal notes – all in one secure, beautiful space.
        </p>
        <button
          onClick={() => navigate('/auth')}
          className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-lg font-semibold rounded-full shadow-md transition-all duration-300 animate-bounce"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Home;
