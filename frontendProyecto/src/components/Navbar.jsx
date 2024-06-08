import React, { useState, useContext, useMemo } from "react";
import "../assets/css/navStyle.css";
import { NavLink } from "react-router-dom";
import { productosContext } from "../context/ProductProvider";
import ValidarInicioDeSesion from "./ValidarInicioDeSesion.jsx";
import { formatoPrecio } from '../js/formatearMoneda.js';
import { userContext } from "../context/UserProvider.jsx";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, setUser, token, setToken } = useContext(userContext);
  const { precioTotal, dataOriginal, setProductosData } = useContext(productosContext);
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

  const cerrarSesion = () =>{
    setToken("");
    setUser("");
    navigate("/");
  }

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
      <NavLink className="icono" to="/">
        KMJ-Store
      </NavLink>
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
        <ValidarInicioDeSesion condition={token}>
          <NavLink className={isActiveNav} to="/perfil">
            <div className="perfil">Perfil</div>
          </NavLink>
        </ValidarInicioDeSesion>
        <ValidarInicioDeSesion condition={!token}>
          <NavLink className={isActiveNav} to="/login">
            Iniciar Sesión
          </NavLink>
          <NavLink className={isActiveNav} to="/register">
            Registrarse
          </NavLink>
        </ValidarInicioDeSesion>
        <NavLink className={isActiveNav} to="/cart">
          Carrito 🛒 {formatoPrecio.format(precioTotal)}
        </NavLink>
        <ValidarInicioDeSesion condition={token}>
          <button className="cerrarSesion" onClick={cerrarSesion}>
            Cerrar Sesion
          </button>
        </ValidarInicioDeSesion>
      </div>
    </nav>
  );
};

export default Navbar;

