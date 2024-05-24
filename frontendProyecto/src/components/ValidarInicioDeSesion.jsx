
const ValidarInicioDeSesion = ({ children, condition }) => {
  if (!condition) {
    return null;
  }

  return children;
};

export default ValidarInicioDeSesion;