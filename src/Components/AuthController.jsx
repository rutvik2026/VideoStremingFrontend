
// src/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [id, setId] = useState(null);

  useEffect(() => {
    const cust = sessionStorage.getItem("cust");
    const { id } = cust ? JSON.parse(cust) : {};
    setId(id);
  }, []);

  const login = (user) => {
    sessionStorage.setItem("cust", JSON.stringify(user));
    setId(user.id);
  };

  const logout = () => {
    sessionStorage.removeItem("cust");
    setId(null);
  };

  return (
    <AuthContext.Provider value={{ id, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
