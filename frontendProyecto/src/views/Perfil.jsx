import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import MisCompras from "../components/MisCompras";
import DatosUsuario from "../components/DatosUsuario";

const Perfil = () => {
  const [activeComponent, setActiveComponent] = useState("mis-compras");

  const renderComponent = () => {
    switch (activeComponent) {
      case "mis-compras":
        return <MisCompras />;
      case "datos-usuario":
        return <DatosUsuario />;
      default:
        return <MisCompras />;
    }
  };

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
          </div>
        </Col>
        <Col md={9}>{renderComponent()}</Col>
      </Row>
    </Container>
  );
};

export default Perfil;
