import CardGaleria from "./CardGaleria";
import { useContext } from "react";
import { productosContext } from "../context/ProductProvider";
import FiltroSideBar from "./filtrosidebar/Filtrosidebar";

const Galeria = () => {
  const { productosData, loading, error } = useContext(productosContext);

  return (
    <div className="d-flex">
      <FiltroSideBar />
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
    </div>
  );
};

export default Galeria;
