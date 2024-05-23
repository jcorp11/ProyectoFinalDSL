import { formatoPrecio } from '../js/formatearMoneda.js';
import { useContext } from 'react';
import {productosContext} from '../context/ProductProvider.jsx'
import '../assets/css/CardVistaDetalleStyle.css'

const CardVistaDetalle = ({ productoSeleccionado }) => {
  const { productosCarrito, setProductosCarrito, listaProductos, setListaProductos } = useContext(productosContext);

  function agregarAlCarrito() {
    setProductosCarrito([...productosCarrito, productoSeleccionado]);
    if (!listaProductos.some(item => item.id === productoSeleccionado.id)) {
      setListaProductos([...listaProductos, productoSeleccionado])
    }
  }

  return (
    <div className='container containerDetails'>
      <div className='imgContainer'>
        <img src={productoSeleccionado.imagenUrl} alt={productoSeleccionado.titulo} />
      </div>
      <div className='detailsContainer'>
        <div className="details">
          <h1>{productoSeleccionado.titulo}</h1>
          <hr />
          <p>{productoSeleccionado.descripcion}</p>
        </div>
        <div className="priceAndButtonDetails">
          <h2>
            Precio: {formatoPrecio.format(productoSeleccionado.precio)}
          </h2>
          <button onClick={agregarAlCarrito}>
            Añadir 🛒
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardVistaDetalle