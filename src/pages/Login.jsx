import React, { useEffect, useState } from "react";
import loginImg from "../assets/Login/login.png";
import welcomeback from "../assets/Login/Welcome Back.png";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../services/authService"; // the helper you made
import { useAuth } from "../context/AuthContext";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();      // use context

  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { email: "", password: "" }
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const onLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const userData = await handleLogin(email, password);
      login(userData);  // updates context + localStorage
      alert("Login successful!");
      navigate("/products");
    } catch (error) {
      alert( "Invalid Username or Password");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-row items-center justify-center min-h-screen font-inter">
      {/* Left image section */}
      <div className="w-[60%] h-full bg-[yellow] lg:flex hidden">
        <img src={loginImg} alt="Login" className="w-full" />
      </div>

      {/* Right content section */}
      <div className="lg:w-[40%] w-full h-full flex flex-col lg:gap-12 gap-6 lg:items-center items-start 
                      justify-between lg:justify-center lg:px-0 px-5 pt-6 lg:pt-0 pb-[200px] lg:pb-0 relative">

        {/* ---- Top content ---- */}
        <div className="flex flex-col gap-6 lg:gap-12 w-full lg:w-[80%]">
          <div className="flex flex-col gap-2 lg:items-center lg:justify-center">
            <img
              src={welcomeback}
              alt="welcomeback"
              className="w-[150px] sm:w-[200px] lg:w-auto lg:max-w-none object-contain"
            />
            <span className="text-base sm:text-lg lg:text-center text-left font-[450] text-[#9E9E9E]">
              Please Login your Account
            </span>
          </div>

          <form id="loginForm" onSubmit={handleSubmit(onLogin)} className="flex flex-col gap-4">
            {/* Email */}
            <div className="flex flex-col gap-3">
              <span className="text-sm sm:text-lg font-[450] text-left">Email</span>
              <input
                type="email"
                {...register("email")}
                className="h-[48px] sm:h-[54px] w-full border-2 border-[#9E9E9E] rounded-2xl p-4 sm:p-5"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-3">
              <span className="text-sm sm:text-lg font-[450] text-left">Password</span>
              <input
                type="password"
                {...register("password")}
                className="h-[48px] sm:h-[54px] w-full border-2 border-[#9E9E9E] rounded-2xl p-4 sm:p-5"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>

            <span className="text-right font-[650] text-sm sm:text-base cursor-pointer">
              Forgot Password?
            </span>
          </form>
        </div>

        {/* ---- Bottom ---- */}
        <div
          className="flex flex-col lg:gap-6 gap-4 lg:w-[80%] w-full 
                     lg:static fixed bottom-0 left-0 px-5 lg:px-0 
                     bg-white lg:bg-transparent pb-4 lg:pb-0"
        >
          {/* Sign in button */}
          <button
            type="submit"
            form="loginForm"
            className="h-[48px] sm:h-[54px] w-full bg-black rounded-2xl 
                       flex justify-center items-center text-white 
                       font-[650] text-sm sm:text-base cursor-pointer"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {/* OR divider */}
          <div className="flex flex-row gap-3 sm:gap-5 justify-center items-center">
            <ul className="w-[15%] sm:w-[10%] border border-[#9E9E9E]" />
            <span className="text-sm sm:text-base font-[400] text-[#9E9E9E]">
              OR
            </span>
            <ul className="w-[15%] sm:w-[10%] border border-[#9E9E9E]" />
          </div>

          {/* Sign-up section */}
          <div className="flex flex-row items-center justify-center gap-1 sm:gap-2">
            <span className="text-sm sm:text-lg font-[400] text-[#9E9E9E]">
              Didn’t have an Account!?
            </span>
            <span
              onClick={() => navigate("/signup")}
              className="font-[650] text-sm sm:text-base cursor-pointer hover:underline"
            >
              Sign-up
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
