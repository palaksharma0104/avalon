import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedBlogId, setExpandedBlogId] = useState(null); // To track which blog is expanded

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div>Loading blogs...</div>;

  return (
    <>
      <div className="p-6 mt-28 px-52 flex flex-col">
        <h1 className="text-2xl font-bold mb-10 mx-auto text-rose-200">
          Blogs
        </h1>
        <div className="grid grid-cols-1 gap-8">
          {blogs.map((blog) => (
            <Link
              key={blog._id}
              to={`/blog/${blog._id}`}
              className="block bg-rose-100 p-4 shadow rounded-sm hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
              <div
                className="text-gray-700 mb-4"
                dangerouslySetInnerHTML={{
                  __html: blog.content.substring(0, 100),
                }}
              />
              <p className="text-sm text-gray-500">
                By: {`${blog.author.name} (${blog.author.username})`} |{" "}
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
            </Link>
          ))}
        </div>
      </div>
      <Footer classe="bg-slate-800" />
    </>
  );
};

export default BlogsPage;
