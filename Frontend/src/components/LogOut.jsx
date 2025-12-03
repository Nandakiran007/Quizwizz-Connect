import { useEffect, useContext } from "react";
import { AuthContext } from "../contexts/Auth";
import { Navigate } from "react-router-dom";

const LogOut = () => {
  const { logOut } = useContext(AuthContext);
  useEffect(() => {
    logOut();
  }, [logOut]);
  return <Navigate to="/" />;
};

export default LogOut;
