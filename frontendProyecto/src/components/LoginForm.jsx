import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../context/UserProvider";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";

import axios from "axios";
import "../assets/css/LoginFromStyle.css"; // Import the CSS file

const URL = import.meta.env.VITE_BASE_URL;
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

    try {
      const response = await axios.post(`${URL}/user/login`, {
        email,
        password,
      });
      console.log("Login successful", response.data);
      toast.success("Login successful");
      setUser(response.data.user);
      setToken(response.data.token);

      // Handle successful login (e.g., redirect to dashboard, store token, etc.)
    } catch (error) {
      toast.error("failed login");
      console.error("Error logging in", error);
      setError("Invalid email or password");
    } finally {
      setIsLoading(false);
    }

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
            onClick={() => navigate("/register")}
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
