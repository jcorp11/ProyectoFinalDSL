import React, { useState, useEffect, useContext } from "react";
import { Table, Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { userContext } from "../../context/UserProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DatosUsuario = () => {
  const { user, token } = useContext(userContext);
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    direccion: "",
    email: "",
  });

  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const response = await axios.get(`${URL}/usuarios/${user.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserData(response.data.user);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleEdit = () => {
    setShowModal(true);
    setFormData({
      direccion: userData.direccion,
      email: userData.email,
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      direccion: "",
      email: "",
    });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`${URL}/usuarios/${user.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getUserData();
      handleCloseModal();
      toast.success("¡Tus datos se han modificado con éxito!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
      });
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  if (!user || user.rol === "admin") {
    return (
      <div>
        <h6>Debes estar loggeado para ver tus datos :(</h6>
      </div>
    );
  }

  return (
    <div>
      <h3>Tus Datos de Usuario</h3>
      {userData && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Direccion</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{userData.id}</td>
              <td>{userData.email}</td>
              <td>{userData.direccion}</td>
              <td>{userData.nombre}</td>
              <td>{userData.apellido}</td>
              <td>
                <Button variant="primary" onClick={handleEdit}>
                  Editar
                </Button>
              </td>
            </tr>
          </tbody>
        </Table>
      )}

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Your Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Direccion</Form.Label>
              <Form.Control
                type="text"
                value={formData.direccion}
                onChange={(e) =>
                  setFormData({ ...formData, direccion: e.target.value })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Guardar Cambios
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DatosUsuario;
