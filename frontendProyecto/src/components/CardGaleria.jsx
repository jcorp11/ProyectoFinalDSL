import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import {productos} from '../assets/productos.js'
import '../assets/css/cardGaleriaStyle.css'

const CardGaleria = () => {
  return (
    <Card className='myCard' style={{ width: '17rem'}}>
      <Card.Img variant="top" src= {productos[0].imagenUrl} />
      <Card.Body className='cardTitle'>
        <Card.Title>{productos[0].titulo}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item >
          <h6>Descripción:</h6>
          <p>{productos[0].descripcion}</p>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body className='priceAndButtons'>
        <h5>{productos[0].precio}</h5>
        <div className="buttons">
          <button /* onClick={setNavigate} */>
            Ver Más 👀
          </button>
          <button /* onClick={agregarAlCarrito} */>
            Añadir 🛒
          </button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default CardGaleria