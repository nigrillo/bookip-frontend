// src/components/FooterNavegacion.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Book, Plus, HouseSimple } from 'phosphor-react';

function FooterNavegacion() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-[#0a8c73] py-2 px-6 flex justify-between items-center shadow-inner">
      <Link to="/libros" className="flex flex-col items-center text-white">
        <Book size={24} />
        <span className="text-xs">Mis libros</span>
      </Link>

      <Link to="/nuevo" className="flex flex-col items-center text-[#facc15]">
        <Plus size={24} />
        <span className="text-xs">Agregar</span>
      </Link>

      <Link to="/inicio" className="flex flex-col items-center text-white">
        <HouseSimple size={24} />
        <span className="text-xs">Home</span>
      </Link>
    </footer>
  );
}

export default FooterNavegacion;
