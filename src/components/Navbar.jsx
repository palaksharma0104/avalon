import { useState, useEffect } from "react";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Function to check if screen is mobile size
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768); // Assuming mobile width is <= 768px
    };

    // Initial check
    checkMobile();

    // Add event listener to detect window resize
    window.addEventListener("resize", checkMobile);

    // Cleanup listener on unmount
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
      } bg-black`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
        {/* Left Section - Logo */}
        <div className="flex items-center">
          <img
            className="h-8 w-8"
            src="https://cdn-icons-png.flaticon.com/512/2111/2111425.png" // Replace with your logo
            alt="Logo"
          />
          <span className="ml-3 text-xl font-semibold text-red-600">Pinterest</span>
        </div>

        {/* Center Section - Links */}
        <div className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-900 hover:text-gray-600">
            Today
          </a>
          <a href="#" className="text-gray-900 hover:text-gray-600">
            Watch
          </a>
          <a href="#" className="text-gray-900 hover:text-gray-600">
            Explore
          </a>
        </div>

        {/* Right Section - Buttons */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-900 hover:text-gray-600">
            About
          </a>
          <a href="#" className="text-gray-900 hover:text-gray-600">
            Business
          </a>
          <a href="#" className="text-gray-900 hover:text-gray-600">
            Blog
          </a>
          <button className="px-4 py-2 bg-red-600 text-white rounded-full hover:bg-red-500">
            Log in
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-900 rounded-full hover:bg-gray-300">
            Sign up
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
