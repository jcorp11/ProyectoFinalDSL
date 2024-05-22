import React from 'react'
import '../assets/css/navStyle.css'
import { NavLink } from 'react-router-dom'
import { useContext } from "react"
import { productosContext } from '../context/ProductProvider';

const Navbar = () => {

  const {precioTotal} = useContext(productosContext)
  
  const isActiveNav = ({isActive}) =>{
    return isActive ? "active" : "notActive"
  }
  
  return (
    <nav>
      <NavLink className="icono" to= "/">
        Icono
      </NavLink>
      <input className='buscador' type="text" placeholder='Buscar' />
      <div className="opciones">
        <NavLink className={isActiveNav} to= "/login">
          log in
        </NavLink>
        <NavLink className={isActiveNav} to= "/register">
          Register
        </NavLink>
        <NavLink className={isActiveNav} to= "/cart">
          Cart 🛒 {precioTotal}
        </NavLink>
      </div>
    </nav>
  )
}

export default Navbar