import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Perfil from "./views/Perfil";

function App() {
  const token = null; // Replace with actual token logic

  return (
    <Routes>
      <Route path="/perfil" element={<Perfil />} />
    </Routes>
  );
}

export default App;

/* import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import Perfil from "./views/Perfil";

function App() {
  const token = null; // Replace with actual token logic

  return (
    <Routes>
      <Route
        path="/"
        element={token ? <HomePage /> : <Navigate to="/login" />}
      />
      <Route
        path="/login"
        element={token ? <Navigate to="/" /> : <LoginPage />}
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/carrito" element={<Carrito />} />
      <Route path="/vistadetalle" element={<VistaDetalle />} />
    </Routes>
  );
}

export default App;
*/
