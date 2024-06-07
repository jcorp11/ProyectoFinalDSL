import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Form, Modal } from "react-bootstrap";
import styles from "./ModificarPublicacion.module.css";
import axios from "axios";
import { userContext } from "../../context/UserProvider";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModificarPublicaciones = () => {
  const { token } = useContext(userContext);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${URL}/productos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        setProducts(response.data);
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${URL}/productos/CRUD/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        setProducts(products.filter((product) => product.id !== productId));
        toast.error("Producto eliminado con éxito");
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error al eliminar el producto");
    }
  };

  const handleShowModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleSaveChanges = async () => {
    try {
      const response = await axios.put(
        `${URL}/productos/CRUD/${selectedProduct.id}`,
        selectedProduct,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        // Find the index of the modified product in the products array
        const index = products.findIndex(
          (product) => product.id === selectedProduct.id
        );
        if (index !== -1) {
          // Update the product at the found index with the modified product
          const updatedProducts = [...products];
          updatedProducts[index] = selectedProduct;
          setProducts(updatedProducts);
        }
        handleCloseModal();
        toast.success("Producto modificado con éxito");
      } else {
        throw new Error("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Error al modificar el producto");
    }
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
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products
              .filter((product) =>
                product.titulo.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((product) => (
                <tr key={product.id}>
                  <td>{product.titulo}</td>
                  <td>{product.descripcion}</td>
                  <td>{product.precio}</td>
                  <td>{product.imagenUrl}</td>
                  <td>{product.stock}</td>
                  <td>{product.estado ? "Disponible" : "No disponible"}</td>
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
                  value={selectedProduct.titulo}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      titulo: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Descripción</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={selectedProduct.descripcion}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      descripcion: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Precio</Form.Label>
                <Form.Control
                  type="number"
                  value={selectedProduct.precio}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      precio: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Imagen URL</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedProduct.imagenUrl}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      imagenUrl: e.target.value,
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
                <Form.Label>Estado</Form.Label>
                <Form.Control
                  as="select"
                  value={
                    selectedProduct.estado ? "Disponible" : "No disponible"
                  }
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      estado: e.target.value === "Disponible",
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
