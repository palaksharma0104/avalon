import { useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      const uString = `${user.user.name}(${user.user.username})`;
      console.log(uString);

      const response = await axios.post(
        "http://localhost:5000/api/saveblog",
        { title, content, author: uString },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Blog created successfully!");
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error creating blog:", error);
      setError("Failed to create blog. Please try again.");
    }
  };

  return (
    <div className="p-6 mt-16 mx-80">
      <h1 className="text-2xl font-bold mb-4">Create a Blog</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {success && <p className="text-green-500 mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-lg"
        />
        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded-lg"
          rows={10}
        ></textarea>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Post Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
