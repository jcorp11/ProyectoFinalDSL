import React, { useState } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import productsData from "../../data/products.json"; // Importing product data from a local JSON file
import styles from "./ModificarPublicacion.module.css"; // Importing the CSS module for styling

const ModificarPublicaciones = () => {
  const [products, setProducts] = useState(productsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

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

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleSaveChanges = () => {
    setProducts(
      products.map((product) =>
        product.id === selectedProduct.id ? selectedProduct : product
      )
    );
    handleCloseModal();
  };

  return (
    <div className={styles.container}>
      <h3>Modificar Publicaciones</h3>
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Buscar por título"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Form.Group>
      <div className={styles.tableResponsive}>
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
                    variant="warning"
                    onClick={() => handleShowModal(product)}
                  >
                    Modificar
                  </Button>
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

      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Modificar Producto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Título</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProduct.title}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      title: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedProduct.description}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedProduct.price}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      price: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imagen URL</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProduct.imageUrl}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      imageUrl: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedProduct.stock}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      stock: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Categoría</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProduct.category}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      category: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  as="select"
                  value={
                    selectedProduct.available ? "Disponible" : "No disponible"
                  }
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      available: e.target.value === "Disponible",
                    })
                  }
                >
                  <option value="Disponible">Disponible</option>
                  <option value="No disponible">No disponible</option>
                </Form.Control>
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
      )}
    </div>
  );
};

export default ModificarPublicaciones;
