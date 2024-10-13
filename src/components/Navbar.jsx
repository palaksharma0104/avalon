import { useState, useEffect } from "react";
import "./styles.css";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-10 transition-shadow duration-300 ${
        isScrolled ? "shadow-lg" : ""
      } backdrop-blur-xl`}
    >
      <div
        className={`max-w-3xl lg:max-w-7xl mx-auto flex transition-all duration-200 items-center justify-between ${
          isScrolled ? "h-10" : "h-20"
        }`}
      >
        {/* Left Section - Logo */}
        <div
          className={`flex items-center transition-all duration-4 ${
            isScrolled ? "scale-[60%]" : "scale-100"
          }`}
        >
          {/* <img
                    className="h-8 w-8"
                    src="https://cdn-icons-png.flaticon.com/512/2111/2111425.png"
                    alt="Logo"
                /> */}

          <div className="title ml-5 hover:scale-110 transition-scale duration-200 ease-in-out">
            <span className="highlight">
              <span className="text text-xl mx-2 mb-1 font-semibold text-amber-600 hover:text-amber-700 cursor-pointer">
                Avalon
              </span>
            </span>
          </div>
        </div>

        {/* Center Section - Links */}
        <div
          className={`flex space-x-8 ${isScrolled ? "scale-40" : "scale-100"}`}
        >
          <a
            href="#"
            className="text-gray-900 hover:text-gray-600 hover:font-bold transition-all duration-200 ease-in-out"
          >
            Today
          </a>
          <a
            href="#"
            className="text-gray-900 hover:text-gray-600 hover:font-bold transition-all duration-200 ease-in-out"
          >
            Explore
          </a>
          <a
            href="#"
            className="text-gray-900 hover:text-gray-600 hover:font-bold transition-all duration-200 ease-in-out"
          >
            About
          </a>
        </div>

        {/* Login / SignUp */}
        <div
          className={`flex space-x-4 transition-all duration-4 ${
            isScrolled ? "scale-[70%]" : "scale-100"
          }`}
        >
          <button className="px-4 py-2 items-center bg-[#cfb6eb] text-white rounded-full hover:bg-amber-400 hover:scale-105 hover:shadow-xl transition-all duration-200 ease-in-out">
            Log in
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-900 rounded-full hover:bg-gray-300 hover:scale-105 hover:shadow-xl transition-all duration-200 ease-in-out">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
