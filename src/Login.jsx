// src/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from './assets/logo-bookip.png';

function Login({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!response.ok) {
        throw new Error('Login fallido');
      }

      const data = await response.json();
      onLoginSuccess(data);
    } catch (error) {
      alert('Email o contraseña incorrectos');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#00a88c] flex items-center justify-center px-4">
      <div className="flex flex-col items-center space-y-6">

        {/* Logo arriba */}
        <img src={logo} alt="Bookip logo" className="h-20 mb-4" />

        {/* Bloque de login */}
        <div className="bg-[#0a8c73] text-white rounded-xl px-8 py-10 w-full max-w-sm shadow-lg">
          <h1 className="text-2xl font-bold mb-6 text-center">Iniciar sesión</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full p-2 rounded-md text-black"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="w-full p-2 rounded-md text-black"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button
              type="submit"
              className="w-full bg-[#facc15] text-[#0a8c73] font-semibold py-2 rounded-md hover:bg-yellow-300 transition"
            >
              Ingresar
            </button>
          </form>

          {/* Botón Crear cuenta */}
          <button
            onClick={() => navigate('/registro')}
            className="w-full mt-4 bg-[#00a88c] text-[#facc15] font-semibold py-2 rounded-md hover:bg-[#00c0a2] transition"
          >
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
