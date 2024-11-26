import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
  });
  const [newUsername, setNewUsername] = useState("");
  const [showEditUsername, setShowEditUsername] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch user data on component mount
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
    }

    const token = localStorage.getItem("token");
    const user = jwtDecode(token);

    axios
      .post("http://localhost:5000/api/auth/profile", {
        username: user.user.username,
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to fetch user data");
      });
  }, []);

  const handleUsernameChange = (e) => {
    e.preventDefault();
    if (newUsername === "") {
      setError("Username cannot be empty");
      return;
    }

    axios
      .post("http://localhost:5000/api/auth/updateUsername", {
        username: userData.username,
        newusername: newUsername,
      })
      .then((response) => {
        setUserData((prevState) => ({
          ...prevState,
          username: newUsername,
        }));
        setError("");
        setShowEditUsername(false);
        localStorage.removeItem("token");

        localStorage.setItem("token", response.data.token);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        setError(error.response.data.message || "Failed to update username");
      });
  };

  return (
    <>
      <div className="mx-56 my-44 mt-24 relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 overflow-hidden">
        {/* Blurred Shapes */}
        <div className="absolute w-72 h-72 bg-purple-400 opacity-30 blur-3xl rounded-full -top-10 -left-10"></div>
        <div className="absolute w-80 h-80 bg-pink-400 opacity-30 blur-3xl rounded-full top-10 right-10"></div>
        <div className="absolute w-96 h-96 bg-red-400 opacity-30 blur-3xl rounded-full bottom-20 left-20"></div>

        {/* Glassmorphed Card */}
        <div className="relative bg-white bg-opacity-10 backdrop-blur-md p-6 rounded-lg shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-rose-950 text-center">
            Hi, You!
          </h1>
          <div className="text-slate-900 text-center">
            <p className="mb-2">
              <strong className="text-rose-900">
                We call you
                <br />
              </strong>{" "}
              {userData.name}
            </p>
            <p className="mb-2">
              <strong className="text-rose-900">
                Your electronic mail
                <br />
              </strong>{" "}
              {userData.email}
            </p>
            <p className="mb-4">
              <strong className="text-rose-900">
                Your unique username
                <br />
              </strong>{" "}
              {userData.username}
              <button
                onClick={() => setShowEditUsername(!showEditUsername)}
                className="ml-4 text-sm text-red-100 transition hover:text-red-900 underline"
              >
                Edit
              </button>
            </p>
          </div>

          {/* Edit Username Form */}
          {showEditUsername && (
            <form
              onSubmit={handleUsernameChange}
              className="w-full flex flex-col items-center"
            >
              <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                className="border border-gray-300 px-4 py-2 rounded-sm w-3/4 bg-opacity-70 bg-rose-300 mb-4  text-slate-100 border-none outline-none placeholder:text-gray-300"
                placeholder="Enter new username"
              />
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <button
                type="submit"
                className="bg-rose-500 text-white px-4 py-2 rounded-sm hover:bg-rose-600 transition"
              >
                Update
              </button>
            </form>
          )}
        </div>
      </div>
      <Footer classe="bg-slate-800" />
    </>
  );
};

export default ProfilePage;
