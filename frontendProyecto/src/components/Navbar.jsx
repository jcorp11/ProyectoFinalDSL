import React, { useState, useContext, useMemo } from "react";
import "../assets/css/navStyle.css";
import { NavLink } from "react-router-dom";
import { productosContext } from "../context/ProductProvider";
import Validacion from "./Validacion";
import { formatoPrecio } from '../js/formatearMoneda.js';

const Navbar = () => {
  const { precioTotal, dataOriginal, setProductosData  } = useContext(productosContext);
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
          setProductosData(dataOriginal);
        } else {
          const filtro = dataOriginal.filter((element) =>
            element.titulo.toLowerCase().includes(inputValue)
          );
          setProductosData(filtro);
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
          Carrito 🛒 {formatoPrecio.format(precioTotal)}
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;

