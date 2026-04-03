// import express from "express";
// import upload from "../middleware/upload.js";
// import Gallery from "../models/Gallery.js";
// import fs from "fs";
// import path from "path";

// const router = express.Router();

// // Upload
// router.post("/upload", upload.single("image"), async (req, res) => {
//   try {
//     const newImage = new Gallery({
//       image: req.file.filename,
//     });

//     await newImage.save();

//     res.status(201).json({
//       message: "Image uploaded successfully",
//       data: newImage,
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Upload failed" });
//   }
// });

// // Get
// router.get("/", async (req, res) => {
//   const images = await Gallery.find().sort({ createdAt: -1 });
//   res.json(images);
// });

// // Delete
// router.delete("/:id", async (req, res) => {
//   try {
//     const image = await Gallery.findById(req.params.id);
//     if (!image) return res.status(404).json({ message: "Not found" });

//     // ✅ IMPORTANT FIX
//     const filePath = path.join("uploads/gallery", image.image);
//     if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

//     await Gallery.findByIdAndDelete(req.params.id);

//     res.json({ message: "Deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Delete failed" });
//   }
// });

// // Update
// router.put("/:id", upload.single("image"), async (req, res) => {
//   try {
//     const image = await Gallery.findById(req.params.id);
//     if (!image) return res.status(404).json({ message: "Not found" });

//     if (req.file) {
//       const oldPath = path.join("uploads/gallery", image.image);
//       if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

//       image.image = req.file.filename;
//     }

//     await image.save();

//     res.json({ message: "Updated successfully", data: image });
//   } catch (error) {
//     res.status(500).json({ message: "Update failed" });
//   }
// });

// export default router;



import express from "express";
import upload from "../middleware/upload.js";
import Gallery from "../models/Gallery.js";
import fs from "fs";
import path from "path";

const router = express.Router();


// ==========================
// ✅ Upload Image
// ==========================
router.post("/upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    const newImage = new Gallery({
      image: req.file.filename,
      description: req.body.description || "", // ✅ Safe
    });

    await newImage.save();

    res.status(201).json({
      message: "Image uploaded successfully",
      data: newImage,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Upload failed" });
  }
});


// ==========================
// ✅ Get All
// ==========================
router.get("/", async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ message: "Fetch failed" });
  }
});


// ==========================
// ✅ Delete
// ==========================
router.delete("/:id", async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Not found" });

    const filePath = path.join("uploads/gallery", image.image);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});


// ==========================
// ✅ Update
// ==========================
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Not found" });

    // If new image uploaded
    if (req.file) {
      const oldPath = path.join("uploads/gallery", image.image);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      image.image = req.file.filename;
    }

    // Update description safely
    image.description = req.body.description || image.description;

    await image.save();

    res.json({ message: "Updated successfully", data: image });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Update failed" });
  }
});

export default router;