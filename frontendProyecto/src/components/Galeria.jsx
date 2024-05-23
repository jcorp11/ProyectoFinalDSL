import CardGaleria from "./CardGaleria";
import { useContext } from "react";
import { galeriaContext } from "../context/GaleriaProvider.jsx";


const Galeria = () => {

  const { galeriaData, loading, error } = useContext(galeriaContext);

  return (
    <div className="galeria container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : (
        <div className="row">
          {galeriaData.map((producto) => (
            <CardGaleria key={producto.id} producto={producto} />
          ))}
        </div>
      )}
    </div>
  )
}

export default Galeria;
