import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Home } from "./views/Home";
import { LoginPage } from "./views/LoginPage";
import { RegistrarPage } from "./views/RegistrarPage";
import Navbar from "./components/Navbar";
import Carrito from "./components/Carrito";
import ProductProvider from './context/ProductProvider'
import Perfil from './views/Perfil'

function App() {
  return (
    <ProductProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrarPage />} />
        <Route path="/cart" element={<Carrito />} />
        <Route path="/perfil" element={<Perfil />} />

        {/* <Route path="/perfil" element={<Perfil />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/vistadetalle" element={<VistaDetalle />} /> */}
      </Routes>
    </ ProductProvider>
  );
}

export default App;
