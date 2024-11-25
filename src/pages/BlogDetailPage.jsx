import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const BlogDetailPage = () => {
  const { id } = useParams(); // Extract the blog ID from the URL
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  const module = {
    toolbar: [],
  };

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blogs/${id}`
        );
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <div>Loading blog...</div>;

  if (!blog) return <div>Blog not found.</div>;

  return (
    <div className="flex flex-col p-6 mt-28 px-52">
      <h1 className="text-3xl mx-auto font-bold mb-4 text-slate-300">
        {blog.title}
      </h1>
      <p className="text-gray-400 mx-auto mb-4 text-center">
        By: {`${blog.author.name} (${blog.author.username})`} <br />
        Posted: {new Date(blog.createdAt).toLocaleDateString()}
      </p>

      <ReactQuill
        modules={module}
        theme="bubble"
        value={blog.content}
        className="p-2 mt-2 border rounded-sm bg-slate-300"
        readOnly
      />
    </div>
  );
};

export default BlogDetailPage;
