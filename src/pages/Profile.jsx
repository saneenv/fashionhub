import React from "react";
import { useNavigate } from "react-router-dom"; //  import navigate hook
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const navigate = useNavigate(); //  initialize navigator

  const user = {
    name: "John Doe",
    email: "john@example.com",
    mobile: "+91 9876543210",
    dob: "1995-08-12",
  };

  // Generate initials from user name
  const getInitials = (name) =>
    name
      .split(" ")
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
              {getInitials(user.name)}
            </div>
            <h1 className="mt-4 text-2xl md:text-3xl font-bold text-gray-800">
              My Profile
            </h1>
          </div>

          {/* User Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="p-4 bg-gray-50 rounded-xl shadow">
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold text-gray-800">{user.name}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl shadow">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800">{user.email}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl shadow">
              <p className="text-sm text-gray-500">Mobile</p>
              <p className="font-semibold text-gray-800">{user.mobile}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl shadow">
              <p className="text-sm text-gray-500">Date of Birth</p>
              <p className="font-semibold text-gray-800">{user.dob}</p>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")} // ✅ redirect to homepage
              className="px-6 py-3 bg-[black] hover:opacity-90 transition rounded-xl text-white font-semibold shadow-lg cursor-pointer"
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
