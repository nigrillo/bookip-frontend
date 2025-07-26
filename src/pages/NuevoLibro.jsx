// src/pages/NuevoLibro.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { createLibro, updateLibro } from '../services/libros';
import EstadoLibroSelect from '../components/EstadoLibroSelect';
import FechaLectura from '../components/FechaLectura';
import StarRating from '../components/StarRating';
import PortadaPreview from '../components/PortadaPreview';
import InputISBN from '../components/InputISBN';

function NuevoLibro({ usuario: usuarioProp, libroEditando = null, onVolver }) {
  const navigate = useNavigate();
  const location = useLocation();
  const libroDesdeRuta = location.state?.libro || libroEditando;
  const estadoForzado = location.state?.estadoForzado;

  const usuario = usuarioProp || JSON.parse(localStorage.getItem('bookip-usuario'));

  const [libro, setLibro] = useState({
    titulo: '',
    autor: '',
    fecha: '',
    tipo: 'papel',
    puntuacion: 0,
    comentario: '',
    portada: '',
    estado: estadoForzado || 'leído',
  });

  useEffect(() => {
    if (libroDesdeRuta) {
      setLibro(prev => ({
        ...prev,
        ...libroDesdeRuta,
        titulo: libroDesdeRuta.titulo || '',
        autor: libroDesdeRuta.autor || '',
        fecha: libroDesdeRuta.fecha || '',
        tipo: libroDesdeRuta.tipo || 'papel',
        puntuacion: libroDesdeRuta.puntuacion || 0,
        comentario: libroDesdeRuta.comentario || '',
        portada: libroDesdeRuta.portada || '',
        estado: libroDesdeRuta.estado || estadoForzado || 'leído',
      }));
    }
  }, [libroDesdeRuta, estadoForzado]);

  const handleChange = e => {
    const { name, value } = e.target;
    setLibro(prev => ({ ...prev, [name]: value }));
  };

  const handleEstadoChange = estado => {
    setLibro(prev => ({ ...prev, estado }));
  };

  const handleGuardar = async () => {
    if (!usuario?._id) {
      alert('No se encontró el usuario. Iniciá sesión nuevamente.');
      return;
    }

    try {
      const datos = {
        userId: usuario._id,
        titulo: libro.titulo,
        autor: libro.autor,
        fecha: libro.fecha,
        tipo: libro.tipo,
        puntuacion: libro.puntuacion,
        comentario: libro.comentario,
        portada: libro.portada,
        estado: libro.estado
      };

      console.log('📤 Enviando datos al backend:', datos);

      if (libro._id) {
        await updateLibro(libro._id, datos);
      } else {
        await createLibro(datos);
      }

      navigate('/libros', { state: { actualizado: true } });
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('No se pudo guardar el libro.');
    }
  };

  return (
    <div className="min-h-screen bg-[#00a88c] text-white px-4 py-6">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">
          {libroDesdeRuta ? 'Editar libro' : 'Agregar libro'}
        </h1>

        <InputISBN setLibro={setLibro} />

        <input
          type="text"
          name="titulo"
          placeholder="Título"
          className="w-full p-2 rounded-md text-black"
          value={libro.titulo}
          onChange={handleChange}
        />

        <input
          type="text"
          name="autor"
          placeholder="Autor"
          className="w-full p-2 rounded-md text-black"
          value={libro.autor}
          onChange={handleChange}
        />

        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tipo"
              value="papel"
              checked={libro.tipo === 'papel'}
              onChange={handleChange}
            />
            Papel
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="tipo"
              value="digital"
              checked={libro.tipo === 'digital'}
              onChange={handleChange}
            />
            Digital
          </label>
        </div>

        <EstadoLibroSelect value={libro.estado} onChange={handleEstadoChange} />

        {libro.estado !== 'por leer' && (
          <>
            <FechaLectura
              fecha={libro.fecha}
              onChange={(nuevaFecha) =>
                setLibro(prev => ({ ...prev, fecha: nuevaFecha }))
              }
            />

            <StarRating
              value={libro.puntuacion}
              onChange={puntuacion =>
                setLibro(prev => ({ ...prev, puntuacion }))
              }
            />

            <textarea
              name="comentario"
              placeholder="Comentario"
              className="w-full p-2 rounded-md text-black"
              rows="3"
              value={libro.comentario}
              onChange={handleChange}
            />
          </>
        )}

        <PortadaPreview url={libro.portada} />

        <div className="flex gap-4">
          <button
            onClick={handleGuardar}
            className="bg-[#0a8c73] px-4 py-2 rounded-md hover:bg-[#086b5a] transition"
          >
            Guardar
          </button>
          <button onClick={onVolver} className="underline">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}

export default NuevoLibro;
