import React, { useState } from "react";
import { Table, Button, Form } from "react-bootstrap";
import productsData from "../data/products.json"; // Importing product data from a local JSON file

const ModificarPublicaciones = () => {
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const filteredProducts = productsData.filter((product) =>
      product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setProducts(filteredProducts);
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter(
      (product) => product.id !== productId
    );
    setProducts(updatedProducts);
  };

  return (
    <div>
      <h2>Modificar Publicaciones</h2>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar por título"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Título</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Imagen URL</th>
            <th>Stock</th>
            <th>Categoría</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.title}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>{product.imageUrl}</td>
              <td>{product.stock}</td>
              <td>{product.category}</td>
              <td>{product.available ? "Disponible" : "No disponible"}</td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => deleteProduct(product.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ModificarPublicaciones;
