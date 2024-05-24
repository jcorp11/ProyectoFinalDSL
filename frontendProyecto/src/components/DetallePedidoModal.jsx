import React from "react";
import { Modal, Button, Table } from "react-bootstrap";

const DetallePedidoModal = ({ order, handleCloseModal }) => {
  return (
    <Modal show={order !== null} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title>Detalle de la Orden #{order?.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Table striped bordered>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order &&
              order.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>${item.subtotal}</td>
                </tr>
              ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan="2">Total</td>
              <td>${order?.total}</td>
            </tr>
          </tfoot>
        </Table>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DetallePedidoModal;
