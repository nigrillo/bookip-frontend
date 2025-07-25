import React from "react";
import Header from "./Header.jsx";
import FooterNavegacion from "./FooterNavegacion.jsx";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="layout">
      <Header />
      <main>
        <Outlet />
      </main>
      <FooterNavegacion />
    </div>
  );
}

export default Layout;
