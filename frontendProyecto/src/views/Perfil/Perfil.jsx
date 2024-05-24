import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MisCompras from "../../components/MisCompras/MisCompras"; // Updated path
import DatosUsuario from "../../components/DatosUsuario/DatosUsuario"; // Updated path
import CrearPublicacion from "../../components/CrearPublicacion/CrearPublicacion"; // Updated path
import Usuarios from "../../components/Usuarios/Usuarios"; // Updated path
import ModificarPublicacion from "../../components/ModificarPublicacion/ModificarPublicacion"; // Updated path
import styles from "./Perfil.module.css";

const Perfil = () => {
  const [activeComponent, setActiveComponent] = useState("mis-compras");

  const isAdmin = true; // Hardcoded isAdmin to true for testing locally

  return (
    <Container className={styles.container}>
      <Row>
        <Col>
          <h1 className="text-center my-4"></h1>
        </Col>
      </Row>
      <Row>
        <Col md={3} className={styles.sidebar}>
          <Button
            variant="link"
            className={styles.sidebarButton}
            onClick={() => setActiveComponent("mis-compras")}
          >
            Mis Compras
          </Button>
          <Button
            variant="link"
            className={styles.sidebarButton}
            onClick={() => setActiveComponent("datos-usuario")}
          >
            Datos de Usuario
          </Button>
          {isAdmin && (
            <Button
              variant="link"
              className={styles.sidebarButton}
              onClick={() => setActiveComponent("crear-publicacion")}
            >
              Crear Publicación
            </Button>
          )}
          {isAdmin && (
            <Button
              variant="link"
              className={styles.sidebarButton}
              onClick={() => setActiveComponent("usuarios")}
            >
              Usuarios
            </Button>
          )}
          {isAdmin && (
            <Button
              variant="link"
              className={styles.sidebarButton}
              onClick={() => setActiveComponent("modificar-publicaciones")}
            >
              Modificar Publicaciones
            </Button>
          )}
        </Col>
        <Col md={9} className={styles.content}>
          <div className={styles.espaciador}>
            {activeComponent === "mis-compras" && <MisCompras />}
            {activeComponent === "datos-usuario" && <DatosUsuario />}
            {activeComponent === "crear-publicacion" && <CrearPublicacion />}
            {activeComponent === "usuarios" && <Usuarios />}
            {activeComponent === "modificar-publicaciones" && (
              <ModificarPublicacion />
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Perfil;
