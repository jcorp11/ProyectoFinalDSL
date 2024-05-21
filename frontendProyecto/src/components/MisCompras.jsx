import React, { useState, useEffect } from "react";
import { Table, Spinner, Button, Collapse } from "react-bootstrap";

const MisCompras = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  useEffect(() => {
    // Simulación de obtención de datos de pedidos
    setTimeout(() => {
      setOrders([
        {
          orderNumber: 1,
          date: "2023-01-01",
          amount: 100,
          items: [
            { name: "Item 1", price: 25 },
            { name: "Item 2", price: 75 },
          ],
        },
        {
          orderNumber: 2,
          date: "2023-02-01",
          amount: 200,
          items: [
            { name: "Item 3", price: 100 },
            { name: "Item 4", price: 100 },
          ],
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const toggleExpand = (orderNumber) => {
    setExpandedOrder(expandedOrder === orderNumber ? null : orderNumber);
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Order Number</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <React.Fragment key={order.orderNumber}>
            <tr>
              <td>{order.orderNumber}</td>
              <td>{order.date}</td>
              <td>${order.amount}</td>
              <td>
                <Button
                  variant="link"
                  onClick={() => toggleExpand(order.orderNumber)}
                >
                  {expandedOrder === order.orderNumber ? "Collapse" : "Expand"}
                </Button>
              </td>
            </tr>
            <tr>
              <td colSpan="4">
                <Collapse in={expandedOrder === order.orderNumber}>
                  <div>
                    <Table size="sm" striped bordered>
                      <thead>
                        <tr>
                          <th>Item Name</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item, index) => (
                          <tr key={index}>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </Collapse>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
};

export default MisCompras;

/**
 * Manejo del Estado:
 * - `orders`: Contiene los pedidos del usuario, incluyendo los artículos asociados.
 * - `loading`: Indica si los datos están siendo cargados.
 * - `expandedOrder`: Almacena el número de pedido que está expandido actualmente.
 *
 * Hook de Efecto:
 * - Simula la obtención de datos de pedidos con un `setTimeout` para emular una llamada a una API.
 *
 * Manejadores de Eventos:
 * - `toggleExpand`: Alterna el estado de expansión de un pedido específico.
 *
 * Renderización Condicional:
 * - Muestra un spinner mientras los datos están siendo cargados.
 * - Renderiza una tabla con los pedidos del usuario.
 * - Al hacer clic en "Expand" o "Collapse", se expande o contrae la fila del pedido para mostrar los artículos asociados.
 *
 * Resumen:
 * Este componente `MisCompras` actualizado maneja múltiples pedidos y sus artículos asociados.
 * Almacena los pedidos en un array y los muestra en una tabla.
 * Al hacer clic en un pedido, este se expande para mostrar los artículos asociados.
 *
 * Esta configuración utiliza estado local y una simulación de obtención de datos, que más adelante puede ser reemplazada por llamadas reales a la API cuando el backend esté listo.
 */
