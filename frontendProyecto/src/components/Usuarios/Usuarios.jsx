import React, { useState } from "react";
import { Table, Button, Collapse, Modal } from "react-bootstrap";
import DetallePedidoModal from "../../components/DetallePedidoModal"; // Importing the modal component

const Usuarios = () => {
  const [expandedRow, setExpandedRow] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Datos de usuario simulados
  const usuarios = [
    {
      id: 1,
      nombre: "John",
      apellido: "Doe",
      mail: "john.doe@example.com",
      rol: "admin",
      fechaRegistro: "2022-01-01",
      orders: [
        {
          id: 1,
          date: "2022-01-05",
          total: 100,
          items: [
            { name: "Item 1", quantity: 2, subtotal: 50 },
            { name: "Item 2", quantity: 1, subtotal: 50 },
          ],
        },
        {
          id: 2,
          date: "2022-02-10",
          total: 150,
          items: [
            { name: "Item 3", quantity: 3, subtotal: 50 },
            { name: "Item 4", quantity: 2, subtotal: 100 },
          ],
        },
      ],
    },
    {
      id: 2,
      nombre: "Jane",
      apellido: "Doe",
      mail: "jane.doe@example.com",
      rol: "user",
      fechaRegistro: "2022-01-02",
      orders: [
        {
          id: 3,
          date: "2022-03-15",
          total: 200,
          items: [{ name: "Item 5", quantity: 1, subtotal: 200 }],
        },
        {
          id: 4,
          date: "2022-04-20",
          total: 250,
          items: [
            { name: "Item 6", quantity: 2, subtotal: 100 },
            { name: "Item 7", quantity: 3, subtotal: 150 },
          ],
        },
      ],
    },
  ];

  const toggleRow = (userId) => {
    setExpandedRow(expandedRow === userId ? null : userId);
  };

  const handleVerDetalle = (order) => {
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
  };

  return (
    <div>
      <h3>Usuarios</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Mail</th>
            <th>Rol</th>
            <th>Fecha de Registro</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <React.Fragment key={usuario.id}>
              <tr onClick={() => toggleRow(usuario.id)}>
                <td>{usuario.nombre}</td>
                <td>{usuario.apellido}</td>
                <td>{usuario.mail}</td>
                <td>{usuario.rol}</td>
                <td>{usuario.fechaRegistro}</td>
                <td>
                  <Button variant="primary" size="sm">
                    Ver Pedidos
                  </Button>
                </td>
              </tr>
              {expandedRow === usuario.id && (
                <tr>
                  <td colSpan="6">
                    <Collapse in={expandedRow === usuario.id}>
                      <div>
                        <Table striped bordered hover>
                          <thead>
                            <tr>
                              <th>Numero de Pedido</th>
                              <th>Fecha</th>
                              <th>Total</th>
                              <th>Acciones</th>
                            </tr>
                          </thead>
                          <tbody>
                            {usuario.orders.map((order) => (
                              <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.date}</td>
                                <td>{order.total}</td>
                                <td>
                                  <Button
                                    variant="info"
                                    size="sm"
                                    onClick={() => handleVerDetalle(order)}
                                  >
                                    Ver Detalle
                                  </Button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </Table>
                      </div>
                    </Collapse>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </Table>

      {/* Modal for displaying order details */}
      <DetallePedidoModal
        order={selectedOrder}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
};

export default Usuarios;
