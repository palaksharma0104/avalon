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
      const uString = user.user.id;
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
    <div className="p-6 mt-28 px-80 flex flex-col">
      <h1 className="text-2xl text-rose-200 font-bold mb-10 mx-auto">
        Create a Blog
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-sm bg-slate-300 placeholder:text-slate-400"
        />
        <textarea
          placeholder="Write your content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full p-2 border rounded-sm bg-slate-300 placeholder:text-slate-400"
          rows={10}
        ></textarea>
        {error && <p className="text-red-500 mb-4 mx-auto">{error}</p>}
        {success && <p className="text-green-500 mb-4 mx-auto">{success}</p>}
        <button
          type="submit"
          className="bg-rose-500 hover:bg-rose-700 transition text-white px-4 py-2 rounded-sm mx-auto"
        >
          Post Blog
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;
