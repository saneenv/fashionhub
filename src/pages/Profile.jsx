import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext"; // ✅ import context

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // ✅ get user + logout from context

  // If no user is logged in, redirect to login
  if (!user) {
    navigate("/login");
    return null;
  }

  // Generate initials from user name
  const getInitials = (name) =>
    name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="flex-grow flex items-center justify-center bg-gray-50 px-4 py-10 md:py-16">
        <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 md:p-10">
          {/* Avatar */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-[#F5F1EE] flex items-center justify-center text-2xl md:text-3xl font-bold shadow-lg">
              {getInitials(user.displayName || user.email)}
            </div>
            <h1 className="mt-4 text-2xl md:text-3xl font-bold text-gray-800">
              My Profile
            </h1>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-xl shadow">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800">{user.email}</p>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                logout(); // ✅ clear auth + localStorage
                navigate("/login"); // ✅ redirect
              }}
              className="px-6 py-3 bg-black hover:opacity-90 transition rounded-xl text-white font-semibold shadow-lg cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Profile;
