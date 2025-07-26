// src/pages/Inicio.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Inicio() {
  const navigate = useNavigate();

  const irANuevoLibro = (estadoForzado = null) => {
    navigate('/nuevo', { state: { estadoForzado } });
  };

  return (
    <div className="min-h-screen bg-[#00a88c] text-white px-4 pt-10 pb-24 flex flex-col items-center justify-start">
      <div className="w-full max-w-xs mt-12"> {/* Ajuste visual */}
        {/* Logo central grande */}
        <h1 className="text-4xl font-bold text-center mb-10">
          <span className="text-white">📚</span> Bookip
        </h1>

        <div className="flex flex-col gap-4">
          <button
            onClick={() => navigate('/libros')}
            className="w-full bg-[#0a8c73] text-white py-3 rounded-md font-semibold hover:bg-[#086b5a] transition"
          >
            Mis libros
          </button>

          <button
            onClick={() => irANuevoLibro()}
            className="w-full bg-[#0a8c73] text-[#facc15] py-3 rounded-md font-semibold hover:bg-[#086b5a] transition"
          >
            Agregar libro
          </button>

          <button
            onClick={() => irANuevoLibro('por leer')}
            className="w-full bg-[#0a8c73] text-white py-3 rounded-md font-semibold hover:bg-[#086b5a] transition"
          >
            Libro por leer
          </button>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
