import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import { userContext } from "../../context/UserProvider";
import styles from "./Ventas.module.css";

const URL = import.meta.env.VITE_BASE_URL;

const Ventas = () => {
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
        if (token && user && user.rol === "admin") {
          const response = await axios.get(`${URL}/pedidos`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data.pedidos);
          setOrders(response.data.pedidos);
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
        const response = await axios.get(`${URL}/pedidos/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrderDetails(response.data);
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
    <div className={styles["ventas-container"]}>
      <h3>Ventas</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Usuario</th>
            <th>Fecha</th>
            <th>Total</th>
            <th>Ver Detalle</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order["ID pedido"]}>
              <td>{order["ID pedido"]}</td>
              <td>{order.Usuario}</td>
              <td>{order.fecha}</td>
              <td>${order.total}</td>
              <td>
                <Button onClick={() => handleShowModal(order["ID pedido"])}>
                  View Details
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {detailsLoading ? (
            <div>Loading order details...</div>
          ) : orderDetails && orderDetails.pedido ? (
            <Table size="sm" striped bordered>
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {orderDetails.pedido.map((item) => (
                  <tr key={item["ID producto"]}>
                    <td>{item.titulo}</td>
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

export default Ventas;
