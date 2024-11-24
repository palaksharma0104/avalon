// src/pages/ProfilePage.js
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

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
    console.log(user);

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
    <div className="container flex flex-col mt-28 p-4">
      <h1 className="text-2xl font-bold mb-4 mx-auto">Profile Page</h1>
      <div className="bg-white p-6 mx-auto h-96 flex flex-col rounded-md shadow-md">
        <p className="mx-auto mb-2">
          <strong>Name: </strong> {userData.name}
        </p>
        <p className="mx-auto mb-2">
          <strong>Email: </strong> {userData.email}
        </p>
        <p className="mx-auto mb-4">
          <strong>Username: </strong> {userData.username}
          <button
            onClick={() => setShowEditUsername(!showEditUsername)}
            className="ml-4 text-blue-500 underline"
          >
            Edit
          </button>
        </p>

        {showEditUsername && (
          <form
            onSubmit={handleUsernameChange}
            className="w-40 flex flex-col mx-auto"
          >
            <input
              type="text"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              className="border px-2 py-1 w-full mb-2 rounded-md"
              placeholder="Enter new username"
            />

            {error && (
              <p className="text-red-500 text-sm text-center mb-1">{error}</p>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white px-2 py-1 mx-auto rounded-md"
            >
              Update
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
