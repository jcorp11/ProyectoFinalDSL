import React, { useEffect } from "react";
import { createContext } from "react";
import { useState } from "react";
import useFetch from "../Hooks/useFetch.js";

export const productosContext = createContext();
const URL = import.meta.env.VITE_BASE_URL;

const ProductProvider = ({ children }) => {
  const [url, setUrl] = useState(`${URL}/productos`);
  const [productosData, setProductosData] = useState([]);
  const [productosCarrito, setProductosCarrito] = useState([]);
  const [listaProductos, setListaProductos] = useState([]);
  const [precioTotal, setPrecioTotal] = useState(0);
  const { data, loading, error } = useFetch(url);
  const [dataOriginal, setDataOriginal] = useState([]);

  useEffect(() => {
    if (data) {
      setProductosData(data);
      setDataOriginal(data);
    }
  }, [data]);

  useEffect(() => {
    let sumaTotal = 0;

    function calculoTotal(productosCarrito) {
      for (let i = 0; i < productosCarrito.length; i++) {
        sumaTotal += parseInt(productosCarrito[i].precio);
      }
    }
    calculoTotal(productosCarrito);
    setPrecioTotal(sumaTotal);
  }, [productosCarrito]);

  return (
    <productosContext.Provider
      value={{
        productosData,
        setProductosData,
        productosCarrito,
        setProductosCarrito,
        precioTotal,
        listaProductos,
        setListaProductos,
        loading,
        dataOriginal,
        error,
        setUrl,
        setDataOriginal,
      }}
    >
      {children}
    </productosContext.Provider>
  );
};

export default ProductProvider;
