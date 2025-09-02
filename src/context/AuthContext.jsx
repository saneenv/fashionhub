import { createContext, useState, useContext } from "react";

// 1. Create context
const AuthContext = createContext();

// 2. Create provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook for easy usage
export const useAuth = () => {
  return useContext(AuthContext);
};
