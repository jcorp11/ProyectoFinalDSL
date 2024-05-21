import React, { useState, useEffect } from "react";
import { Form, Spinner, Button, Modal, ListGroup } from "react-bootstrap";

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
    }, 1000);
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
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <Form>
        <Form.Group controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" value={userData.email} readOnly />
          <Button variant="link" onClick={() => setShowEmailModal(true)}>
            Edit Email
          </Button>
        </Form.Group>

        <Form.Group controlId="formAddresses">
          <Form.Label>Direcciónes</Form.Label>
          <ListGroup>
            {userData.addresses.map((address, index) => (
              <ListGroup.Item key={index}>{address}</ListGroup.Item>
            ))}
          </ListGroup>
          <Button variant="link" onClick={() => setShowAddressModal(true)}>
            Add Address
          </Button>
        </Form.Group>
      </Form>

      {/* Address Modal */}
      <Modal show={showAddressModal} onHide={() => setShowAddressModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formNewAddress">
            <Form.Label>New Address</Form.Label>
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
            Close
          </Button>
          <Button variant="primary" onClick={handleAddAddress}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Email Modal */}
      <Modal show={showEmailModal} onHide={() => setShowEmailModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Email</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formNewEmail">
            <Form.Label>New Email</Form.Label>
            <Form.Control
              type="email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEmailModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEditEmail}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DatosUsuario;

/**
 * Manejo del Estado:
 * - `userData`: Contiene el correo electrónico del usuario y un array de direcciones.
 * - `loading`: Indica si los datos están siendo cargados.
 * - `showAddressModal` y `showEmailModal`: Gestionan la visibilidad de los modales.
 * - `newAddress` y `newEmail`: Contienen los valores de entrada para la nueva dirección y el nuevo correo electrónico.
 *
 * Hook de Efecto:
 * - Simula la obtención de datos del usuario con un `setTimeout` para emular una llamada a una API.
 *
 * Manejadores de Eventos:
 * - `handleAddAddress`: Añade una nueva dirección al array de `addresses` y cierra el modal.
 * - `handleEditEmail`: Actualiza el correo electrónico del usuario y cierra el modal.
 *
 * Renderización Condicional:
 * - Muestra un spinner mientras los datos están siendo cargados.
 * - Renderiza el formulario con los campos de correo electrónico y direcciones.
 * - Incluye botones para abrir los modales para añadir una dirección y editar el correo electrónico.
 *
 * Modales:
 * - Componentes `Modal` de `react-bootstrap` para añadir una nueva dirección y editar el correo electrónico.
 *
 * Resumen:
 * Este componente `DatosUsuario` actualizado permite manejar múltiples direcciones almacenándolas en un array y mostrándolas en un `ListGroup`.
 * Cuando se añade una nueva dirección, se agrega al array, y el usuario puede editar el correo electrónico a través de un modal.
 *
 * Esta configuración utiliza estado local y una simulación de obtención de datos, que más adelante puede ser reemplazada por llamadas reales a la API cuando el backend esté listo.
 */
