// src/pages/Registro.jsx
import React, { useState } from 'react';
import { registrarUsuario } from '../services/usuarios';

export default function Registro() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [exito, setExito] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');

    if (password !== repetirPassword) {
      return setMensaje('Las contraseñas no coinciden');
    }

    try {
      await registrarUsuario({ nombre, email, password });
      setExito(true);
      setMensaje('✅ Usuario creado. Ya podés iniciar sesión.');
    } catch (err) {
      setMensaje(`❌ ${err.message}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <h1 className="text-2xl font-bold mb-4">Crear cuenta</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="email" placeholder="Correo electrónico" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded" required />
        <input type="password" placeholder="Repetir contraseña" value={repetirPassword} onChange={(e) => setRepetirPassword(e.target.value)} className="w-full p-2 border rounded" required />
        <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Registrarse</button>
        {mensaje && (
          <p className={`text-sm ${exito ? 'text-green-700' : 'text-red-700'}`}>
            {mensaje}
          </p>
        )}
      </form>
    </div>
  );
}
