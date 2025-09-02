import { createContext, useEffect, useState, useContext } from "react";
import { auth } from "../firebase";
import {
  onAuthStateChanged,
  setPersistence,
  browserLocalPersistence,
  signOut,
} from "firebase/auth";

// 1. Create context
const AuthContext = createContext();

// 2. Create provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // login function
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  // logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Also sign out from Firebase auth
    signOut(auth).catch(() => {});
  };

  // Hydrate user from Firebase auth and localStorage
  useEffect(() => {
    // Ensure Firebase uses local persistence
    setPersistence(auth, browserLocalPersistence).finally(() => {
      // First, try localStorage (quick paint)
      const stored = localStorage.getItem("user");
      if (stored && !user) {
        try {
          setUser(JSON.parse(stored));
        } catch (_) {}
      }

      // Then, subscribe to Firebase auth state for truth
      const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
        if (firebaseUser) {
          setUser(firebaseUser);
          localStorage.setItem("user", JSON.stringify(firebaseUser));
        } else {
          setUser(null);
          localStorage.removeItem("user");
        }
        setIsHydrated(true);
      });

      return () => unsubscribe();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout, isHydrated }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook for easy usage
export const useAuth = () => {
  return useContext(AuthContext);
};
