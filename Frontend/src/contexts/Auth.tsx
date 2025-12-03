import { jwtDecode } from "jwt-decode";
import { createContext, useState, useMemo, useEffect } from "react";
import Cookies from "universal-cookie";

const authContext = {
  isLoggedin: false,
  login: (token: string) => {},
  loading: true,
  logOut: () => {},
  updateUserData:(userData)=>{},
  user: null,
};
export const AuthContext = createContext(authContext);
const cookies = new Cookies();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isLoggedin = useMemo(() => {
    return !!user;
  }, [user]);
  useEffect(() => {
    const token = cookies.get("token");
    console.log("token from cookie", token);
    if (token) {
      login(token);
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    console.log("logged in");
    cookies.set("token", token);
    const userData = jwtDecode(token);
    setUser(userData);
  };
  const logOut = () => {
    cookies.remove("token");
    console.log("logged out");
    setUser(undefined);
  };
  const updateUserData = (newUserData) => {
    setUser({ ...user, ...newUserData });
  }
  
  return (
    <AuthContext.Provider
      value={{
        isLoggedin,
        login,
        logOut,
        updateUserData,
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
