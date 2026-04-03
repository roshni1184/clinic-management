import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  bookAppointment,
  getMyAppointments,
  cancelAppointment,
  getDoctorAppointments,
  getAllAppointments,
  confirmAppointment,
  getAppointmentById,
  deleteAppointmentByAdmin,
  updateAppointmentStatus,
  getAppointmentByIdForDoctor,
  getUserAppointmentDetails,
  
} from "../controllers/appointmentController.js";

const router = express.Router();

/* --------------------------------------------
   USER ROUTES (Patients)
-------------------------------------------- */
router.post("/", verifyToken(["user", "admin"]), bookAppointment);
router.get("/me", verifyToken(["user"]), getMyAppointments);
router.get("/user/:id", verifyToken(["user", "admin"]), getUserAppointmentDetails);
router.patch("/cancel/:id", verifyToken(["user"]), cancelAppointment);

/* --------------------------------------------
   DOCTOR ROUTES
-------------------------------------------- */
router.get("/doctor/appointments", verifyToken(["doctor"]), getDoctorAppointments);
router.put("/update-status/:id",  verifyToken(["doctor"]), updateAppointmentStatus);
router.get("/doctor/appointment/:id", verifyToken(["doctor"]), getAppointmentByIdForDoctor);


/* --------------------------------------------
   ADMIN ROUTES
-------------------------------------------- */
router.get("/all", verifyToken(["admin"]), getAllAppointments);
router.get("/:id", verifyToken(["admin"]), getAppointmentById); // ✅ NEW
router.patch("/confirm/:id", verifyToken(["admin"]), confirmAppointment);
router.delete("/admin/delete/:id", verifyToken(["admin"]), deleteAppointmentByAdmin);


export default router;
