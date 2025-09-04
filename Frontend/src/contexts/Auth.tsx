import { jwtDecode } from "jwt-decode";
import { createContext, useState, useMemo, useEffect } from "react";
import Cookies from "universal-cookie";

const authContext = {
  isLoggedin: false,
  login: (token: string) => {},
  logOut: () => {},
  user: null,
};
export const AuthContext = createContext(authContext);
const cookies = new Cookies();
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const isLoggedin = useMemo(() => {
    return !!user;
  }, [user]);
  useEffect(() => {
    const token = cookies.get("token");
    if (token) {
      login(token);
    }
  }, []);

  const logOut = () => {
    cookies.remove("token");
    setUser(null);
  };
  const login = (token: string) => {
    cookies.set("token", token);
    const userData = jwtDecode(token);
    setUser(userData);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedin,
        login,
        logOut,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
