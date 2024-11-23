import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: String, ref: "User" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Blog", blogSchema);
