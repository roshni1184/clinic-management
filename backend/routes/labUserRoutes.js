import express from "express";
import { getProfile, updateProfile } from "../controllers/labUserController.js";
import {verifyToken} from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/lab-user/profile - Get lab user profile
router.get("/me", verifyToken(["labuser"]), getProfile);

// PUT /api/lab-user/profile - Update lab user profile
router.put("/userprofile", verifyToken(["labuser"]), updateProfile);

export default router;
