import express from "express";
import {
  createTestimonial,
  getApprovedTestimonials,
  approveTestimonial,
  getAllTestimonials,
  deleteTestimonial,
} from "../controllers/testimonialController.js";

import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/", createTestimonial);
router.get("/", getApprovedTestimonials);

// Admin
router.get("/all", verifyToken(["admin"]), getAllTestimonials);
router.put("/approve/:id", verifyToken(["admin"]), approveTestimonial);
router.delete("/delete/:id", verifyToken(["admin"]), deleteTestimonial);

export default router;