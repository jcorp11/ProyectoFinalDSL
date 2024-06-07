import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { userContext } from "../../context/UserProvider";
import { toast } from "react-toastify";

const Usuarios = () => {
  const { token } = useContext(userContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    direccion: "",
    email: "",
  });

  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get(`${URL}/usuarios`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(response.data.users);
      console.log(response.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      direccion: user.direccion,
      email: user.email,
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setFormData({
      direccion: "",
      email: "",
    });
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(`${URL}/usuarios/${selectedUser.id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      getAllUsers();
      handleCloseModal();
      toast.success("Usuario modificado con éxito");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div>
      <h3>Users</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Direccion</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Rol</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.direccion}</td>
              <td>{user.nombre}</td>
              <td>{user.apellido}</td>
              <td>{user.rol}</td>
              <td>
                <Button variant="primary" onClick={() => handleEdit(user)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
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
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Usuarios;
