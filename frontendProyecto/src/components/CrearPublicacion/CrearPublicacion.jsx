import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./CrearPublicacion.module.css";
import { userContext } from "../../context/UserProvider"; // Import user context

const URL = import.meta.env.VITE_BASE_URL;

const CrearPublicacion = () => {
  const [formData, setFormData] = useState({
    titulo: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagenUrl: "",
    estado: true, // Default value for estado as boolean
  });

  const { user, token } = useContext(userContext); // Get user from context

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "estado" ? JSON.parse(value) : value, // Parse boolean value for estado
    });
  };

  const handleSubmit = async () => {
    // Log formData to the console
    console.log("Form Data:", formData);

    try {
      const response = await fetch(`${URL}/productos/CRUD`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      // Log the response for debugging
      const responseData = await response.json();
      console.log("Response:", responseData);

      if (response.ok) {
        toast.success("Producto agregado con éxito");
        // Clear form data after successful submission
        setFormData({
          titulo: "",
          descripcion: "",
          precio: "",
          stock: "",
          imagenUrl: "",
          estado: true,
        });
      } else {
        console.error("Error response data:", responseData);
        throw new Error("Error al agregar el producto");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Error al agregar el producto");
    }
  };

  const isAdmin = user && user.rol === "admin"; // Check if user is admin

  if (!isAdmin) {
    return <div>No tienes permisos para acceder a esta página</div>; // Render message if not admin
  }

  return (
    <div className={styles["crearpublicacion-container"]}>
      <h3>Crear Publicacion</h3>
      <Form>
        <Form.Group controlId="formTitulo">
          <Form.Label>Título</Form.Label>
          <Form.Control
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formDescripcion">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            type="text"
            name="descripcion"
            value={formData.descripcion}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formPrecio">
          <Form.Label>Precio</Form.Label>
          <Form.Control
            type="number"
            name="precio"
            value={formData.precio}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formStock">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formUrlImagen">
          <Form.Label>URL de la Imagen</Form.Label>
          <Form.Control
            type="text"
            name="imagenUrl"
            value={formData.imagenUrl}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formEstado">
          <Form.Label>Estado</Form.Label>
          <Form.Control
            as="select"
            name="estado"
            value={formData.estado}
            onChange={handleInputChange}
          >
            <option value="true">Disponible</option>
            <option value="false">No Disponible</option>
          </Form.Control>
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit} className="mt-3">
          Confirmar
        </Button>
      </Form>
      <ToastContainer />
    </div>
  );
};

export default CrearPublicacion;
