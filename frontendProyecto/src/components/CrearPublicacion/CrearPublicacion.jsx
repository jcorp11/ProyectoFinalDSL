/**
 * Manejo del Estado:
 * - `formData`: Contiene los datos del formulario para crear una publicación, incluyendo el nombre del producto, precio, stock, URL de la imagen y categoría.
 *
 * Hook de Estado:
 * - Utiliza el hook `useState` para manejar el estado local de los datos del formulario.
 *
 * Manejadores de Eventos:
 * - `handleInputChange`: Maneja los cambios en los campos del formulario y actualiza el estado correspondiente.
 * - `handleSubmit`: Maneja el envío del formulario. Por ahora, solo imprime los datos en la consola.
 *
 * Renderización Condicional:
 * - Se renderiza el componente solo si el usuario es un administrador. Si no lo es, el componente no se muestra.
 *
 * Resumen:
 * Este componente `CrearPublicacion` proporciona un formulario para que los administradores creen nuevas publicaciones. Los datos del formulario se almacenan localmente y se pueden enviar a una base de datos en el backend en el futuro.
 */

import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "./CrearPublicacion.module.css";

const CrearPublicacion = () => {
  const [formData, setFormData] = useState({
    nombreProducto: "",
    descripcion: "", // Added descripcion field to the formData state
    precio: "",
    stock: "",
    urlImagen: "",
    categoria: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = () => {
    // Here you can handle the submission of form data
    // For now, let's just log the data
    console.log("Form Data:", formData);
    toast.success("Producto agregado con éxito"); // Display success message
  };

  const isAdmin = true; // Hardcoded isAdmin to true for testing locally

  if (!isAdmin) {
    return null; // If not admin, don't render the component
  }

  return (
    <div className={styles["crearpublicacion-container"]}>
      <h3>Crear Publicacion</h3>
      <Form>
        <Form.Group controlId="formNombreProducto">
          <Form.Label>Nombre del Producto</Form.Label>
          <Form.Control
            type="text"
            name="nombreProducto"
            value={formData.nombreProducto}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formDescripcion">
          {" "}
          {/* Added descripcion field */}
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
            name="urlImagen"
            value={formData.urlImagen}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formCategoria">
          <Form.Label>Categoría</Form.Label>
          <Form.Control
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" onClick={handleSubmit} className="mt-3">
          {" "}
          {/* Added className for margin top */}
          Confirmar
        </Button>
      </Form>
      {/* Add ToastContainer component */}
      <ToastContainer />
    </div>
  );
};

export default CrearPublicacion;
