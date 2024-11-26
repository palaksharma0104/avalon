import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const UserBlogsPage = () => {
  const [userBlogs, setUserBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = jwtDecode(token);
    setUserId(user.user.id);

    const fetchUserBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/user-blogs/${userId}`
        );
        setUserBlogs(response.data);
      } catch (error) {
        console.error("Error fetching user blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchUserBlogs();
    }
  }, [userId]);

  const handleDeleteClick = (blogId) => {
    setBlogToDelete(blogId); // Set the blog ID to delete
    setShowModal(true); // Show the confirmation modal
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/delete/${blogToDelete}`);
      setUserBlogs(userBlogs.filter((blog) => blog._id !== blogToDelete)); // Update UI
    } catch (error) {
      console.error("Error deleting blog:", error);
    } finally {
      setShowModal(false); // Close the modal
      setBlogToDelete(null); // Reset the blog to delete
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setBlogToDelete(null);
  };

  if (loading) return <div>Loading your blogs...</div>;
  if (userBlogs.length === 0)
    return (
      <div className="mt-28 px-52 text-center">You have no blogs yet.</div>
    );

  return (
    <div className="p-6 mt-28 px-52 flex flex-col ">
      <h1 className="text-2xl font-bold mb-10 mx-auto text-rose-200">
        Your Blogs
      </h1>
      <div className="grid grid-cols-1 gap-8">
        {userBlogs.map((blog) => (
          <div
            key={blog._id}
            className="bg-rose-100 p-4 shadow rounded-sm hover:shadow-lg transition"
          >
            <Link key={blog._id} to={`/blog/${blog._id}`}>
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
            <div
              className="flex flex-row items-center cursor-pointer hover:fill-rose-900 mt-4"
              onClick={() => handleDeleteClick(blog._id)}
            >
              <svg
                className="svg-icon h-4 hover:fill-rose-900"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M872.7 278.8H151.5c-30.3 0-55-24.7-55-55v-32.7c0-22 17.9-39.9 39.9-39.9h744.4c25.7 0 46.7 21 46.7 46.7v25.9c0 30.4-24.6 55-54.8 55z m-736.3-96.3c-4.8 0-8.6 3.9-8.6 8.7v32.7c0 13.1 10.7 23.7 23.7 23.7h721.2c13.2 0 23.6-10.4 23.6-23.7V198c0-8.5-7-15.5-15.5-15.5H136.4z"
                  fill="#E86262"
                />
                <path
                  d="M602.9 182.5H421.1v-17.6c0-50.1 40.8-90.8 90.9-90.8 50.1 0 90.9 40.8 90.9 90.8v17.6zM454 151.2h116c-6.2-26.3-29.9-45.9-58-45.9-28.2 0-51.8 19.6-58 45.9zM695.8 948H328.1C267.4 948 218 898.6 218 837.9V247.6h588v590.3c0 60.7-49.4 110.1-110.2 110.1zM249.3 278.8v559c0 43.5 35.4 78.9 78.9 78.9h367.7c43.5 0 78.9-35.4 78.9-78.9v-559H249.3z"
                  fill="#E86262"
                />
                <path
                  d="M400.7 784.9c-8.6 0-15.6-7-15.6-15.6v-386c0-8.6 7-15.6 15.6-15.6s15.6 7 15.6 15.6v386c0 8.6-7 15.6-15.6 15.6zM512 784.9c-8.6 0-15.6-7-15.6-15.6v-386c0-8.6 7-15.6 15.6-15.6s15.6 7 15.6 15.6v386c0 8.6-7 15.6-15.6 15.6zM623.3 728.9c-8.6 0-15.6-7-15.6-15.6v-330c0-8.6 7-15.6 15.6-15.6s15.6 7 15.6 15.6v330c0 8.6-7 15.6-15.6 15.6z"
                  fill="#E86262"
                />
              </svg>
              <button className="text-red-500 hover:underline text-sm hover:fill-rose-900 hover:text-rose-900 transition">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-sm shadow-lg">
            <h3 className="text-lg font-bold">
              Are you sure you want to delete this blog?
            </h3>
            <h1 className="mb-4 text-sm">This action can't be undone</h1>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-sm hover:bg-gray-300"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-sm hover:bg-red-600"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserBlogsPage;
