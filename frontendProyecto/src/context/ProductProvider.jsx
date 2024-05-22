import React, { useEffect } from 'react'
import { createContext } from 'react'
import { productos } from '../assets/productos.js'
import { useState } from 'react';

export const productosContext = createContext();

const ProductProvider = ({ children }) => {
  const [productosData, setProductosData] = useState(productos)
  const [productosCarrito, setProductosCarrito] = useState([])
  const [listaProductos, setListaProductos] = useState([])
  const [PrecioTotal, setPrecioTotal] = useState(0)

  useEffect(() => {

    let sumaTotal = 0

    function calculoTotal(productosCarrito) {
      for (let i = 0; i < productosCarrito.length; i++) {
        sumaTotal += productosCarrito[i].precio;
      }
    }
    calculoTotal(productosCarrito);
    setPrecioTotal(sumaTotal);
  }, [productosCarrito])

  return (
    <productosContext.Provider value={{ productosData, setProductosData, productosCarrito, setProductosCarrito, PrecioTotal, listaProductos, setListaProductos }}>
      {children}
    </productosContext.Provider>
  )
}

export default ProductProvider