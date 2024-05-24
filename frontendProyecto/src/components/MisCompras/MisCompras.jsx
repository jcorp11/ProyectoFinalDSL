import React, { useState, useEffect } from "react";
import { Table, Collapse } from "react-bootstrap";
import styles from "./MisCompras.module.css"; // Importing the CSS module

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
          amount: 175,
          items: [
            { name: "Item 1", amount: 1, price: 25 },
            { name: "Item 2", amount: 2, price: 75 },
          ],
        },
        {
          orderNumber: 2,
          date: "2023-02-01",
          amount: 900,
          items: [
            { name: "Item 3", amount: 3, price: 100 },
            { name: "Item 4", amount: 6, price: 100 },
          ],
        },
      ]);
      setLoading(false);
    }, 100);
  }, []);

  const toggleExpand = (orderNumber) => {
    setExpandedOrder(expandedOrder === orderNumber ? null : orderNumber);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <>
      <div className={styles["mis-compras-container"]}>
        <h3>Mis Compras</h3>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Numero de Pedido</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Ver Detalle</th>
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
                    <button
                      className={styles.toggleButton}
                      onClick={() => toggleExpand(order.orderNumber)}
                    >
                      {expandedOrder === order.orderNumber
                        ? "Collapse"
                        : "Expand"}
                    </button>
                  </td>
                </tr>
                <tr>
                  <td colSpan="4">
                    <Collapse in={expandedOrder === order.orderNumber}>
                      <div>
                        <Table size="sm" striped bordered>
                          <thead>
                            <tr>
                              <th>Nombre del Producto</th>
                              <th>Cantidad</th>
                              <th>Precio</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.items.map((item, index) => (
                              <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.amount}</td>
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
      </div>
    </>
  );
};

export default MisCompras;
