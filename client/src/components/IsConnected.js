import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context";

function IsConnected({ children }) {
  const { user } = useContext(AuthContext);

  return user ? children : <Navigate to="/login" />;
}

export default IsConnected;
