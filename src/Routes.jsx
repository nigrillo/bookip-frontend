import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import Layout from "./components/Layout.jsx";
import Login from "./Login.jsx";
import Registro from "./Registro.jsx";
import Inicio from "./pages/Inicio.jsx";
import MisLibros from "./pages/MisLibros.jsx";
import NuevoLibro from "./pages/NuevoLibro.jsx";

import { getLibros } from "./services/libros";

function AppRoutes() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(JSON.parse(localStorage.getItem("bookip-usuario")));
  const [libros, setLibros] = useState([]);

  const handleLoginSuccess = (data) => {
    localStorage.setItem("bookip-usuario", JSON.stringify(data));
    setUsuario(data);
    navigate("/inicio");
  };

  useEffect(() => {
    const fetchLibros = async () => {
      if (usuario) {
        try {
          const librosUsuario = await getLibros(usuario._id);
          setLibros(librosUsuario);
        } catch (error) {
          console.error("Error al obtener libros:", error);
        }
      }
    };

    fetchLibros();
  }, [usuario]);

  const handleEditar = (libro) => {
    // esto puede expandirse si querés editar desde acá
  };

  return (
    <Routes>
      <Route path="/" element={usuario ? <Navigate to="/inicio" /> : <Login onLoginSuccess={handleLoginSuccess} />} />
      <Route path="/registro" element={<Registro />} />
      <Route element={<Layout />}>
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/libros" element={<MisLibros libros={libros} usuario={usuario} onEditar={handleEditar} />} />
        <Route path="/nuevo" element={<NuevoLibro />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
