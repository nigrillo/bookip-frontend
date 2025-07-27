// src/services/usuarios.js

const BASE_URL =
  import.meta.env.MODE === 'production'
    ? 'https://bookip-backend.onrender.com'
    : import.meta.env.VITE_BACKEND_URL;

export const registrarUsuario = async ({ nombre, email, password }) => {
  const res = await fetch(`${BASE_URL}/api/usuarios/registro`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, password }),
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.mensaje || 'Error al registrar');
  }

  return await res.json();
};
