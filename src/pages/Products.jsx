import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import headerImg from "../assets/Products/header.png";
import wishlist from "../assets/Products/heart.png";
import star from "../assets/Products/star1.png";
import Footer from "../components/Footer";

function Products() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Fetch products from API
  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Reset to page 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Filter by title (case-insensitive)
  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchQuery.trim().toLowerCase())
  );

  // Pagination calculations
  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen flex flex-col gap-6 sm:gap-8 font-inter">
      <Navbar />

      {/* Page content wrapper */}
      <div className="flex flex-col gap-6 sm:gap-8 lg:px-12 md:px-8 px-4">


        {/* Header banner */}
        <img
          src={headerImg}
          alt="headerImg"
          className="rounded-lg w-full object-cover max-h-[220px] sm:max-h-[280px] md:max-h-[350px]"
        />

        {/* Search */}
        <div className="flex justify-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by title..."
            className="w-full max-w-xl h-10 xs:h-11 sm:h-12 border-2 border-[#D0D5DD] rounded-2xl px-3 sm:px-4 text-sm sm:text-base"
          />
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-6 mt-4 sm:mt-6 md:mt-8 pb-6">
          {currentProducts.map((product) => (
            <div
              key={product.id}
              className="w-full flex flex-col rounded-2xl shadow border border-[#F7F5F7] bg-white"
            >
              {/* Image Section */}
              <div className="relative w-full h-[160px] sm:h-[200px] md:h-[220px] lg:h-[250px] bg-[#F7F5F7] flex justify-center items-center rounded-t-2xl p-2 sm:p-4">
                <img
                  src={product.image}
                  alt={product.title}
                  className="max-h-[100px] sm:max-h-[150px] md:max-h-[180px] lg:max-h-[200px] object-contain"
                />
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-8 sm:w-9 md:w-10 h-8 sm:h-9 md:h-10 rounded-full bg-white flex justify-center items-center shadow">
                  <img src={wishlist} alt="wishlist" className="w-3 sm:w-4" />
                </div>
              </div>

              {/* Details Section */}
              <div className="flex flex-col p-2 sm:p-4 gap-2 sm:gap-3 flex-grow">
                {/* Title + Price */}
                <div className="flex justify-between items-center gap-2">
                  <span className="flex-1 text-[11px] sm:text-sm md:text-base text-left font-medium text-[#667085] truncate">
                    {product.title}
                  </span>
                  <span className="text-xs sm:text-sm md:text-lg font-bold whitespace-nowrap">
                    ₹ {product.price}
                  </span>
                </div>

                {/* Description */}
                <span className="text-left text-[#98A2B3] text-[10px] sm:text-xs md:text-sm line-clamp-2">
                  {product.description}
                </span>

                {/* Ratings */}
                <div className="flex items-center gap-1 sm:gap-2 text-[10px] sm:text-xs md:text-sm text-[#98A2B3]">
                  <div className="flex items-center gap-1">
                    <img src={star} alt="star" className="w-3 sm:w-4 h-3 sm:h-4" />
                    <span>{product.rating.rate}</span>
                  </div>
                  <span>({product.rating.count})</span>
                </div>

                {/* Buttons */}
                <div className="flex flex-row gap-2 sm:gap-3 mt-auto">
                  <button className="flex-1 bg-[#3A4980] font-semibold text-[10px] sm:text-xs md:text-sm text-white h-[26px] sm:h-[32px] md:h-[36px] rounded-2xl flex justify-center items-center">
                    Add To Cart
                  </button>
                  <button className="flex-1 border-2 border-[#D0D5DD] font-semibold text-[10px] sm:text-xs md:text-sm h-[26px] sm:h-[32px] md:h-[36px] rounded-2xl flex justify-center items-center">
                    Add Shortlist
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-4 my-6 sm:my-8">
          {/* Previous */}
          <button
            className={`px-4 sm:px-5 md:px-6 h-9 sm:h-10 border-2 flex justify-center items-center text-xs sm:text-sm font-[400] ${currentPage === 1
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-[#F3F3F3] text-[#667085]"
              }`}
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 sm:w-10 sm:h-10 flex justify-center items-center text-xs sm:text-sm font-[400] rounded-md ${currentPage === page
                ? "bg-[#F4E8F3] text-black border-none"
                : "border-2 border-[#F3F3F3] text-[#667085]"
                }`}
            >
              {page}
            </button>
          ))}

          {/* Next */}
          <button
            className={`px-4 sm:px-5 md:px-6 h-9 sm:h-10 border-2 flex justify-center items-center text-xs sm:text-sm font-[400] ${currentPage === totalPages
              ? "border-gray-200 text-gray-400 cursor-not-allowed"
              : "border-[#F3F3F3] text-[#667085]"
              }`}
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <div className="lg:mt-12 mt-6">
        <Footer />

      </div>
    </div>
  );
}

export default Products;
