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
              imagenUrl={producto.imagenUrl}
              titulo={producto.titulo}
              descripcion={producto.descripcion}
              precio={producto.precio}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Galeria

/* imagenUrl, titulo, descripcion, precio */