import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MisCompras from "../components/MisCompras";
import DatosUsuario from "../components/DatosUsuario";
import CrearPublicacion from "../components/CrearPublicacion";
import Usuarios from "../components/Usuarios";
import ModificarPublicacion from "../components/ModificarPublicacion";

const Perfil = () => {
  const [activeComponent, setActiveComponent] = useState("datos-usuario");

  const isAdmin = true; // Hardcoded isAdmin to true for testing locally

  return (
    <Container>
      <h1 className="text-center my-4">Perfil</h1>
      <Row>
        <Col md={3}>
          <div className="d-flex flex-column">
            <Button
              variant="link"
              onClick={() => setActiveComponent("mis-compras")}
            >
              Mis Compras
            </Button>
            <Button
              variant="link"
              onClick={() => setActiveComponent("datos-usuario")}
            >
              Datos de Usuario
            </Button>
            {isAdmin && (
              <Button
                variant="link"
                onClick={() => setActiveComponent("crear-publicacion")}
              >
                Crear Publicación
              </Button>
            )}
            {isAdmin && (
              <Button
                variant="link"
                onClick={() => setActiveComponent("usuarios")}
              >
                Usuarios
              </Button>
            )}
            {isAdmin && (
              <Button
                variant="link"
                onClick={() => setActiveComponent("modificar-publicaciones")}
              >
                Modificar Publicaciones
              </Button>
            )}
          </div>
        </Col>
        <Col md={9}>
          {activeComponent === "mis-compras" && <MisCompras />}
          {activeComponent === "datos-usuario" && <DatosUsuario />}
          {activeComponent === "crear-publicacion" && <CrearPublicacion />}
          {activeComponent === "usuarios" && <Usuarios />}
          {activeComponent === "modificar-publicaciones" && (
            <ModificarPublicacion />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Perfil;
