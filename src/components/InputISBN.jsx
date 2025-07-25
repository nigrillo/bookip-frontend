import React, { useState } from 'react';

const InputISBN = ({ setLibro }) => {
  const [isbn, setIsbn] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [mensaje, setMensaje] = useState('');

  const buscarLibroPorISBN = async () => {
    if (!isbn) return;

    setBuscando(true);
    setMensaje('');

    try {
      const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`);
      const data = await res.json();

      if (data.totalItems > 0) {
        const info = data.items[0].volumeInfo;

        const libroEncontrado = {
          titulo: info.title || '',
          autor: (info.authors && info.authors.join(', ')) || '',
          portada: (info.imageLinks && info.imageLinks.thumbnail) || ''
        };

        setLibro(prev => ({ ...prev, ...libroEncontrado }));
        setMensaje('📚 Libro encontrado');
      } else {
        setMensaje('No se encontró el libro');
      }
    } catch (error) {
      console.error('Error al buscar ISBN:', error);
      setMensaje('Error al buscar el libro');
    } finally {
      setBuscando(false);
    }
  };

  return (
    <div className="space-y-2">
      <label htmlFor="isbn" className="block">ISBN:</label>
      <div className="flex gap-2">
        <input
          id="isbn"
          type="text"
          value={isbn}
          onChange={e => setIsbn(e.target.value)}
          placeholder="Ingresá el ISBN"
          className="p-2 rounded-md text-black flex-1"
        />
        <button
          type="button"
          onClick={buscarLibroPorISBN}
          disabled={buscando}
          className="bg-white text-[#00a88c] px-4 py-2 rounded-md font-bold"
        >
          {buscando ? 'Buscando...' : 'Buscar'}
        </button>
      </div>
      {mensaje && <p className="text-sm italic">{mensaje}</p>}
    </div>
  );
};

export default InputISBN;
