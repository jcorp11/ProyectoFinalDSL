import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { Home } from "./views/Home";
import { LoginPage } from "./views/LoginPage";
import { RegistrarPage } from "./views/RegistrarPage";
import Navbar from "./components/Navbar";
import Carrito from "./components/Carrito";
import ProductProvider from "./context/ProductProvider";
import Perfil from "./views/Perfil/Perfil";
import ProductDetails from "./views/ProductDetails";
import UserProvider from "./context/UserProvider";

function App() {
  return (
    <ProductProvider>
      <UserProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegistrarPage />} />
          <Route path="/cart" element={<Carrito />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/productos/:id" element={<ProductDetails />} />
        </Routes>
      </UserProvider>
    </ProductProvider>
  );
}

export default App;
