import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; //import navigation hook
import logo from "../assets/Products/navbar/FashionHub.png";
import cart from "../assets/Products/navbar/cart.png";
import { Menu, X } from "lucide-react"; // hamburger and close icons

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate(); // initialize navigator

    const productPage = () => {
        navigate('/products');
        window.location.reload(); // reload  after navigation
    };


    return (
        <div className="w-full h-[70px] md:h-[80px] px-4 sm:px-6 md:px-8 lg:px-12 font-poppins border-b border-[#EDEDED]">
            <div className="flex w-full h-full justify-between items-center">
                {/* Left side (Logo + Links) */}
                <div className="flex items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
                    {/* Logo */}
                    <img
                        onClick={productPage}
                        src={logo}
                        alt="logo"
                        className="w-[90px] sm:w-[100px] md:w-[120px] lg:w-[130px] object-contain cursor-pointer"
                    />

                    {/* Links */}
                    <div className="hidden md:flex flex-row gap-6 lg:gap-12">
                        <span className="text-sm md:text-base lg:text-lg font-[600] text-[#1D364D]">
                            Category
                        </span>
                        <span className="text-sm md:text-base lg:text-lg font-[600] text-[#1D364D]">
                            Brand
                        </span>
                        <span className="text-sm md:text-base lg:text-lg font-[600] text-[#1D364D]">
                            Contact
                        </span>
                        <span className="text-sm md:text-base lg:text-lg font-[600] text-[#1D364D]">
                            FAQ’s
                        </span>
                    </div>
                </div>

                {/* Right side */}
                <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                    {/* Cart */}
                    <div className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] md:w-[45px] md:h-[45px] lg:w-[50px] lg:h-[50px] rounded-full bg-[#F5F1EE] flex justify-center items-center">
                        <img
                            src={cart}
                            alt="cart"
                            className="w-[16px] sm:w-[18px] md:w-[20px] lg:w-[22px] object-contain"
                        />
                    </div>

                    {/* Profile Circle */}
                    {/* Profile Circle */}
                    <div
                        onClick={() => navigate("/profile")}
                        className="w-[36px] h-[36px] sm:w-[40px] sm:h-[40px] md:w-[45px] md:h-[45px] lg:w-[50px] lg:h-[50px] rounded-full bg-[#F5F1EE] flex justify-center items-center cursor-pointer
             text-[#1D364D] font-bold text-sm sm:text-base md:text-lg"
                    >
                        {(() => {
                            const name = "Scarlet Johnson"; // you can replace this with dynamic user name later
                            const initials = name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase();
                            return initials;
                        })()}
                    </div>

                    {/* Profile Text (clickable) */}
                    <div
                        onClick={() => navigate("/profile")}
                        className="hidden md:flex flex-col text-left cursor-pointer px-2 py-1 rounded-md transition duration-300
             hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white hover:shadow-lg"
                    >
                        <span className="text-xs sm:text-sm md:text-base font-[400] text-[#C0C3C6]">
                            Good Morning!
                        </span>
                        <span className="text-sm sm:text-base md:text-lg font-[600]">
                            Scarlet Johnson
                        </span>
                    </div>


                    {/* Hamburger Menu (mobile only) */}
                    <button
                        className="md:hidden flex items-center"
                        onClick={() => setIsOpen(true)}
                    >
                        <Menu className="w-7 h-7 text-[#1D364D]" />
                    </button>
                </div>
            </div>

            {/* Mobile Drawer */}
            {isOpen && (
                <div className="fixed top-0 right-0 w-[70%] h-full bg-white shadow-lg z-50 flex flex-col p-6 transition-transform">
                    {/* Close Button */}
                    <button className="self-end mb-6" onClick={() => setIsOpen(false)}>
                        <X className="w-7 h-7 text-[#1D364D]" />
                    </button>

                    {/* Drawer Links */}
                    <div className="flex flex-col gap-6 text-left">
                        <span className="text-lg font-[600] text-[#1D364D]">Category</span>
                        <span className="text-lg font-[600] text-[#1D364D]">Brand</span>
                        <span className="text-lg font-[600] text-[#1D364D]">Contact</span>
                        <span className="text-lg font-[600] text-[#1D364D]">FAQ’s</span>

                        {/* Profile link */}
                        <span
                            onClick={() => {
                                navigate("/profile");
                                setIsOpen(false); // close drawer
                            }}
                            className="text-lg font-[600] text-[#1D364D] cursor-pointer transition hover:bg-gradient-to-r hover:from-pink-500 hover:to-purple-600 hover:text-white px-3 py-2 rounded-md"
                        >
                            Profile
                        </span>
                    </div>

                </div>
            )}
        </div>
    );
}

export default Navbar;  