import express from "express";
import { getAllUsers, loginUser, registerUser , updateUserProfile, getUserProfile, } from "../controllers/userController.js";

import { verifyToken } from "../middleware/authMiddleware.js";


const router = express.Router();

// Register new user
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// Get all users (admin access)
router.get("/", getAllUsers);    


router.get("/me", verifyToken(["user"]), getUserProfile);

// ✅ Update logged-in user's profile
router.put("/profile", verifyToken(["user"]), updateUserProfile);


export default router;
