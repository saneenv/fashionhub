import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext"; // import context
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

function Profile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // get user + logout from context
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDOB = (raw) => {
    if (!raw) return "-";
    try {
      // If already in YYYY-MM-DD or YYYY/MM/DD
      if (typeof raw === "string") {
        const normalized = raw.replaceAll("/", "-");
        const parts = normalized.split("-");
        if (parts.length === 3) {
          const [yyyy, mm, dd] = parts.map((p) => String(p).padStart(2, "0"));
          if (yyyy.length === 4) return `${dd}-${mm}-${yyyy}`;
        }
        // Fallback: try Date parse
        const d = new Date(raw);
        if (!isNaN(d)) {
          const dd = String(d.getDate()).padStart(2, "0");
          const mm = String(d.getMonth() + 1).padStart(2, "0");
          const yyyy = d.getFullYear();
          return `${dd}-${mm}-${yyyy}`;
        }
        return raw;
      }
      // Firestore Timestamp or Date
      const dateObj = raw?.toDate ? raw.toDate() : new Date(raw);
      if (!isNaN(dateObj)) {
        const dd = String(dateObj.getDate()).padStart(2, "0");
        const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
        const yyyy = dateObj.getFullYear();
        return `${dd}-${mm}-${yyyy}`;
      }
      return "-";
    } catch {
      return "-";
    }
  };

  // If no user is logged in, redirect to login (avoid navigating during render)
  useEffect(() => {
    if (!user) navigate("/login");
  }, [user, navigate]);

  // Fetch user profile from Firestore
  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) {
        setLoading(false);
        return;
      }
      try {
        const ref = doc(db, "users", user.uid);
        const snapshot = await getDoc(ref);
        if (snapshot.exists()) {
          setProfile(snapshot.data());
        } else {
          setProfile(null);
        }
      } catch (_e) {
        setProfile(null);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

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
              <p className="text-sm text-gray-500">Name</p>
              <p className="font-semibold text-gray-800">{profile?.fullName || user.displayName || "-"}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl shadow">
              <p className="text-sm text-gray-500">Email</p>
              <p className="font-semibold text-gray-800">{user.email}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl shadow">
              <p className="text-sm text-gray-500">Mobile</p>
              <p className="font-semibold text-gray-800">{profile?.mobile || "-"}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-xl shadow">
              <p className="text-sm text-gray-500">DOB</p>
              <p className="font-semibold text-gray-800">{formatDOB(profile?.dob)}</p>
            </div>
          </div>

          {/* Logout Button */}
          <div className="mt-8 text-center">
            <button
              onClick={() => {
                logout(); // clear auth + localStorage
                navigate("/login"); // redirect
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
