import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import '../assets/css/cardGaleriaStyle.css'

const CardGaleria = ({imagenUrl, titulo, descripcion, precio}) => {
  return (
    <Card className='myCard' style={{ width: '17rem'}}>
      <Card.Img variant="top" className='imagenCard' src= {imagenUrl} />
      <Card.Body className='cardTitle'>
        <Card.Title>{titulo}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item >
          <h6>Descripción:</h6>
          <p>{descripcion}</p>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body className='priceAndButtons'>
        <h5>{precio}</h5>
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