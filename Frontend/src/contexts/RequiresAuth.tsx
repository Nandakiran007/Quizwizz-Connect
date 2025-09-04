import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./Auth";
export const RequiresAuth = ({ children }) => {
  const { isLoggedin } = useContext(AuthContext);
  return isLoggedin ? children : <Navigate to="/login" />;
};
