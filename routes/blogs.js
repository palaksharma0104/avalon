import express from "express";
const router = express.Router();
import Blog from "../modal/blog.js";

router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "username"); // Populate author username
    res.status(200).json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

export default router;
