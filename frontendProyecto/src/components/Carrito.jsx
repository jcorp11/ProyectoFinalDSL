import React, { useContext, useEffect, useState } from 'react'
import { productosContext } from '../context/ProductProvider'
import ItemsCarrito from '../components/ItemsCarrito';
import '../assets/css/carritoStyle.css'
import { formatoPrecio } from '../js/formatearMoneda.js';
import {userContext} from '../context/UserProvider.jsx'
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Carrito = () => {

  const { productosCarrito, setProductosCarrito, precioTotal, listaProductos, setListaProductos} = useContext(productosContext);
  const {token} = useContext(userContext);
  const [pedido, setPedido] = useState([])

  useEffect(() => {
  const fecha = new Date();
  const fechaFormateada = fecha.toLocaleString();

  // Eliminar objetos duplicados basados en el id
  const productosUnicos = productosCarrito.reduce((uniqueProductos, producto) => {
    if (!uniqueProductos.some((prod) => prod.id === producto.id)) {
      const cantidad = productosCarrito.filter((prod) => prod.id === producto.id).length;
      uniqueProductos.push({ ...producto, cantidad: cantidad });
    }
    return uniqueProductos;
  }, []);

  // Crear el objeto con los detalles del pedido y los productos
  const productosDetalle = productosUnicos.map((producto) => ({
    id: producto.id,
    cantidad: producto.cantidad,
    precioUnitario: producto.precio,
    subtotal: producto.cantidad* producto.precio
  }));

  const pedidoActualizado = [
    {
      fecha: fechaFormateada,
      estadoPedido: true,
      total: precioTotal,
    },
    productosDetalle
  ]

  setPedido(pedidoActualizado);
}, [productosCarrito, precioTotal]);
  
  /* useFetchPost("/pedido", pedido)--------------------- */

  const pagar = async () => {
    if(!token){
      toast.warning("Debes iniciar sesion antes de pagar");
      return false;
    }
    if (productosCarrito.length > 0) {
      const url = '/pedido'; // URL a la que se enviará la solicitud POST
      try {
        const response = await axios.post(url, pedido); // Realiza la solicitud POST usando Axios
        if (response.status === 200) {
          toast.success(`Se acaba de realizar un pago por ${formatoPrecio.format(precioTotal)} pesos.`);
          setListaProductos([]);
          setProductosCarrito([]);
        } else {
          toast.error('Hubo un problema al procesar el pago.');
        }
      } catch (error) {
        toast.error('Hubo un error al procesar la solicitud.');
        console.error(error);
      }
    } else {
      toast.warning("No hay productos en el carrito para pagar.");
    }
  }

  return (
    <>
      <div className='container containerCarrito'>
        <h1>Detalles del pedido:</h1>
        <div className='elementosCarrito'>
          {listaProductos.length > 0 ? (
            listaProductos.map((producto) =>{
              const cantidadProductos = productosCarrito.filter((cantidad) =>{
                return cantidad.id === producto.id;
              })
              return <ItemsCarrito key={producto.id} productoAgregado = {producto} cantidadProductos = {cantidadProductos.length} />
            })
          ): (
            <div className='carroVacio'>
              <p>El carrito está vacío 🛒</p>
              <br />
              <p>😞</p>
            </div>
          )}
        </div>
        <div className='totalIrAPagar'>
          <h2>{formatoPrecio.format(precioTotal)}</h2>
          <button onClick={pagar}>Ir A Pagar</button>
        </div>
        <ToastContainer />
      </div>
    </>
    
  )
}

export default Carrito