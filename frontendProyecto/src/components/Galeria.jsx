import CardGaleria from "./CardGaleria";
import { useContext } from "react";
import { productosContext } from "../context/ProductProvider";
import FiltroSideBar from "./filtrosidebar/Filtrosidebar";
import '../assets/css/galeriaStyle.css'

const Galeria = () => {
  const { productosData, loading, error } = useContext(productosContext);

  return (
    <div className="main-container">
      <FiltroSideBar />
      <div className="galeria">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : (
          <div className="galeria-items row">
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
