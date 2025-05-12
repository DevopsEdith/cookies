// src/components/layout/Header.jsx
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm z-10">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center">
          <h1 className="text-xl font-semibold text-gray-800">
            Cookie Manager Admin
          </h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              className="form-input py-1 pl-8 pr-2 text-sm"
            />
            <svg
              className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Admin</span>
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-white">
              A
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;