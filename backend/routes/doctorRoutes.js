import express from "express";
import { 
  registerDoctor, 
  loginDoctor, 
  getAllDoctors, 
  getDoctorAppointments, // ✅ add this
  updateAppointmentStatus,
  getAllUsersForDoctor,
  getUserDetailsForDoctor,
  updateDoctorProfile,
  getDoctorProfile,
  referToLab,
} from "../controllers/doctorController.js";
import { verifyToken } from "../middleware/authMiddleware.js"; // ✅ token middleware

const router = express.Router();

// Register new doctor
router.post("/register", registerDoctor);

// Doctor login
router.post("/login", loginDoctor);
router.get("/me", verifyToken(["doctor"]), getDoctorProfile);
router.put("/profile", verifyToken(["doctor"]), updateDoctorProfile);


// Get all doctors (admin access or public)
router.get("/", getAllDoctors);

// ✅ Doctor fetch own appointments
router.get("/appointments", verifyToken(["doctor"]), getDoctorAppointments);
router.put("/appointments/:appointmentId/status", verifyToken(["doctor"]), updateAppointmentStatus);

// ================= Users =================
router.get("/users", verifyToken(["doctor"]), getAllUsersForDoctor); // Doctor sees their assigned users
router.get("/user/:id", verifyToken(["doctor"]), getUserDetailsForDoctor); // User details + appointments

//===============lab====================

router.post(
  "/refer-to-lab",
  verifyToken(["doctor"]),
  referToLab
);



export default router;
