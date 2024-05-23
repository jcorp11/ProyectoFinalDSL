import React, { useContext } from 'react'
import { productosContext } from '../context/ProductProvider'
import ItemsCarrito from '../components/ItemsCarrito';
import '../assets/css/carritoStyle.css'
import { formatoPrecio } from '../js/formatearMoneda.js';

const Carrito = () => {

  const { productosCarrito, setProductosCarrito, precioTotal, listaProductos, setListaProductos} = useContext(productosContext);

  
  function pagar(){
    alert(`Se acaba de realizar un pago por ${formatoPrecio.format(precioTotal)} pesos.`)
    setListaProductos([])
    setProductosCarrito([])
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
      </div>
    </>
    
  )
}

export default Carrito