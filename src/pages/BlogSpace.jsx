import { useEffect, useState } from "react";
import axios from "axios";

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

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
    <div className="p-6 mt-16 mx-20 flex flex-col">
      <h1 className="text-2xl font-bold mb-4 mx-auto">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-white p-4 shadow rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-700 mb-4">
              {blog.content.substring(0, 100)}...
            </p>
            <p className="text-sm text-gray-500">
              By: {`${blog.author.name}(${blog.author.username})`} |{" "}
              {new Date(blog.createdAt).toLocaleDateString()}
            </p>
            <a
              href={`/blogs/${blog._id}`}
              className="text-blue-500 hover:underline text-sm"
            >
              Read More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogsPage;
