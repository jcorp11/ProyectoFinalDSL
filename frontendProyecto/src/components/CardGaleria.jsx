import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import '../assets/css/cardGaleriaStyle.css'
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { productosContext } from '../context/ProductProvider';

const CardGaleria = ({producto}) => {

  const {setProductosCarrito, productosCarrito, productosData, listaProductos, setListaProductos} = useContext(productosContext);

  const navigate = useNavigate();

  function setNavigate(e){
    e.preventDefault();
    navigate(`/productos/${producto.id}`)
  }

  function agregarAlCarrito(e){
    e.preventDefault();
    const productoEscogido = productosData.find((element)=>{
      return element.id === producto.id;
    })
    setProductosCarrito([...productosCarrito, productoEscogido])
    if(!listaProductos.some(item => item.id === productoEscogido.id)){
      setListaProductos([...listaProductos, productoEscogido])
    } 
  }

  return (
    <Card className='myCard' style={{ width: '17rem'}}>
      <Card.Img variant="top" className='imagenCard' src= {producto.imagenUrl} />
      <Card.Body className='cardTitle'>
        <Card.Title>{producto.titulo}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item >
          <h6>Descripción:</h6>
          <p>{producto.descripcion}</p>
        </ListGroup.Item>
      </ListGroup>
      <Card.Body className='priceAndButtons'>
        <h5>{producto.precio}</h5>
        <div className="buttons">
          <button onClick={setNavigate}>
            Ver Más 👀
          </button>
          <button onClick={agregarAlCarrito}>
            Añadir 🛒
          </button>
        </div>
      </Card.Body>
    </Card>
  )
}

export default CardGaleria