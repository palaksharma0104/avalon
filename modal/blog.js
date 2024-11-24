import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, required: true },
  userType: { type: String, enum: ["gUser", "User"], required: true },
  // author: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Blog", blogSchema);
