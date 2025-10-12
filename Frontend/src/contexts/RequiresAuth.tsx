import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "./Auth";
export const RequiresAuth = ({ children }) => {
  const { isLoggedin,loading } = useContext(AuthContext);
  
  if(loading){
    return <div>Loading...</div>;
  }
  return isLoggedin ? children : <Navigate to="/login" />;
};
