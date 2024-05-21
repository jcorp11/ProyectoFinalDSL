import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from './components/Navbar'

function App() {

  return (
    <>
      <Navbar />
      {/* <Routes>
        <Route path="/" element={token ? <HomePage /> : <Navigate to="/login" />} />
        <Route
          path="/login"
          element={token ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route path="/register" element={<RegisterPage />} />

        <Route path="/perfil" element={<Perfil />} />
        <Route path="/carrito" element={<Carrito />} />
        <Route path="/vistadetalle" element={<VistaDetalle />} />
      </Routes>; */}
    </>
  )

}

export default App;
