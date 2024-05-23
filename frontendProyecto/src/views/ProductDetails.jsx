import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import CardVistaDetalle from "../components/CardVistaDetalle"
import useFetch from "../Hooks/useFetch"


const ProductDetails = () => {

  const [productoSeleccionado, setProductoSeleccionado] = useState([])
  const {data, loading, error} = useFetch("/productos.json") //La ruta debe variar dependiendo del producto que se pide, la logica debe hacerse en el backend.
  
  useEffect(() => {
    if (data) {
      setProductoSeleccionado(data[0]);
    }
  }, [data]);

  return (
    <>
      <CardVistaDetalle productoSeleccionado = {productoSeleccionado} />
    </>
  )
}

export default ProductDetails