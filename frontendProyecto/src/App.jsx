import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Home } from "./views/Home";
import { LoginPage } from "./views/LoginPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/register" element={<RegisterPage />} />

        <Route path="/perfil" element={<Perfil />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/vistadetalle" element={<VistaDetalle />} /> */}
      </Routes>
    </>
  );
}

export default App;
