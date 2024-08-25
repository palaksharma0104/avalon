import background from "../assets/mb-bg.jpg"

function MobileHome() {
    return (
      <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: `url(${background})` }}>
        {/* Background Image Grid */}
        {/* <div className="absolute inset-0 grid grid-cols-3 gap-1">
          
          <div className="bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}></div>
          <div className="bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}></div>
          <div className="bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}></div>
          
        </div> */}
  
        {/* Welcome Content */}
        <div className="absolute z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-60">
          {/* Logo */}
          <img
            className="h-12 w-12 mb-4"
            src="https://cdn-icons-png.flaticon.com/512/2111/2111425.png" // Replace with your logo
            alt="Pinterest Logo"
          />
  
          {/* Welcome Text */}
          <h1 className="text-white text-2xl font-bold mb-6">Welcome to Avalon</h1>
  
          {/* Buttons */}
          <button className="w-4/5 bg-amber-500 text-white text-lg py-2 rounded-full mb-4 hover:bg-amber-600">
            Sign Up with email
          </button>
          {/* <button className="w-4/5 bg-white text-gray-700 text-lg py-2 rounded-full flex items-center justify-center hover:bg-gray-200">
            <img
              className="h-5 w-5 mr-2"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
              alt="Google"
            />
            Continue with Google
          </button> */}
  
          {/* Log In Link */}
          <div className="text-white mt-4">
            <p>
              Already a member?{" "}
              <a href="#" className="underline hover:text-gray-300">
                Log in
              </a>
            </p>
          </div>
  
          {/* Privacy Policy */}
          <div className="text-gray-400 text-xs mt-6 px-4 text-center">
            <p>
              By Signing Up, you agree to Avalon's{" "}
              <a href="#" className="underline hover:text-white">
                Terms of Service
              </a>{" "}
              and acknowledge you've read our{" "}
              <a href="#" className="underline hover:text-white">
                Privacy Policy
              </a>.
            </p>
            <p>Notice at collection.</p>
          </div>
        </div>
      </div>
    );
  }
  
  export default MobileHome;
  