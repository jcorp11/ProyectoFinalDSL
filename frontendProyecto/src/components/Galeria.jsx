import CardGaleria from "./CardGaleria";
import { productos } from "../assets/productos.js";
import useFetch from "../Hooks/useFetch";

const Galeria = () => {
  const { data, error, loading } = useFetch("");

  console.log(data);

  return (
    <div className="galeria container">
      <div className="row">
        {productos.map((producto) => {
          return <CardGaleria key={producto.id} producto={producto} />;
        })}
      </div>
    </div>
  );
};

export default Galeria;
