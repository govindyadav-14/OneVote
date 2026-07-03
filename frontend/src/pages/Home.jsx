import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl text-center space-y-6">
        {/* 1. The "Hook" - Big Title */}
        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
          Vote Securely. Vote Live.
        </h1>
        
        {/* 2. The Explanation - Subtitle */}
        <p className="text-xl text-gray-300">
          The next generation of decentralized voting. Real-time updates, secure authentication, and instant results.
        </p>

        {/* 3. Call to Action (Buttons) */}
        <div className="flex justify-center gap-6 mt-8">
          <Link to="/login" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold text-lg transition-all shadow-lg shadow-blue-500/30">
            Login
          </Link>
          <Link to="/signup" className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-bold text-lg transition-all border border-gray-600">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}