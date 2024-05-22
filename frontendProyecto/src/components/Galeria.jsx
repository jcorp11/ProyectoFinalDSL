import CardGaleria from "./CardGaleria"
import { productos } from '../assets/productos.js'

const Galeria = () => {
  
  return (
    <div className="galeria container">
      <div className="row">
        {productos.map((producto) => {
          return (
            <CardGaleria
              key={producto.id}
              producto = {producto}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Galeria

/* imagenUrl, titulo, descripcion, precio */