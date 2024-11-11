// src/pages/ProfilePage.js
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ProfilePage = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    username: "",
  });
  const [newUsername, setNewUsername] = useState("");
  const [error, setError] = useState("");

  // Fetch user data on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    if (token) {
      console.log(user.user.username);
    }

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
      .put("http://localhost:5000/api/auth/updateUsername", {
        username: userData.username,
        newusername: newUsername,
      })
      .then((response) => {
        setUserData((prevState) => ({
          ...prevState,
          username: newUsername,
        }));
        setError("");
      })
      .catch((error) => {
        console.error(error);
        setError("Failed to update username");
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Profile Page</h1>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <p className="mb-2">
          <strong>Name:</strong> {userData.name}
        </p>
        <p className="mb-2">
          <strong>Email:</strong> {userData.email}
        </p>
        <p className="mb-4">
          <strong>Username:</strong> {userData.username}
        </p>

        <form onSubmit={handleUsernameChange}>
          <label className="block mb-2 text-sm">New Username:</label>
          <input
            type="text"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            className="border px-4 py-2 w-full mb-4 rounded-md"
            placeholder="Enter new username"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Update Username
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
