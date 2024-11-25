import { useRef, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [value, setValue] = useState("");

  const quill = useRef(null);

  const toolbarOptions = [
    ["bold", "italic", "underline", "strike"],
    ["blockquote", "code-block"],
    ["link", "image"],

    [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
    [{ script: "sub" }, { script: "super" }], // superscript/subscript

    [{ header: [1, 2, 3, 4, 5, 6, false] }],

    [{ color: [] }, { background: [] }], // dropdown with defaults from theme
    [{ font: [] }],
    [{ align: [] }],
  ];

  const module = {
    toolbar: toolbarOptions,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const user = jwtDecode(token);
      const uString = user.user.id;
      console.log(value);

      const response = await axios.post(
        "http://localhost:5000/api/saveblog",
        { title, content: value, author: uString },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setSuccess("Blog created successfully!");
      setTitle("");
      setValue("");
    } catch (error) {
      console.error("Error creating blog:", error);
      setError(
        error.response.data.message ||
          "Failed to create blog. Please try again."
      );
    }
  };

  return (
    <>
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
            className="w-full p-2 px-4 font-semibold text-2xl border rounded-sm bg-slate-300 placeholder:text-slate-400"
          />
          <ReactQuill
            modules={module}
            theme="snow"
            value={value}
            onChange={(e) => {
              setValue(e);
            }}
            className="p-2  border rounded-sm bg-slate-300"
          />
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
    </>
  );
};

export default CreateBlogPage;
