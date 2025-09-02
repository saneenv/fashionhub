import React,{useEffect} from "react";
import SignupImg from "../assets/Signup/signup.png";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="flex flex-row items-center justify-center min-h-screen font-inter">
      {/* Left image section (desktop only) */}
      <div className="w-[60%] h-full bg-[yellow] lg:flex hidden">
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
          <div className="flex flex-col gap-4">
            {/* Full Name */}
            <div className="flex flex-col gap-2">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-left">Full Name</span>
              <input
                type="text"
                className="h-[44px] sm:h-[50px] lg:h-[54px] w-full border-2 border-[#9E9E9E] rounded-xl p-3 sm:p-4"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col gap-2">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-left">Email</span>
              <input
                type="text"
                className="h-[44px] sm:h-[50px] lg:h-[54px] w-full border-2 border-[#9E9E9E] rounded-xl p-3 sm:p-4"
              />
            </div>

            {/* Date Field */}
            <div className="flex flex-col gap-2">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-left">Date Field</span>
              <input
                type="date"
                className="h-[44px] sm:h-[50px] lg:h-[54px] w-full border-2 border-[#9E9E9E] rounded-xl p-3 sm:p-4"
              />
            </div>

            {/* Mobile */}
            <div className="flex flex-col gap-2">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-left">Mobile</span>
              <input
                type="tel"
                className="h-[44px] sm:h-[50px] lg:h-[54px] w-full border-2 border-[#9E9E9E] rounded-xl p-3 sm:p-4"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <span className="text-sm sm:text-base lg:text-lg font-medium text-left">Password</span>
              <input
                type="password"
                className="h-[44px] sm:h-[50px] lg:h-[54px] w-full border-2 border-[#9E9E9E] rounded-xl p-3 sm:p-4"
              />
            </div>
          </div>
        </div>

        {/* ---- Bottom section (fixed on mobile/tablet) ---- */}
        <div
          className="flex flex-col lg:gap-6 gap-4 lg:w-[80%] w-full 
          lg:static fixed bottom-0 left-0 px-5 lg:px-0 
          bg-white lg:bg-transparent pb-4 lg:pb-0"
        >
          {/* Create Account button */}
          <div
            className="h-[44px] sm:h-[50px] lg:h-[54px] w-full bg-black rounded-xl 
            flex justify-center items-center text-white 
            font-semibold text-sm sm:text-base cursor-pointer"
          >
            Create Account
          </div>

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
