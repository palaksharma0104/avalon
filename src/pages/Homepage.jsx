import { useState, useEffect } from "react";
import React from "react";
import Footer from "../components/Footer";
import Signup from "../components/Signup";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/Lamp";

function Homepage() {
  const [showSignup, setShowSignup] = useState(false);
  const handleCloseSignup = () => {
    setShowSignup(false);
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const res = await axios.post("http://localhost:5000/api/auth/signin", {
        email,
        password,
      });

      setToken(res);
      window.location.reload();
    } catch (err) {
      if (!err.response) {
        setErr("Server can't be reached at the moment.");
      } else {
        setErr(
          err.response.data.message ||
            "An error occurred while processing your request."
        );
      }
    }
  };

  const gSubmit = async (na, em, pass) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/o-auth", {
        name: na,
        username: em,
        email: em,
        password: pass,
      });

      console.log(res);
      setToken(res);
      window.location.reload();
    } catch (err) {
      if (!err.response) {
        setErr("Server can't be reached at the moment.");
      } else {
        setErr(
          err.response.data.message ||
            "An error occurred while processing your request."
        );
      }
    }
  };

  // Set token
  const setToken = (res) => {
    try {
      const token = res.data.token;
      localStorage.setItem("token", token);
    } catch (e) {
      console.log(e);
    }
  };

  async function handleCallbackResponse(response) {
    var uObj = jwtDecode(response.credential);
    console.log(uObj);
    await gSubmit(uObj.name, uObj.email, uObj.sub);
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "1080942825048-5cu5are3agqqndnuf309fjrlkqsffdvm.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signInDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <>
      <div className="bg-slate-950 pb-32">
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            Welcome to <span className="text-rose-500">Avalon</span>
            <br />
            <span className="text-sm tracking-normal mx-20 mt-1">
              A cozy corner of the internet where stories meet creativity. Share
              your blogs, connect with like-minded people, and create your own
              unique journey.
            </span>
          </motion.h1>
        </LampContainer>
        <div>{showSignup && <Signup closeSignup={handleCloseSignup} />}</div>

        <div className="relative bg-rose-500 backdrop-blur-lg bg-opacity-20  w-1/3 mx-auto rounded-sm px-10 py-5 -mt-56 ">
          <div className="p-5">
            <h3 className="text-2xl mb-0.5 font-medium"></h3>
            <p className="mb-4 text-sm font-normal text-gray-800"></p>

            <form className="w-full flex flex-col">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required=""
                className="block w-full rounded-sm border bg-opacity-20 bg-slate-500  focus:bg-rose-300 transition duration-2 ease-in-out border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-200 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required=""
                className="mt-2 block w-full rounded-sm border bg-opacity-20 bg-slate-500  focus:bg-rose-300 transition duration-2 ease-in-out border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-200 focus:ring-2 focus:ring-black focus:ring-offset-1"
                placeholder="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              {err && (
                <div className="mt-4 text-red-600 text-sm text-center">
                  {err}
                </div>
              )}
              <button
                type="submit"
                className="mt-5 inline-flex w-3/4 mx-auto items-center hover:bg-rose-700 transition justify-center rounded-sm bg-rose-950 p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                onClick={handleSubmit}
              >
                Log in
              </button>
            </form>
            <div className="flex w-full items-center gap-2 py-6 text-sm text-rose-200">
              <div className="h-px w-full bg-rose-200"></div>
              OR
              <div className="h-px w-full bg-rose-200"></div>
            </div>
            <div className=" flex flex-col gap-2 content-center">
              <div id="signInDiv" className="mx-auto bg-slate-500"></div>
            </div>

            <div className="mt-6 text-center">
              <p className="mt-3 text-sm text-rose-200">
                Don't have an account?{" "}
                <a
                  onClick={() => {
                    setShowSignup(true);
                  }}
                  className="text-rose-800 hover:text-rose-600 cursor-pointer"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer classe="bg-slate-900" />
    </>
  );

  return (
    <>
      <LampContainer>
        <div className="flex flex-col items-center px-20 pt-20">
          {/* Hero Section */}
          <header className="flex flex-col-reverse md:flex-row items-center mt-10 px-8 md:px-20 text-center md:text-left">
            <div className="md:w-1/2">
              <h1 className="text-4xl md:text-6xl font-bold text-[#6d28d9] leading-tight">
                Welcome to <span className="text-[#9b59b6]">Avalon</span>
              </h1>
              <p className="mt-4 text-lg md:text-xl text-[#8b5cf6]">
                A cozy corner of the internet where stories meet creativity.
                Share your blogs, connect with like-minded people, and create
                your own unique journey.
              </p>
              <p className="mt-2 text-[#6d28d9]">
                Avalon is not just a platform. It's a vibe.
              </p>

              <div className="relative bg-white w-3/5 my-12 mx-auto rounded-lg shadow">
                <div className="p-5">
                  <h3 className="text-2xl mb-0.5 font-medium"></h3>
                  <p className="mb-4 text-sm font-normal text-gray-800"></p>

                  <div className="text-center">
                    <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                      Login to your account
                    </p>
                  </div>

                  <form className="w-full">
                    <label htmlFor="email" className="sr-only">
                      Email address
                    </label>
                    <input
                      name="email"
                      type="email"
                      autoComplete="email"
                      required=""
                      className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                      placeholder="Email Address"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required=""
                      className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                    <p className="mb-3 mt-2 text-xs text-gray-500">
                      <a
                        href="/forgot-password"
                        className="text-blue-800 hover:text-blue-600"
                      >
                        Reset your password?
                      </a>
                    </p>
                    {err && (
                      <div className="mb-4 text-red-600 text-sm text-center">
                        {err}
                      </div>
                    )}
                    <button
                      type="submit"
                      className="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                      onClick={handleSubmit}
                    >
                      Continue
                    </button>
                  </form>
                  <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                    <div className="h-px w-full bg-slate-200"></div>
                    OR
                    <div className="h-px w-full bg-slate-200"></div>
                  </div>
                  <div className="mt- flex flex-col gap-2 content-center">
                    <div id="signInDiv" className="mx-auto mt-5"></div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="mt-3 text-sm">
                      Don't have an account?{" "}
                      <a
                        onClick={() => {
                          setShowSignup(true);
                        }}
                        className="text-blue-800 hover:text-blue-600 cursor-pointer"
                      >
                        Sign up
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src="3.png"
                alt="Illustration"
                className="w-full max-w-md mx-auto"
              />
            </div>
          </header>

          {/* Features Section */}
          <section id="features" className="mt-16 px-8 md:px-20 w-full">
            <h2 className="text-3xl md:text-4xl font-bold text-[#6d28d9] text-center">
              Why Choose Avalon?
            </h2>
            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#ffffffcc] p-6 rounded-lg shadow-md hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-[#9b59b6]">
                  Creative Space
                </h3>
                <p className="mt-2 text-[#6d28d9]">
                  Express your ideas and stories in a welcoming community.
                </p>
              </div>
              <div className="bg-[#ffffffcc] p-6 rounded-lg shadow-md hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-[#9b59b6]">
                  Personalized Feed
                </h3>
                <p className="mt-2 text-[#6d28d9]">
                  Discover blogs tailored to your interests.
                </p>
              </div>
              <div className="bg-[#ffffffcc] p-6 rounded-lg shadow-md hover:shadow-xl transition">
                <h3 className="text-xl font-semibold text-[#9b59b6]">
                  Connect & Collaborate
                </h3>
                <p className="mt-2 text-[#6d28d9]">
                  Meet people who share your passion for storytelling.
                </p>
              </div>
            </div>
          </section>

          <div>{showSignup && <Signup closeSignup={handleCloseSignup} />}</div>
        </div>
        <Footer />
      </LampContainer>
    </>
  );
}

export default Homepage;
