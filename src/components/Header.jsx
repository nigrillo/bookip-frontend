// src/components/Header.jsx
import React from 'react';
import logo from '../assets/logo-bookip.png';

function Header() {
  const handleLogout = () => {
    localStorage.removeItem('bookip-usuario');
    window.location.href = '/';
  };

  return (
    <header className="bg-[#0a8c73] text-white px-6 py-[1.15rem] flex justify-between items-center min-h-[4.6rem] shadow">
      <div className="flex items-center">
        <img src={logo} alt="Bookip logo" className="h-10" />
      </div>
      <button
        onClick={handleLogout}
        className="flex items-center gap-2 bg-white text-[#0a8c73] px-3 py-1.5 rounded-md hover:bg-gray-100 text-sm transition"
      >
        <span className="text-lg">✕</span> Salir
      </button>
    </header>
  );
}

export default Header;
