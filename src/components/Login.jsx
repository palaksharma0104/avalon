import React, { useEffect } from "react";
import { jwtDecode } from "jwt-decode";

function Login() {
  function handleCallbackResponse(response) {
    console.log("Encoded JWT ID toke: " + response.credential);
    var uObj = jwtDecode(response.credential);
    console.log(uObj);
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
      <div
        id="login-popup"
        tabindex="-1"
        class="bg-black/50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 h-full items-center justify-center flex"
      >
        <div class="relative p-4 w-full max-w-md h-full md:h-auto">
          <div class="relative bg-white rounded-lg shadow">
            <button
              type="button"
              class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
            >
              <svg
                aria-hidden="true"
                class="w-5 h-5"
                fill="#c6c7c7"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  cliprule="evenodd"
                ></path>
              </svg>
              <span class="sr-only">Close popup</span>
            </button>

            <div class="p-5">
              <h3 class="text-2xl mb-0.5 font-medium"></h3>
              <p class="mb-4 text-sm font-normal text-gray-800"></p>

              <div class="text-center">
                <p class="mb-3 text-2xl font-semibold leading-5 text-slate-900">
                  Login to your account
                </p>
              </div>

              <div class="mt-7 flex flex-col gap-2 content-center">
                {/* <button class="inline-flex h-10 w-full items-center justify-center gap-2 rounded border border-slate-300 bg-white p-2 text-sm font-medium text-black outline-none focus:ring-2 focus:ring-[#333] focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-60">
                  <img
                    src="https://www.svgrepo.com/show/475656/google-color.svg"
                    alt="Google"
                    class="h-[18px] w-[18px] "
                  />
                  Continue with Google
                </button> */}

                <div id="signInDiv" className="mx-auto mt-5"></div>
              </div>

              <div class="flex w-full items-center gap-2 py-6 text-sm text-slate-600">
                <div class="h-px w-full bg-slate-200"></div>
                OR
                <div class="h-px w-full bg-slate-200"></div>
              </div>

              <form class="w-full">
                <label for="email" class="sr-only">
                  Email address
                </label>
                <input
                  name="email"
                  type="email"
                  autocomplete="email"
                  required=""
                  class="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Email Address"
                  value=""
                />
                <label for="password" class="sr-only">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  autocomplete="current-password"
                  required=""
                  class="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-black focus:ring-offset-1"
                  placeholder="Password"
                  value=""
                />
                <p class="mb-3 mt-2 text-sm text-gray-500">
                  <a
                    href="/forgot-password"
                    class="text-blue-800 hover:text-blue-600"
                  >
                    Reset your password?
                  </a>
                </p>
                <button
                  type="submit"
                  class="inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none focus:ring-2 focus:ring-black focus:ring-offset-1 disabled:bg-gray-400"
                >
                  Continue
                </button>
              </form>

              <div class="mt-6 text-center text-sm text-slate-600">
                Don't have an account?
                <a href="/signup" class="font-medium text-[#4285f4]">
                  Sign up
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
