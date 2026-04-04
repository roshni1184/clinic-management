// import dotenv from "dotenv";
// dotenv.config();

// import express from "express";
// import cors from "cors";
// import connectDB from "./Config/db.js";
// import path from "path";
// import { fileURLToPath } from "url";

// import { createAdminIfNotExists } from "./utils/createAdmin.js";

// // routes
// import authRoutes from "./routes/authRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import adminRoutes from "./routes/adminRoutes.js";
// import doctorRoutes from "./routes/doctorRoutes.js";
// import appointmentRoutes from "./routes/appointmentRoutes.js";
// import paymentRoutes from "./routes/paymentRoutes.js";
// import patientNotesRoutes from "./routes/patientNotesRoutes.js";
// import labReportRoutes from "./routes/labReportRoutes.js";
// import labUserRoutes from "./routes/labUserRoutes.js";
// import employeeRoutes from "./routes/employeeRoutes.js";
// import testimonialRoutes from "./routes/testimonialRoutes.js";
// import galleryRoutes from "./routes/galleryRoutes.js";

// const app = express();

// // dirname setup
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // middleware
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// // routes
// app.use("/api/gallery", galleryRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/admin", adminRoutes);
// app.use("/api/doctors", doctorRoutes);
// app.use("/api/appointments", appointmentRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/patient-notes", patientNotesRoutes);
// app.use("/api/lab-report", labReportRoutes);
// app.use("/api/lab-user", labUserRoutes);
// app.use("/api/employee", employeeRoutes);
// app.use("/api/testimonials", testimonialRoutes);

// // test route
// app.get("/", (req, res) => {
//   res.send("✅ API is running...");
// });

// // error handler
// app.use((err, req, res, next) => {
//   res.status(500).json({ message: err.message });
// });

// // ✅ start server properly
// const startServer = async () => {
//   try {
//     await connectDB();
//     console.log("✅ DB Connected");

//     await createAdminIfNotExists();

//     const PORT = process.env.PORT || 5000;
//     app.listen(PORT, () =>
//       console.log(`🚀 Server running on port ${PORT}`)
//     );
//   } catch (error) {
//     console.log(error);
//   }
// };

// startServer();



import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./Config/db.js";
import path from "path";
import { fileURLToPath } from "url";

import { createAdminIfNotExists } from "./utils/createAdmin.js";

// routes
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import patientNotesRoutes from "./routes/patientNotesRoutes.js";
import labReportRoutes from "./routes/labReportRoutes.js";
import labUserRoutes from "./routes/labUserRoutes.js";
import employeeRoutes from "./routes/employeeRoutes.js";
import testimonialRoutes from "./routes/testimonialRoutes.js";
import galleryRoutes from "./routes/galleryRoutes.js";

const app = express();

// dirname setup
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middleware
app.use(
  cors({
    origin: "https://clinic-management-rosy-rho.vercel.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ FINAL FIX (IMPORTANT)
app.use(
  "/uploads",
  express.static(path.resolve(__dirname, "uploads"))
);

// routes
app.use("/api/gallery", galleryRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/patient-notes", patientNotesRoutes);
app.use("/api/lab-report", labReportRoutes);
app.use("/api/lab-user", labUserRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/testimonials", testimonialRoutes);

// test route
app.get("/", (req, res) => {
  res.send("✅ API is running...");
});

// error handler
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

// start server
const startServer = async () => {
  try {
    await connectDB();
    console.log("✅ DB Connected");

    await createAdminIfNotExists();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () =>
      console.log(`🚀 Server running on port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

startServer();