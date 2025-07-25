import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Login fallido");

      const data = await res.json();
      onLoginSuccess(data);
      navigate("/inicio");
    } catch (error) {
      alert("Error al iniciar sesión");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#00a88c] text-white flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-[#0a8c73] p-6 rounded-lg w-full max-w-sm space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar sesión</h2>

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 rounded text-black"
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 rounded text-black"
        />

        <button
          type="submit"
          className="w-full bg-yellow-400 text-[#0a8c73] font-semibold py-2 rounded hover:bg-yellow-300 transition"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default Login;
