import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Signup({ closeSignup }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const res = await axios.post("http://localhost:5000/api/auth/signup", {
        email,
        name,
        username,
        password,
      });
      setToken(res);
      window.location.reload();
    } catch (err) {
      setErr(err.response.data.message);
      console.log(err.response.data.message);
    }
  };

  const gSubmit = async (em, na, us, pa) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/o-auth", {
        email: em,
        name: na,
        username: us,
        password: pa,
      });
      setToken(res);
      window.location.reload();
    } catch (err) {
      setErr(err.response.data.message);
      console.log(err.response.data.message);
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
    await gSubmit(uObj.email, uObj.name, uObj.email, uObj.sub);
  }

  useEffect(() => {
    google.accounts.id.initialize({
      client_id:
        "1080942825048-5cu5are3agqqndnuf309fjrlkqsffdvm.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <>
      <div
        id="signup-popup"
        tabIndex="-1"
        className={`bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex`}
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
              onClick={closeSignup} // Call the closeSignup function when clicked
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="#c6c7c7"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close popup</span>
            </button>

            <div className="p-5">
              <div className="text-center">
                <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                  Create your account
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-2 content-center">
                <div id="signUpDiv" className="mx-auto mt-5"></div>
              </div>

              <div className="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                <div className="h-px w-full bg-slate-200"></div>
                OR
                <div className="h-px w-full bg-slate-200"></div>
              </div>

              <form className="w-full">
                <label htmlFor="name" className="sr-only">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  autoComplete="name"
                  required=""
                  className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />

                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  name="username"
                  type="text"
                  autoComplete="username"
                  required=""
                  className="my-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />

                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required=""
                  className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
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
                  autoComplete="new-password"
                  required=""
                  className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <label htmlFor="confirm-password" className="sr-only">
                  Confirm Password
                </label>
                <input
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required=""
                  className="my-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
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
                  Sign Up
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="mt-3 text-sm">
                  Already have an account?{" "}
                  <a href="#" className="text-blue-800 hover:text-blue-600">
                    Log in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
