import React from "react";
import { Table, Button } from "react-bootstrap";

const Usuarios = () => {
  // Datos de usuario simulados
  const usuarios = [
    {
      id: 1,
      nombre: "John",
      apellido: "Doe",
      mail: "john.doe@example.com",
      rol: "admin",
      fechaRegistro: "2022-01-01",
    },
    {
      id: 2,
      nombre: "Jane",
      apellido: "Doe",
      mail: "jane.doe@example.com",
      rol: "user",
      fechaRegistro: "2022-01-02",
    },
  ];

  // Función para manejar la visualización de pedidos para un usuario (implementación simulada)
  const handleViewOrders = (userId) => {
    // Esta función se implementará para ver los pedidos asociados con el usuario seleccionado
    // Por ahora, solo registra el ID del usuario en la consola
    console.log("Ver pedidos para usuario:", userId);
  };

  return (
    <div>
      <h2>Usuarios</h2>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Mail</th>
            <th>Rol</th>
            <th>Fecha de Registro</th>
            <th>Pedidos</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.nombre}</td>
              <td>{usuario.apellido}</td>
              <td>{usuario.mail}</td>
              <td>{usuario.rol}</td>
              <td>{usuario.fechaRegistro}</td>
              <td>
                {/* Botón para ver pedidos */}
                <Button
                  variant="link"
                  onClick={() => handleViewOrders(usuario.id)}
                >
                  Ver Pedidos
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Usuarios;
