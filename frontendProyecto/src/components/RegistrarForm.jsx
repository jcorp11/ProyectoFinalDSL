import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import "../assets/css/LoginFromStyle.css"; // Import the CSS file

const URL = import.meta.env.VITE_BASE_URL;

const RegistrarForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [direccion, setDireccion] = useState("");
  const [error, setError] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");
    if (password !== confirmPassword) {
      toast.warning("Las contraseñas no coinciden");
      setError({ ...error, msg: "Las contraseñas no coinciden" });
      return;
    }
    try {
      const response = await axios.post(`${URL}/user/register`, {
        email,
        password,
        confirmPassword,
        nombre,
        apellido,
        direccion,
      });
      console.log("Signup successful", response.data);
      toast.success("Signup successful");
      
      // Handle successful login (e.g., redirect to dashboard, store token, etc.)
    } catch (error) {
      toast.error("Error signing up");
      console.error("Error signing up", error);
      setError({ ...error, msg: "error en los datos" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="containerForm2">
      <form onSubmit={handleSubmit} className="form">
        <div className="inputGroup">
          <label htmlFor="Nombre" className="label">
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="Apellido" className="label">
            Apellido:
          </label>
          <input
            type="text"
            id="apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="email" className="label">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="direccion" className="label">
            Direccion:
          </label>
          <input
            type="text"
            id="direccion"
            value={direccion}
            onChange={(e) => setDireccion(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password" className="label">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        <div className="inputGroup">
          <label htmlFor="password" className="label">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="input"
            required
          />
        </div>
        {error && <p className="error">{error.msg}</p>}
        <div className="buttonGroup">
          <button
            type="button"
            className="button buttonHome"
            onClick={() => navigate("/")}
          >
            Home
          </button>

          <button
            type="button"
            className="button buttonRegister"
            onClick={() => navigate("/login")}
          >
            Log in
          </button>
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Loasing" : "Registrarse"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarForm;
