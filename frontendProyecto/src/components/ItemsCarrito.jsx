import React from 'react'
import { useState, useContext } from 'react'
import { productosContext } from '../context/ProductProvider';
import '../assets/css/carritoStyle.css'

const ItemsCarrito = ({productoAgregado, cantidadProductos}) => {

  const [numeroProductos, setNumeroProductos] = useState(cantidadProductos)
  const {productosCarrito, setProductosCarrito, listaProductos, setListaProductos} = useContext(productosContext);

  function incrementoYDecremento(operacion){

    if(operacion === "incrementar"){
      setNumeroProductos(numeroProductos+1)
      setProductosCarrito([...productosCarrito, productoAgregado])
    }
    if(operacion === "restar" && numeroProductos > 0){
      setNumeroProductos(numeroProductos-1)
      const indiceAEliminar = productosCarrito.findIndex((producto)=>{
        return producto.id === productoAgregado.id;
      })
      const nuevoArray = [...productosCarrito]
      nuevoArray.splice(indiceAEliminar, 1)
      setProductosCarrito(nuevoArray)

      if(numeroProductos === 1){
        const indiceAEliminar = listaProductos.findIndex((producto)=>{
          return producto.id === productoAgregado.id;
        })
        const nuevoArray = [...listaProductos]
        nuevoArray.splice(indiceAEliminar, 1)
        setListaProductos(nuevoArray)
      }
    }
  }

  return (
    <>
      <div className='itemsCarrito'>
        <div className='itemsCarrito-img'>
          <img src={productoAgregado.imagenUrl} alt={productoAgregado.titulo} />
          <h4>{productoAgregado.titulo}</h4>
        </div>
        <div className='itemsCarrito-precioButtons'>
          <p>{productoAgregado.precio*numeroProductos}</p>
          <button onClick={()=>{
            incrementoYDecremento("restar")
          }}>
            {numeroProductos === 1 ? "🗑️" : "-"}
          </button>
          <p>{numeroProductos}</p>
          <button onClick={()=>{
            incrementoYDecremento("incrementar");
          }}>
            +
          </button>
        </div>
      </div>
      <hr />
    </>
  )
}

export default ItemsCarrito