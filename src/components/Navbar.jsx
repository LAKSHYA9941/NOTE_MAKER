import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const navLinkClasses = (path) =>
    `relative px-4 py-2 text-lg font-semibold text-white drop-shadow-[1px_1px_2px_black]
     transition-all duration-300 ease-in-out overflow-hidden
     before:content-[''] before:absolute before:-inset-1 before:bg-gradient-to-r
     before:from-pink-500 before:via-purple-500 before:to-cyan-400
     before:blur-sm before:opacity-0 hover:before:opacity-30
     hover:scale-110 hover:text-cyan-300
     ${
       location.pathname === path
         ? 'border-b-2 border-cyan-300'
         : ''
     }`;

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-black/20 shadow-[0_4px_30px_rgba(0,0,0,0.6)] border-b border-white/10">
      <div className="flex items-center justify-between px-8 py-4">
        <div className="text-3xl font-bold text-white tracking-wide drop-shadow-[2px_2px_3px_black] hover:scale-105 transition-transform">
          <Link to="/" className="relative group">
            <span className="group-hover:text-cyan-400 transition duration-300">
              📝 Notes Keeper
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-1 bg-cyan-300 transition-all group-hover:w-full"></span>
          </Link>
        </div>
        <ul className="flex gap-10">
          <li><Link to="/" className={navLinkClasses('/')}>Home</Link></li>
          <li><Link to="/auth" className={navLinkClasses('/auth')}>Get Started</Link></li>
          <li><Link to="/dashboard" className={navLinkClasses('/dashboard')}>Dashboard</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
