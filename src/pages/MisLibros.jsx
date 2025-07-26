// src/pages/MisLibros.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  BookOpen,
  DeviceMobile,
  Check,
  Clock,
  X,
  Star,
  PencilSimple,
  Trash
} from 'phosphor-react';
import { deleteLibro } from '../services/libros';

function MisLibros() {
  const navigate = useNavigate();
  const location = useLocation();
  const usuario = JSON.parse(localStorage.getItem('bookip-usuario'));

  const [libros, setLibros] = useState([]);
  const [librosFiltrados, setLibrosFiltrados] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('titulo');
  const [labelOrden, setLabelOrden] = useState('▼ Ordenar por');

  const cargarLibros = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/libros?usuarioId=${usuario._id}`);
      const data = await response.json();
      setLibros(data);
      setLibrosFiltrados(data);
    } catch (error) {
      console.error("Error al obtener libros:", error);
    }
  };

  useEffect(() => {
    cargarLibros();
  }, []);

  useEffect(() => {
    if (location.state?.actualizado) {
      cargarLibros();
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const handleBuscar = () => {
    const query = busqueda.toLowerCase();
    const filtrados = libros.filter(libro =>
      libro.titulo.toLowerCase().includes(query) ||
      libro.autor.toLowerCase().includes(query)
    );
    setLibrosFiltrados(filtrados);
  };

  const handleOrdenar = (criterio) => {
    setOrden(criterio);

    if (criterio === 'porleer') {
      setLabelOrden('▼ Solo por leer');
      const filtrados = libros.filter(libro => libro.estado === 'por leer');
      setLibrosFiltrados(filtrados);
      return;
    }

    const etiquetas = {
      titulo: '▼ Título (A-Z)',
      autor: '▼ Autor (A-Z)',
      fecha: '▼ Fecha de lectura'
    };
    setLabelOrden(etiquetas[criterio]);

    const ordenados = [...libros].sort((a, b) => {
      if (criterio === 'titulo' || criterio === 'autor') {
        return a[criterio].localeCompare(b[criterio]);
      } else if (criterio === 'fecha') {
        const fechaA = a.fecha ? new Date(a.fecha) : null;
        const fechaB = b.fecha ? new Date(b.fecha) : null;

        if (!fechaA || isNaN(fechaA)) return 1;
        if (!fechaB || isNaN(fechaB)) return -1;

        return fechaB - fechaA;
      }
      return 0;
    });

    setLibrosFiltrados(ordenados);
  };

  const handleEditar = (libro) => {
    navigate('/nuevo', { state: { libro } });
  };

  const handleEliminar = async (id) => {
    if (window.confirm('¿Seguro que querés eliminar este libro?')) {
      try {
        await deleteLibro(id);
        await cargarLibros();
      } catch (error) {
        alert('Error al eliminar el libro.');
        console.error(error);
      }
    }
  };

  const iconoTipo = tipo =>
    tipo === 'papel' ? <BookOpen size={20} weight="light" /> : <DeviceMobile size={20} weight="light" />;

  const iconoEstado = estado => {
    switch (estado) {
      case 'leído': return <Check size={20} weight="light" />;
      case 'por leer': return <Clock size={20} weight="light" />;
      case 'abandonado': return <X size={20} weight="light" />;
      default: return null;
    }
  };

  const renderEstrellas = puntuacion => {
    const estrellas = [];
    for (let i = 1; i <= 5; i++) {
      estrellas.push(
        <Star
          key={i}
          size={18}
          weight={i <= puntuacion ? 'fill' : 'regular'}
          className="text-yellow-400"
        />
      );
    }
    return <div className="flex gap-1">{estrellas}</div>;
  };

  return (
    <div className="min-h-screen bg-[#00a88c] text-white px-4 pt-6 pb-24">
      <div className="max-w-4xl mx-auto">

        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Buscar por título o autor..."
            className="flex-1 p-2 rounded-md text-black"
            value={busqueda}
            onChange={e => setBusqueda(e.target.value)}
          />
          <button
            onClick={handleBuscar}
            className="bg-[#0a8c73] px-4 py-2 rounded-md hover:bg-[#086b5a] transition"
          >
            Buscar
          </button>
        </div>

        <div className="flex justify-center gap-2 mb-6">
          <div className="relative w-44">
            <select
              value={orden}
              onChange={(e) => handleOrdenar(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-[#0a8c73] text-white text-sm font-medium appearance-none outline-none text-center"
              style={{
                backgroundImage: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
              }}
            >
              <option value="titulo">▼ Título (A-Z)</option>
              <option value="autor">▼ Autor (A-Z)</option>
              <option value="fecha">▼ Fecha de lectura</option>
              <option value="porleer">▼ Solo por leer</option>
            </select>
          </div>

          <Link
            to="/nuevo"
            className="w-44 bg-[#facc15] text-[#0a8c73] px-4 py-2 rounded-md text-sm font-semibold hover:bg-yellow-300 transition text-center"
          >
            + Nuevo libro
          </Link>
        </div>

        {librosFiltrados.length === 0 ? (
          <p className="text-white">No se encontraron libros.</p>
        ) : (
          <div className="grid gap-4">
            {librosFiltrados.map(libro => (
              <div
                key={libro._id || libro.titulo}
                className="p-4 rounded-lg bg-[#0a8c73] flex flex-col sm:flex-row sm:justify-between gap-4"
              >
                <div className="flex flex-col flex-1">
                  <div>
                    <h2 className="text-xl font-semibold">{libro.titulo}</h2>
                    <p className="text-sm">{libro.autor}</p>
                  </div>
                  <div className="flex gap-4 text-white text-sm items-center mt-1">
                    <span className="flex items-center gap-1">{iconoTipo(libro.tipo)}</span>
                    <span className="flex items-center gap-1">{iconoEstado(libro.estado)}</span>
                    <span>{libro.estado}</span>
                  </div>

                  {libro.estado !== 'por leer' && (
                    <div className="pl-1">
                      {libro.puntuacion > 0 && renderEstrellas(libro.puntuacion)}
                      {libro.comentario && (
                        <p className="text-sm mt-1 italic">“{libro.comentario}”</p>
                      )}
                    </div>
                  )}

                  <div className="flex gap-4 mt-2">
                    <button
                      onClick={() => handleEditar(libro)}
                      className="flex items-center gap-1 text-sm text-blue-200 hover:underline"
                    >
                      <PencilSimple size={16} /> Editar
                    </button>
                    <button
                      onClick={() => handleEliminar(libro._id)}
                      className="flex items-center gap-1 text-sm text-red-300 hover:underline"
                    >
                      <Trash size={16} /> Eliminar
                    </button>
                  </div>
                </div>

                {libro.portada && (
                  <div className="w-24 shrink-0">
                    <img
                      src={libro.portada}
                      alt={`Portada de ${libro.titulo}`}
                      className="rounded-md w-full h-auto object-cover"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MisLibros;
