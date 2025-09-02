import React, { useEffect, useState } from "react";
import SignupImg from "../assets/Signup/signup.png";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  fullName: yup.string().min(2, "Enter your full name").required("Full name is required"),
  email: yup.string().email("Enter a valid email").required("Email is required"),
  dob: yup.string().required("Date of birth is required"),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/u, "Enter a valid 10-digit number")
    .required("Mobile is required"),
  password: yup.string().min(6, "Min 6 characters").required("Password is required"),
});

function Signup() {
  const navigate = useNavigate();
  const { login } = useAuth();

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    dob: "",
    mobile: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { fullName: "", email: "", dob: "", mobile: "", password: "" }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //  Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.type === "date" ? "dob" : e.target.type === "tel" ? "mobile" : e.target.name || e.target.type]: e.target.value });
  };

  // Signup handler
  const handleSignup = async (values) => {
    try {
      setLoading(true);
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      const user = userCredential.user;

      // Save details in Firestore
      await setDoc(doc(db, "users", user.uid), {
        fullName: values.fullName,
        email: values.email,
        dob: values.dob,
        mobile: values.mobile,
      });

      // Update context and persist
      login(user);
      alert("Signup successful!");
      navigate("/products");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center min-h-screen font-inter">
      {/* Left image section (desktop only) */}
      <div className="w-[60%] h-full lg:flex hidden">
        <img src={SignupImg} alt="Signup" className="w-full h-full object-cover" />
      </div>

      {/* Right content section */}
      <div
        className="lg:w-[40%] w-full h-full flex flex-col 
        lg:gap-12 gap-6 lg:items-center items-start 
        justify-between lg:justify-center lg:px-0 px-5 
        pt-6 lg:pt-0 pb-[140px] sm:pb-[160px] lg:pb-0 relative"
      >
        {/* ---- Top content (Welcome + Form) ---- */}
        <div className="flex flex-col gap-6 lg:gap-10 w-full lg:w-[80%]">
          <div className="flex flex-col gap-2 lg:items-center lg:justify-center">
            <span className="text-2xl sm:text-3xl lg:text-4xl font-[700] w-full lg:text-center text-left">
              Create an Account
            </span>

            <span className="text-xs sm:text-base lg:text-lg lg:text-center text-left font-[450] text-[#9E9E9E]">
              Are you ready to join us? Let’s create your account
            </span>
          </div>

          {/* Form Fields */}
          <form id="signupForm" onSubmit={handleSubmit(handleSignup)} className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-left">Full Name</span>
              <input
                type="text"
                {...register("fullName")}
                placeholder="Enter your full name"
                className="h-[44px] sm:h-[50px] lg:h-[54px] w-full border-2 border-[#9E9E9E] rounded-xl p-3 sm:p-4"
              />
              {errors.fullName && (
                <span className="text-red-500 text-sm">{errors.fullName.message}</span>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-left">Email</span>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className="h-[44px] sm:h-[50px] lg:h-[54px] w-full border-2 border-[#9E9E9E] rounded-xl p-3 sm:p-4"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            {/* Date Field */}
            <div className="flex flex-col gap-2">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-left">Date of Birth</span>
              <input
                type="date"
                {...register("dob")}
                placeholder="Select your date of birth"
                className="h-[44px] sm:h-[50px] lg:h-[54px] w-full border-2 border-[#9E9E9E] rounded-xl p-3 sm:p-4"
              />
              {errors.dob && (
                <span className="text-red-500 text-sm">{errors.dob.message}</span>
              )}
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-2">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-left">Mobile</span>
              <input
                type="tel"
                {...register("mobile")}
                placeholder="Enter your mobile number"
                className="h-[44px] sm:h-[50px] lg:h-[54px] w-full border-2 border-[#9E9E9E] rounded-xl p-3 sm:p-4"
              />
              {errors.mobile && (
                <span className="text-red-500 text-sm">{errors.mobile.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-left">Password</span>
              <input
                type="password"
                {...register("password")}
                placeholder="Create a password"
                className="h-[44px] sm:h-[50px] lg:h-[54px] w-full border-2 border-[#9E9E9E] rounded-xl p-3 sm:p-4"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>
          </form>
        </div>

        {/* ---- Bottom section (fixed on mobile/tablet) ---- */}
        <div
          className="flex flex-col lg:gap-6 gap-4 lg:w-[80%] w-full 
          lg:static fixed bottom-0 left-0 px-5 lg:px-0 
          bg-white lg:bg-transparent pb-4 lg:pb-0"
        >
          {/* Create Account button */}
          <button
            type="submit"
            form="signupForm"
            className="h-[44px] sm:h-[50px] lg:h-[54px] w-full bg-black rounded-xl 
            flex justify-center items-center text-white 
            font-semibold text-sm sm:text-base cursor-pointer"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          {/* OR divider */}
          <div className="flex flex-row gap-3 sm:gap-5 justify-center items-center">
            <ul className="w-[15%] sm:w-[10%] border border-[#9E9E9E]" />
            <span className="text-xs sm:text-sm lg:text-base font-[400] text-[#9E9E9E]">
              OR
            </span>
            <ul className="w-[15%] sm:w-[10%] border border-[#9E9E9E]" />
          </div>

          {/* Sign-in redirect */}
          <div className="flex flex-row items-center justify-center gap-1 sm:gap-2">
            <span className="text-xs sm:text-sm lg:text-lg font-[400] text-[#9E9E9E]">
              Already have an account?
            </span>
            <span
              onClick={() => navigate("/login")}
              className="font-semibold text-xs sm:text-sm lg:text-base cursor-pointer  hover:underline"
            >
              Sign-In
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
