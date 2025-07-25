import React from 'react';
import EstadoBadge from './EstadoBadge';
import StarRating from './StarRating';

const LibroCard = ({ libro, onEditar, onEliminar }) => {
  return (
    <div className="bg-white text-black rounded-md p-4 shadow-md flex gap-4 items-start">
      {libro.portada && (
        <img
          src={libro.portada}
          alt="Portada del libro"
          className="w-20 h-32 object-cover rounded"
        />
      )}

      <div className="flex-1">
        <h3 className="text-lg font-bold">{libro.titulo}</h3>
        <p className="text-sm text-gray-800">{libro.autor}</p>

        <EstadoBadge estado={libro.estado} />

        {libro.estado !== 'por leer' && (
          <div className="mt-2 space-y-1">
            {libro.puntuacion > 0 && (
              <StarRating value={libro.puntuacion} readOnly={true} />
            )}

            {libro.comentario && (
              <p className="text-sm text-gray-600 italic">“{libro.comentario}”</p>
            )}
          </div>
        )}

        <div className="flex gap-3 mt-3">
          <button
            onClick={() => onEditar(libro)}
            className="text-blue-600 text-sm underline"
          >
            Editar
          </button>
          <button
            onClick={() => onEliminar(libro._id)}
            className="text-red-600 text-sm underline"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default LibroCard;
