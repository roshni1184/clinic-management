
import express from "express";
import { signupUser, loginUser, verifyToken, registerAdmin, loginAdmin } from "../controllers/authController.js";



const router = express.Router();
router.post("/adminsignup", registerAdmin);
router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/adminlogin", loginAdmin);


// Example protected route
router.get("/profile", verifyToken, (req, res) => {
  res.json({ user: req.user });
});

export default router;
