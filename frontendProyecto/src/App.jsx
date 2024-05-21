import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { route, routes, navigate } from "react-router-dom";
import "./App.css";

function App() {
  <Routes>
    <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
    <Route
      path="/login"
      element={token ? <Navigate to="/" /> : <LoginPage />}
    />
    <Route path="/register" element={<RegisterPage />} />

    <Route path="/perfil" element={<Perfil />} />
    <Route path="/carrito" element={<Carrito />} />
    <Route path="/vistadetalle" element={<VistaDetalle />} />
  </Routes>;
}

export default App;
