import React, { useState, useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MisCompras from "../../components/MisCompras/MisCompras";
import DatosUsuario from "../../components/DatosUsuario/DatosUsuario";
import CrearPublicacion from "../../components/CrearPublicacion/CrearPublicacion";
import Usuarios from "../../components/Usuarios/Usuarios";
import ModificarPublicacion from "../../components/ModificarPublicacion/ModificarPublicacion";
import Ventas from "../../components/Ventas/Ventas"; // Import the Ventas component
import styles from "./Perfil.module.css";
import { userContext } from "../../context/UserProvider";

const Perfil = () => {
  const [activeComponent, setActiveComponent] = useState("");
  const { user } = useContext(userContext);

  const isAdmin = user && user.rol === "admin";
  const isCliente = user && user.rol === "cliente";

  return (
    <Container className={styles.container}>
      <Row>
        <Col>
          <h1 className="text-center my-4"></h1>
        </Col>
      </Row>
      <Row>
        <Col md={3} className={styles.sidebar}>
          {isCliente && (
            <>
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
            </>
          )}
          {isAdmin && (
            <>
              <Button
                variant="link"
                className={styles.sidebarButton}
                onClick={() => setActiveComponent("ventas")} // Set active component to "ventas" when "Ventas" button is clicked
              >
                Ventas
              </Button>
              <Button
                variant="link"
                className={styles.sidebarButton}
                onClick={() => setActiveComponent("crear-publicacion")}
              >
                Crear Publicación
              </Button>
              <Button
                variant="link"
                className={styles.sidebarButton}
                onClick={() => setActiveComponent("usuarios")}
              >
                Usuarios
              </Button>
              <Button
                variant="link"
                className={styles.sidebarButton}
                onClick={() => setActiveComponent("modificar-publicaciones")}
              >
                Modificar Publicaciones
              </Button>
            </>
          )}
        </Col>
        <Col md={9} className={styles.content}>
          <div className={styles.espaciador}>
            {/* Render different components based on activeComponent */}
            {activeComponent === "mis-compras" && <MisCompras />}
            {activeComponent === "datos-usuario" && <DatosUsuario />}
            {activeComponent === "crear-publicacion" && <CrearPublicacion />}
            {activeComponent === "usuarios" && <Usuarios />}
            {activeComponent === "modificar-publicaciones" && (
              <ModificarPublicacion />
            )}
            {isAdmin && activeComponent === "ventas" && <Ventas />}{" "}
            {/* Render Ventas component only when activeComponent is "ventas" and user is admin */}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Perfil;
