import { useState, useEffect } from "react";
import React from "react";
import Footer from "../components/Footer";
import Signup from "../components/Signup";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { motion } from "framer-motion";
import { LampContainer } from "../components/ui/lamp";

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

        <div className="animate-appear relative bg-rose-500 backdrop-blur-lg bg-opacity-20  w-1/3 mx-auto rounded-sm px-10 py-5 -mt-56 ">
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
}

export default Homepage;
