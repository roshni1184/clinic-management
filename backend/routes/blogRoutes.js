import express from "express";
import Blog from "../models/Blog.js";

const router = express.Router();

// ✅ Get all blogs (for frontend)
router.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    console.error("Error fetching blogs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Add a new blog (for admin panel)
router.post("/blogs", async (req, res) => {
  try {
    const { title, content, image, author } = req.body;
    const newBlog = new Blog({ title, content, image, author });
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error("Error adding blog:", error);
    res.status(500).json({ message: "Failed to create blog" });
  }
});

// ✅ Delete blog (optional - if admin wants)
router.delete("/blogs/:id", async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.json({ message: "Blog deleted successfully" });
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).json({ message: "Failed to delete blog" });
  }
});

export default router;
