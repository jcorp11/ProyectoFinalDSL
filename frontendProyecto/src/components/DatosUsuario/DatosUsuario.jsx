import React, { useState, useEffect } from "react";
import { Form, Button, Modal, ListGroup } from "react-bootstrap";
import styles from "./DatosUsuario.module.css";

const DatosUsuario = () => {
  const [userData, setUserData] = useState({ email: "", addresses: [] });
  const [loading, setLoading] = useState(true);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [newAddress, setNewAddress] = useState("");
  const [newEmail, setNewEmail] = useState("");

  useEffect(() => {
    // Mock fetching user data
    setTimeout(() => {
      setUserData({
        email: "user@example.com",
        addresses: ["123 Main St"],
      });
      setLoading(false);
    }, 100);
  }, []);

  const handleAddAddress = () => {
    setUserData({
      ...userData,
      addresses: [...userData.addresses, newAddress],
    });
    setShowAddressModal(false);
    setNewAddress("");
  };

  const handleEditEmail = () => {
    setUserData({ ...userData, email: newEmail });
    setShowEmailModal(false);
    setNewEmail("");
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className={styles["datos-usuario-container"]}>
      <h3>Datos de Usuario</h3>
      <Form>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={userData.email} readOnly />
          <Button
            variant="link"
            className={styles["link-button"]}
            onClick={() => setShowEmailModal(true)}
          >
            Editar Email
          </Button>
        </Form.Group>

        <Form.Group controlId="formAddresses">
          <Form.Label>Direcciones</Form.Label>
          <ListGroup>
            {userData.addresses.map((address, index) => (
              <ListGroup.Item key={index}>{address}</ListGroup.Item>
            ))}
          </ListGroup>
          <Button
            variant="link"
            className={styles["link-button"]}
            onClick={() => setShowAddressModal(true)}
          >
            Agregar Dirección
          </Button>
        </Form.Group>
      </Form>

      {/* Address Modal */}
      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title> Agregar Dirección </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formNewAddress">
            <Form.Label>Dirección Nueva</Form.Label>
            <Form.Control
              type="text"
              value={newAddress}
              onChange={(e) => setNewAddress(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddressModal(false)}
          >
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleAddAddress}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Email Modal */}
      <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formNewEmail">
            <Form.Label>Nuevo Email</Form.Label>
            <Form.Control
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmailModal(false)}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleEditEmail}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DatosUsuario;
