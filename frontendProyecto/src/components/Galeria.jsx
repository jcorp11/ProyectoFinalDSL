import CardGaleria from "./CardGaleria";
import { useContext } from "react";
import { productosContext } from "../context/ProductProvider";


const Galeria = () => {

  const { productosData, loading, error } = useContext(productosContext);

  return (
    <div className="galeria container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="row">
          {productosData.map((producto) => (
            <CardGaleria key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Galeria;
