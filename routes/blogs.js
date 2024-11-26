import express from "express";
const router = express.Router();
import Blog from "../modal/blog.js";
import gUser from "../modal/gUser.js";
import User from "../modal/user.js";
import mongoose from "mongoose";

router.get("/blogs", async (req, res) => {
  try {
    // const blogs = await Blog.find().sort({ createdAt: -1 });
    const blogs = await Blog.find().sort({ createdAt: -1 });

    // Populate based on userType
    const populatedBlogs = await Promise.all(
      blogs.map(async (blog) => {
        const userCollection = blog.userType === "gUser" ? "gUser" : "User";
        const user = await mongoose
          .model(userCollection)
          .findById(blog.author, "username name");
        return {
          ...blog._doc,
          author: user, // Replace author ObjectId with the populated user data
        };
      })
    );

    res.status(200).json(populatedBlogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

router.post("/saveblog", async (req, res) => {
  const { title, content, author } = req.body;
  console.log(content);
  // author is an id. and then find a user from the other one w the email, then get the id and then replace author with that id.
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    // Check if the author exists in the `gUser` collection
    let user = await gUser.findById(author);
    let userType = "gUser";

    if (!user) {
      // If not found in `gUser`, check in `User`
      user = await User.findById(author);
      if (!user) {
        return res.status(404).json({ message: "Author not found" });
      }
      userType = "User";
    }

    // Create the blog with `userType`
    const blog = new Blog({
      title,
      content,
      author,
      userType,
    });

    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Error creating blog" });
  }
});

router.get("/blog/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Determine the user collection based on `userType`
    const userCollection = blog.userType === "gUser" ? "gUser" : "User";
    const author = await mongoose
      .model(userCollection)
      .findById(blog.author, "username name");

    // Add the populated author object to the response
    const populatedBlog = {
      ...blog._doc,
      author,
    };

    res.status(200).json(populatedBlog);
  } catch (error) {
    console.error("Error fetching blog:", error);
    res.status(500).json({ message: "Error fetching blog", error });
  }
});

router.get("/user-blogs/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find blogs authored by the user
    const blogs = await Blog.find({ author: userId }).sort({ createdAt: -1 });

    // Populate author details
    const populatedBlogs = await Promise.all(
      blogs.map(async (blog) => {
        const userCollection = blog.userType === "gUser" ? "gUser" : "User";
        const user = await mongoose
          .model(userCollection)
          .findById(blog.author, "username name");
        return {
          ...blog._doc,
          author: user,
        };
      })
    );

    res.status(200).json(populatedBlogs);
  } catch (error) {
    console.error("Error fetching user's blogs:", error);
    res.status(500).json({ message: "Error fetching user's blogs" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog)
      return res.status(404).json({ message: "Blog not found" });

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Error deleting blog" });
  }
});

export default router;
