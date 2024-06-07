import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import CardVistaDetalle from "../components/CardVistaDetalle"
import useFetch from "../Hooks/useFetch"


const ProductDetails = () => {
  const URL = import.meta.env.VITE_BASE_URL;
  const {id} = useParams();
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const {data, loading, error} = useFetch(`${URL}/${id}`); //La ruta debe variar dependiendo del producto que se pide, la logica debe hacerse en el backend.
  useEffect(() => {
    if (data) {
      setProductoSeleccionado(data[0]);
    }
  }, [data]);

  return (
    <>
      {loading && <h1>Cargando...</h1>}
      {error && <h1>Error al cargar el producto</h1>}
      {productoSeleccionado && <CardVistaDetalle productoSeleccionado={productoSeleccionado} />}
    </>
  )
}

export default ProductDetails