import React, { useState, useContext, useMemo } from "react";
import "../assets/css/navStyle.css";
import { NavLink } from "react-router-dom";
import { productosContext } from "../context/ProductProvider";
import Validacion from "./Validacion";
import { galeriaContext } from "../context/GaleriaProvider.jsx";

const Navbar = () => {
  const { precioTotal } = useContext(productosContext);
  const { setGaleriaData, dataOriginal } = useContext(galeriaContext);
  const [inputBuscador, setInputBuscador] = useState("");

  // Función de debounce
  function debounce(func, delay) {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  }

  const debouncedFilter = useMemo(
    () =>
      debounce((inputValue) => {
        if (inputValue === "") {
          setGaleriaData(dataOriginal);
        } else {
          const filtro = dataOriginal.filter((element) =>
            element.titulo.toLowerCase().includes(inputValue)
          );
          setGaleriaData(filtro);
        }
      }, 300), // 300ms de espera antes de llamar a la función
    [dataOriginal]
  );

  function filtrarProductos(e) {
    const inputValue = e.target.value.toLowerCase();
    setInputBuscador(inputValue);
    debouncedFilter(inputValue);
  }

  const isActiveNav = ({ isActive }) => {
    return isActive ? "active" : "notActive";
  };

  return (
    <nav>
      <Validacion condition={true}>
        <NavLink className="icono" to="/">
          Icono
        </NavLink>
      </Validacion>
      <div className="search-container">
        <input
          className="buscador"
          type="text"
          placeholder="Buscar"
          onChange={filtrarProductos}
          value={inputBuscador}
        />
      </div>
      <div className="opciones">
        <NavLink className={isActiveNav} to="/login">
          Iniciar Sesión
        </NavLink>
        <NavLink className={isActiveNav} to="/register">
          Registrarse
        </NavLink>
        <NavLink className={isActiveNav} to="/cart">
          Carrito 🛒 {precioTotal}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;

