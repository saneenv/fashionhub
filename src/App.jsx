import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Products from './pages/Products';
import Profile from './pages/Profile';

function App() {
  return (
    <div className="text-center">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/profile" element={<Profile />} />


      </Routes>
    </div>
  );
}

export default App;