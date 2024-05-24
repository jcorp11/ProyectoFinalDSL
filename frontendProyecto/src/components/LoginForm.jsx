import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../context/UserProvider";

import axios from "axios";
import "../assets/css/LoginFromStyle.css"; // Import the CSS file

const LoginForm = () => {
  const { user, setUser, token, setToken, usersAll, setUsersAll } =
    useContext(userContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError("");

    // try {
    //   const response = await axios.post("/login", { email, password });
    //   console.log("Login successful", response.data);
    //   // Handle successful login (e.g., redirect to dashboard, store token, etc.)
    // } catch (error) {
    //   console.error("Error logging in", error);
    //   setError("Invalid email or password");
    // } finally {
    //   setIsLoading(false);
    // }
    const userdummy = {
      email: "user@example.com",
      id: 1,
      direccion: "Calle Falsa 123, Ciudad Ejemplo, País",
      nombre: "Juan",
      apellido: "Pérez",
      rol: "admin",
    };

    setToken(true);
    setUser(userdummy);

    navigate("/");
  };

  return (
    <div className="containerForm">
      <form onSubmit={handleSubmit} className="form">
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
        {error && <p className="error">{error}</p>}
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
            onClick={() => navigate("/registrar")}
          >
            Registrar
          </button>
          <button type="submit" className="button" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};
export default LoginForm;
