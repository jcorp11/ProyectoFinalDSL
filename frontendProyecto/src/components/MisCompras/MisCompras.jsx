import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { userContext } from "../../context/UserProvider";
import styles from "./MisCompras.module.css"; // Importing the CSS module

const URL = import.meta.env.VITE_BASE_URL;

const MisCompras = () => {
  const { user, token } = useContext(userContext); // Get user and token from context
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderDetails, setOrderDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (user && user.id && token) {
          console.log("User ID:", user.id); // Log the user ID
          // Ensure token is available
          const response = await axios.get(`${URL}/pedidos/user/${user.id}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Add token to headers
            },
          });
          console.log(response.data.pedidos);
          setOrders(response.data.pedidos); // Adjust based on your API response structure
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, token]);

  const fetchOrderDetails = async (orderId) => {
    try {
      setDetailsLoading(true);
      if (token) {
        // Ensure token is available
        const response = await axios.get(`${URL}/pedidos/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        });
        console.log("Order Details Response:", response.data);
        setOrderDetails(response.data); // Adjust based on your API response structure
      }
    } catch (error) {
      console.error("Error fetching order details:", error);
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleShowModal = async (orderId) => {
    setSelectedOrder(orderId);
    await fetchOrderDetails(orderId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setOrderDetails(null);
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
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
            <tr key={order["ID pedido"]}>
              <td>{order["ID pedido"]}</td>
              <td>{order.fecha}</td>
              <td>${order.total}</td>
              <td>
                <Button
                  className={styles.toggleButton}
                  onClick={() => handleShowModal(order["ID pedido"])}
                >
                  Ver Detalle
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Detalles del Pedido</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailsLoading ? (
            <div>Loading order details...</div>
          ) : orderDetails && orderDetails.pedido ? (
            <Table size="sm" striped bordered>
              <thead>
                <tr>
                  <th>Nombre del Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Unitario</th>
                  <th>SubTotal</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.pedido.map((item) => (
                  <tr key={item["ID producto"]}>
                    <td>{item.titulo}</td>{" "}
                    {/* Assuming 'titulo' is the product name */}
                    <td>{item.cantidad}</td>
                    <td>${item.precio}</td>
                    <td>${item.subtotal}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div>No order details available.</div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MisCompras;
