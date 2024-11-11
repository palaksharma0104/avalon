import { useState, useEffect } from "react";
import Login from "./Login";
import Signup from "./Signup";
import "./styles.css";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({ name: "", username: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setLoggedIn(true);
      const user = jwtDecode(token);
      setUser(user.user);
      console.log(user.user.name);
    }
  }, []);

  // Logout
  const logout = () => {
    localStorage.removeItem("token");

    navigate("/");
    window.location.reload();
  };

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  // This function will close the login popup
  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  const handleCloseSignup = () => {
    setShowSignup(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-10 transition-shadow duration-300 ${
          isScrolled ? "shadow-lg" : ""
        } backdrop-blur-xl`}
      >
        <div
          className={`max-w-3xl lg:max-w-7xl mx-auto flex px-12 transition-all duration-200 items-center justify-between ${
            isScrolled ? "h-10" : "h-20"
          }`}
        >
          <div
            className={`flex items-center transition-all duration-4 ${
              isScrolled ? "scale-[60%]" : "scale-100"
            }`}
          >
            <div
              className="title ml-5 hover:scale-110 transition-scale duration-200 ease-in-out"
              onClick={() => {
                navigate("/");
              }}
            >
              <span className="highlight">
                <span className="text text-xl mx-2 mb-1 font-semibold text-amber-600 hover:text-amber-700 cursor-pointer">
                  Avalon
                </span>
              </span>
            </div>
          </div>

          <div
            className={`flex space-x-8 transition-all duration-4 ${
              isScrolled ? "scale-[85%]" : "scale-100"
            }`}
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
          {loggedIn ? (
            <>
              {/* <button onClick={logout}>{user.username}</button> */}
              <ul>
                {/* the dropdown thingy */}
                <li className="group relative">
                  <a
                    href="javascript:void(0)"
                    className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                  >
                    {user.username}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16px"
                      height="16px"
                      className="ml-1 inline-block"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M12 16a1 1 0 0 1-.71-.29l-6-6a1 1 0 0 1 1.42-1.42l5.29 5.3 5.29-5.29a1 1 0 0 1 1.41 1.41l-6 6a1 1 0 0 1-.7.29z"
                        data-name="16"
                        data-original="#000000"
                      />
                    </svg>
                  </a>
                  <ul className="absolute top-5 right-0 z-50 block space-y-2 shadow-lg bg-white max-h-0 overflow-hidden min-w-[250px] group-hover:opacity-100 group-hover:max-h-[700px] px-6 group-hover:pb-4 group-hover:pt-6 transition-all duration-500">
                    <li className="border-b py-3">
                      <a
                        href="javascript:void(0)"
                        className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                      >
                        Hello, {user.name}
                      </a>
                    </li>
                    <li className="border-b py-3">
                      <a
                        href="profile"
                        className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                      >
                        Profile
                      </a>
                    </li>
                    <li className="border-b py-3">
                      <a
                        href="javascript:void(0)"
                        className="hover:text-[#007bff] hover:fill-[#007bff] text-gray-600 font-semibold text-[15px] block"
                        onClick={logout}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink"
                          fill="#000000"
                          height="18px"
                          width="18px"
                          version="1.1"
                          id="Capa_1"
                          viewBox="0 0 384.971 384.971"
                          xml:space="preserve"
                          className="mr-4 inline-block"
                        >
                          <g>
                            <g id="Sign_Out">
                              <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03    C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03    C192.485,366.299,187.095,360.91,180.455,360.91z" />
                              <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279    c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179    c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z" />
                            </g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                            <g></g>
                          </g>
                        </svg>
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </>
          ) : (
            <div
              className={`flex space-x-4 transition-all duration-4 ${
                isScrolled ? "scale-[70%]" : "scale-100"
              }`}
            >
              <button
                onClick={handleLoginClick}
                className="px-4 py-2 items-center bg-[#cfb6eb] text-white rounded-full hover:bg-amber-400 hover:scale-105 hover:shadow-xl transition-all duration-200 ease-in-out"
              >
                Log in
              </button>
              <button
                onClick={() => {
                  setShowSignup(true);
                }}
                className="px-4 py-2 bg-gray-200 text-gray-900 rounded-full hover:bg-gray-300 hover:scale-105 hover:shadow-xl transition-all duration-200 ease-in-out"
              >
                Sign up
              </button>
            </div>
          )}
        </div>
      </nav>
      <div>{showLogin && <Login closeLogin={handleCloseLogin} />}</div>
      <div>{showSignup && <Signup closeSignup={handleCloseSignup} />}</div>
    </>
  );
}

export default Navbar;
