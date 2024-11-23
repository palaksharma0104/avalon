import express from "express";
const router = express.Router();
import Blog from "../modal/blog.js";

router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    // const blogs = await Blog.find()
    //   .populate("author", "username name")
    //   .sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

router.post("/saveblog", async (req, res) => {
  const { title, content, author } = req.body;
  // author should be email. and then find a user from the other one w the email, then get the id and then replace author with that id.
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const blog = new Blog({
      title,
      content,
      author,
    });
    await blog.save();
    res.status(201).json({ message: "Blog created successfully", blog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Error creating blog" });
  }
});

export default router;
