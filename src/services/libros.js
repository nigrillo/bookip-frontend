// src/services/libros.js

const API_URL = import.meta.env.VITE_API_URL;
const BASE_URL = `${API_URL}/api/libros`;

const BASE_URL = import.meta.env.VITE_API_URL + '/api/libros';

export async function getLibros(usuarioId, query = '') {
  const q = query ? `&q=${encodeURIComponent(query)}` : '';
  const res = await fetch(`${BASE_URL}?usuarioId=${usuarioId}${q}`);
  if (!res.ok) throw new Error('Error al obtener libros');
  return await res.json();
}

export async function deleteLibro(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) throw new Error('Error al eliminar libro');
  return await res.json();
}

export async function createLibro(libroData) {
  console.log('📤 Enviando libro al backend desde service:', libroData);

  const res = await fetch(BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(libroData)
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('❌ Error al crear libro:', errorText);
    throw new Error('Error al crear libro');
  }

  return await res.json();
}

export async function updateLibro(id, libroData) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(libroData)
  });
  if (!res.ok) throw new Error('Error al actualizar libro');
  return await res.json();
}

export async function downloadCSV(userId) {
  const res = await fetch(`${BASE_URL}/csv/${userId}`);
  if (!res.ok) throw new Error('Error al descargar CSV');
  return await res.blob();
}
