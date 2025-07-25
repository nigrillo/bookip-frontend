// src/pages/Inicio.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-bookip.png';

function Inicio({ onLogout }) {
  const navigate = useNavigate();

  const irAAgregarLibro = () => {
    navigate('/nuevo');
  };

  const irAAgregarPorLeer = () => {
    navigate('/nuevo', { state: { estadoForzado: 'por leer' } });
  };

  return (
    <div className="min-h-screen bg-[#00a88c] text-white flex flex-col items-center justify-center px-4 py-10">
      <img src={logo} alt="Bookip logo" className="w-36 h-auto mb-10" />

      <div className="space-y-4 w-full max-w-xs text-center">
        <button
          onClick={() => navigate('/libros')}
          className="w-full bg-[#0a8c73] text-white font-bold py-3 rounded-md hover:bg-[#086b5a] transition"
        >
          Mis libros
        </button>

        <button
          onClick={irAAgregarLibro}
          className="w-full bg-[#0a8c73] text-yellow-300 font-bold py-3 rounded-md hover:bg-[#086b5a] transition"
        >
          Agregar libro
        </button>

        <button
          onClick={irAAgregarPorLeer}
          className="w-full bg-[#0a8c73] text-white font-medium py-3 rounded-md hover:bg-[#086b5a] transition"
        >
          Libro por leer
        </button>
      </div>
    </div>
  );
}

export default Inicio;
