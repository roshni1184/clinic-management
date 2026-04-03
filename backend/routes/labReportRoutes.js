// import express from "express";
// import multer from "multer";
// import {
//   createLabReport,
//   updateLabReport,
//   getUserLabReports,
//   getPatientLabReports,
//   getPendingLabReports,
//   getAllLabReports,
//   getLabStats,
// } from "../controllers/labReportController.js";
// import verifyToken from "../middleware/authMiddleware.js"

// const router = express.Router();

// /* ---------- File Upload Config ----------- */
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, "uploads/reports"),
//   filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
// });
// const upload = multer({ storage });

// /* ------------------ ROUTES ------------------ */

// // 1️⃣ Doctor → Send request to lab
// router.post("/create", createLabReport);

// // 2️⃣ Lab → Update report + upload file
// router.put("/update/:reportId", upload.single("reportFile"), updateLabReport);

// // 3️⃣ User Panel → Get their own reports
// router.get("/user/:id", getUserLabReports);

// // 4️⃣ Doctor Panel → Get all reports of a patient
// router.get("/doctor/:patientId", getPatientLabReports);

// // 5️⃣ Lab Panel → Only pending reports
// router.get("/pending", getPendingLabReports);

// // 6️⃣ Admin / Lab → All reports
// router.get("/all", getAllLabReports);

// // Lab stats
// router.get("/stats",verifyToken(["labuser", "lab", "admin"]), getLabStats);

// export default router;





import express from "express";
import multer from "multer";
import {
  createLabReport,
  updateLabReport,
  getUserLabReports,
  getPatientLabReports,
  getPendingLabReports,
  getAllLabReports,
  getLabStats,
  editLabReport,      // ✅ ADDED
  deleteLabReport     // ✅ ADDED
} from "../controllers/labReportController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

/* ---------- File Upload Config ----------- */
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/reports"),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

/* ------------------ ROUTES ------------------ */

// 1️⃣ Doctor → Send request to lab
router.post("/create", createLabReport);

// 2️⃣ Lab → Update report + upload file
router.put("/update/:reportId", upload.single("reportFile"), updateLabReport);

// 3️⃣ User Panel → Get their own reports
router.get("/user/:id", getUserLabReports);

// 4️⃣ Doctor Panel → Get all reports of a patient
router.get("/doctor/:patientId", getPatientLabReports);

// 5️⃣ Lab Panel → Only pending reports
router.get("/pending", getPendingLabReports);

// 6️⃣ Admin / Lab → All reports
router.get("/all", getAllLabReports);

// 7️⃣ Admin / Lab → Edit report (without file upload)
router.put(
  "/:id",
  verifyToken(["admin", "labuser"]),
  upload.single("reportFile"),  // ✅ enable file upload
  editLabReport
);
// 8️⃣ Admin / Lab → Delete report
router.delete("/:id", verifyToken(["admin", "labuser"]), deleteLabReport);

// Lab stats
router.get(
  "/stats",
  verifyToken(["labuser", "lab", "admin"]),
  getLabStats
);

export default router;
