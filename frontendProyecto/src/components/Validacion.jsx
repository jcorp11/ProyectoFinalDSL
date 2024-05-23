// import React from "react";
// import { Navigate } from "react-router-dom";

// const Validacion = ({ children, requireRoles }) => {
//   const user = { authenticate: true, rol: "user" };

//   if (!user.authenticate) {
//     return <Navigate to="/login" />;
//   }
//   if (requireRoles && requireRoles !== user.rol) {
//     return <Navigate to="/" />;
//   }

//   return children;
// };

// export default Validacion;

import React from "react";
import { Navigate } from "react-router-dom";

const Validacion = ({ children, condition }) => {
  if (!condition) {
    return null;
  }

  return children;
};

export default Validacion;
