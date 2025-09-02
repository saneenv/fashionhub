import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext"; // ✅ use custom hook

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Products from "./pages/Products";
import Profile from "./pages/Profile";

function App() {
  const { user, isHydrated } = useAuth(); // ✅ get user + hydration

  return (
    <div className="text-center">
      <Routes>
        <Route
          path="/"
          element={
            isHydrated
              ? user
                ? <Navigate to="/products" />
                : <Navigate to="/login" />
              : null
          }
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/products" /> : <Login />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/products" /> : <Signup />}
        />

        {/* Protected routes */}
        <Route
          path="/products"
          element={user ? <Products /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={user ? <Profile /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}

export default App;
