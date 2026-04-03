// import express from "express";
// import {
//   loginAdmin,
//   registerDoctor,
//   getAllDoctors,
//   updateDoctor,
//   deleteDoctor,
//   getAllUsers,     
//   updateUser,      
//   deleteUser,
//   getUserDetails,
//   getRecentAppointments,
//   getStats,
//   getDoctorDetails,
//   deleteBlog,
//   updateBlog,
//   getBlogById,
//   getAllBlogs,
//   createBlog,
//   updateAdminProfile,
//   getAdminProfile,
//   adminRegisterLabUser,
//   getAllLabUsers,
//   deleteLabUser,
//   updateLabUser,
//   getLabUserById,

//   downloadDoctors,
//   downloadPatients,
//   downloadLabUsers
  
  
  
  
  
// } from "../controllers/adminController.js";
// import { verifyToken } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/login", loginAdmin);
// router.put("/profile", verifyToken(["admin"]), updateAdminProfile);
// // ✅ Get Logged-in Admin Profile
// router.get("/me", verifyToken(["admin"]), getAdminProfile);



// router.post("/register-doctor", verifyToken(["admin"]), registerDoctor);
// router.get("/doctors", verifyToken(["admin"]), getAllDoctors); // ✅ new route
// router.get("/doctor/:id", verifyToken(["admin"]), getDoctorDetails);
// router.put("/update-doctor/:id", verifyToken (["admin"]), updateDoctor);
// router.delete("/delete-doctor/:id", verifyToken(["admin"]), deleteDoctor);

// router.post("/createblog", verifyToken(["admin"]), createBlog);
// router.get("/blogs", getAllBlogs);
// router.get("/blog/:id", getBlogById);
// router.put("/update-blog/:id", verifyToken(["admin"]), updateBlog);
// router.delete("/delete-blog/:id", verifyToken(["admin"]), deleteBlog);


// // User routes
// router.get("/users", verifyToken(["admin"]), getAllUsers);
// router.get("/user/:id", verifyToken (["admin"]), getUserDetails);
// router.put("/update-user/:id", verifyToken(["admin"]), updateUser);
// router.delete("/delete-user/:id", verifyToken(["admin"]), deleteUser);


// router.get("/stats", verifyToken(["admin"]), getStats);
// router.get("/recent-appointments", verifyToken(["admin"]), getRecentAppointments);



// // LAB USERS — ADMIN ONLY
// router.post("/register-lab", verifyToken(["admin"]), adminRegisterLabUser);
// router.get("/lab-users", verifyToken(["admin"]), getAllLabUsers);
// router.get("/lab-user/:id", verifyToken(["admin"]), getLabUserById);

// router.put("/update-lab/:id", verifyToken(["admin"]), updateLabUser);
// router.delete("/delete-lab/:id", verifyToken(["admin"]), deleteLabUser);







// router.get("/download-doctors", downloadDoctors);
// router.get("/download-patients", downloadPatients);
// router.get("/download-labusers", downloadLabUsers);






// export default router;



import express from "express";
import {
  loginAdmin,
  registerDoctor,
  getAllDoctors,
  updateDoctor,
  deleteDoctor,
  getAllUsers,
  updateUser,
  deleteUser,
  getUserDetails,
  getRecentAppointments,
  getStats,
  getDoctorDetails,
  deleteBlog,
  updateBlog,
  getBlogById,
  getAllBlogs,
  createBlog,
  updateAdminProfile,
  getAdminProfile,
  adminRegisterLabUser,
  getAllLabUsers,
  deleteLabUser,
  updateLabUser,
  getLabUserById,
  downloadDoctors,
  downloadPatients,
  downloadLabUsers
} from "../controllers/adminController.js";

import { verifyToken } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();


// ==========================
// 🔓 PUBLIC ROUTES
// ==========================

// ✅ Admin Login (only public route)
router.post("/login", loginAdmin);

// ✅ Blogs public (optional)
router.get("/blogs", getAllBlogs);
router.get("/blog/:id", getBlogById);


// ==========================
// 🔐 PROTECTED ADMIN ROUTES
// ==========================

// 👉 Apply middleware to all below routes
router.use(verifyToken(["admin"]));


// ==========================
// 👤 ADMIN PROFILE
// ==========================
router.get("/me", getAdminProfile);
router.put("/profile", updateAdminProfile);


// ==========================
// 👨‍⚕️ DOCTOR MANAGEMENT
// ==========================
router.post("/register-doctor", registerDoctor);
router.get("/doctors", getAllDoctors);
router.get("/doctor/:id", getDoctorDetails);
router.put("/update-doctor/:id", updateDoctor);
router.delete("/delete-doctor/:id", deleteDoctor);


// ==========================
// 📝 BLOG MANAGEMENT
// ==========================
// router.post("/createblog", createBlog);
router.post(
  "/createblog",
  upload.single("image"), // 👈 MUST
  createBlog
);
router.put(
  "/update-blog/:id",
  upload.single("image"), // 👈 ADD THIS
  updateBlog
);
router.delete("/delete-blog/:id", deleteBlog);


// ==========================
// 👥 USER MANAGEMENT
// ==========================
router.get("/users", getAllUsers);
router.get("/user/:id", getUserDetails);
router.put("/update-user/:id", updateUser);
router.delete("/delete-user/:id", deleteUser);


// ==========================
// 📊 DASHBOARD
// ==========================
router.get("/stats", getStats);
router.get("/recent-appointments", getRecentAppointments);


// ==========================
// 🧪 LAB USERS
// ==========================
router.post("/register-lab", adminRegisterLabUser);
router.get("/lab-users", getAllLabUsers);
router.get("/lab-user/:id", getLabUserById);
router.put("/update-lab/:id", updateLabUser);
router.delete("/delete-lab/:id", deleteLabUser);


// ==========================
// 📥 DOWNLOAD REPORTS
// ==========================
router.get("/download-doctors", downloadDoctors);
router.get("/download-patients", downloadPatients);
router.get("/download-labusers", downloadLabUsers);


export default router;
