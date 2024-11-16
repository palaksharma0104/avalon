import React, { useState } from "react";
import Footer from "../components/Footer";

function LoggedInPage() {
  const [posts, setPosts] = useState([
    { id: 1, user: "Emma", content: "Loving Avalon! Such a cute platform 💜" },
    {
      id: 2,
      user: "Liam",
      content: "Just shared my first blog! Check it out 📝",
    },
  ]);
  const [newPost, setNewPost] = useState("");

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (newPost.trim()) {
      setPosts([{ id: Date.now(), user: "You", content: newPost }, ...posts]);
      setNewPost("");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f3e8ff] to-[#ffe6f7] flex flex-col items-center">
      {/* Post Creation Section */}
      <section className="w-full max-w-3xl mt-10 px-4 md:px-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-[#6d28d9] mb-4">
            Create a Post
          </h2>
          <form onSubmit={handlePostSubmit}>
            <textarea
              className="w-full border-2 border-[#9b59b6] rounded-lg p-4 text-[#6d28d9] focus:outline-none focus:border-[#8b5cf6] resize-none"
              rows="4"
              placeholder="What's on your mind?"
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            ></textarea>
            <button
              type="submit"
              className="mt-4 bg-[#6d28d9] hover:bg-[#8b5cf6] text-white px-6 py-2 rounded-full font-medium shadow-lg"
            >
              Post
            </button>
          </form>
        </div>
      </section>

      {/* Feed Section */}
      <section className="w-full max-w-3xl mt-10 px-4 md:px-8">
        <h2 className="text-2xl font-bold text-[#6d28d9] mb-6">Your Feed</h2>
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition"
            >
              <p className="text-sm text-[#9b59b6] font-medium">{post.user}</p>
              <p className="mt-2 text-[#6d28d9]">{post.content}</p>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="text-center text-[#8b5cf6]">
              No posts yet. Start sharing!
            </p>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default LoggedInPage;
