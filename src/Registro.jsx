// src/Registro.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registrarUsuario } from './services/usuarios';

function Registro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: '',
    email: '',
    password: '',
    repetir: ''
  });

  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError(false);

    if (form.password !== form.repetir) {
      setMensaje('Las contraseñas no coinciden');
      setError(true);
      return;
    }

    try {
      await registrarUsuario({
        nombre: form.nombre,
        email: form.email,
        password: form.password
      });

      setMensaje('✅ Usuario creado. Ya podés iniciar sesión.');
      setError(false);

      // Redirigir luego de 2 segundos
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (err) {
      setMensaje(err.message || 'Error al registrar usuario');
      setError(true);
    }
  };

  return (
    <div className="p-4 max-w-sm mx-auto bg-gray-100 rounded shadow">
      <h2 className="text-xl font-bold mb-4 text-center">Crear cuenta</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="password"
          name="repetir"
          placeholder="Repetir contraseña"
          value={form.repetir}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded font-semibold"
        >
          Registrarse
        </button>
      </form>

      {mensaje && (
        <p className={`mt-4 text-sm text-center ${error ? 'text-red-600' : 'text-green-600'}`}>
          {mensaje}
        </p>
      )}
    </div>
  );
}

export default Registro;
