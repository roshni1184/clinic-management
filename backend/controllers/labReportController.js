import LabReport from "../models/labReport.js";
import User from "../models/User.js";
import mongoose from "mongoose";

/* ----------------------------------------------------
   1️⃣ DOCTOR → SEND REPORT REQUEST TO LAB
----------------------------------------------------- */
export const createLabReport = async (req, res) => {
  try {
    const { patientId, doctorId, reportType, description } = req.body;

    const report = await LabReport.create({
      patientId,
      doctorId,
      reportType,
      description,
      status: "Pending",
    });

    res.json({
      success: true,
      message: "Lab report request sent successfully",
      report,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ----------------------------------------------------
   2️⃣ LAB → UPLOAD FILE + UPDATE STATUS + REMARK
----------------------------------------------------- */
export const updateLabReport = async (req, res) => {
  try {
    console.log("FILE:", req.file);
    console.log("BODY:", req.body);
    const reportId = req.params.reportId;
    const { labResult, status } = req.body;

    const updateData = { labResult, status };

    if (req.file) {
      updateData.reportFile = `/uploads/reports/${req.file.filename}`;
    }

    const report = await LabReport.findByIdAndUpdate(reportId, updateData, {
      new: true,
    }).populate("doctorId", "name doctorId email")
      .populate("patientId", "name userId email");

    if (!report) {
      return res.status(404).json({ success: false, message: "Report not found" });
    }

    res.json({ success: true, message: "Lab report updated", report });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

/* ----------------------------------------------------
   3️⃣ USER PANEL → GET THEIR OWN REPORTS
----------------------------------------------------- */

export const getUserLabReports = async (req, res) => {
  try {
    const userId = req.params.id;

    if (!userId) {
      return res.status(400).json({ success: false, message: "User ID missing" });
    }

    // 🟢 First verify that this user exists by _id
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // 🟢 Fetch reports where patientId matches the user's MongoDB _id
    const reports = await LabReport.find({ patientId: user._id })
      .populate("doctorId")
      .populate("patientId");

    return res.json({
      success: true,
      reports,
    });
  } catch (err) {
    console.error("Get User Reports Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error while fetching user reports",
    });
  }
};


/* ----------------------------------------------------
   4️⃣ DOCTOR PANEL → GET REPORTS OF ONE PATIENT
----------------------------------------------------- */
export const getPatientLabReports = async (req, res) => {
  try {
    const patientId = req.params.patientId; // This must be ObjectId (User._id)

    const reports = await LabReport.find({ patientId })
      .populate("doctorId", "name specialization")
      .populate("patientId", "name email phone userId")
      .sort({ createdAt: -1 });

    if (!reports.length) {
      return res.json({
        success: true,
        reports: [],
        message: "No lab reports found for this patient.",
      });
    }

    res.json({ success: true, reports });

  } catch (err) {
    console.error("Lab Fetch Error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
/* ----------------------------------------------------
   5️⃣ LAB PANEL → GET ALL PENDING REPORTS
----------------------------------------------------- */
export const getPendingLabReports = async (req, res) => {
  try {
    const reports = await LabReport.find({ status: "Pending" })
      .populate("doctorId", "name doctorId email") // include doctorId if custom
      .populate("patientId", "name userId email") // include userId for frontend
      .sort({ createdAt: -1 });

    res.json({ success: true, reports });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
/* ----------------------------------------------------
   6️⃣ ADMIN / LAB → GET ALL REPORTS
----------------------------------------------------- */
export const getAllLabReports = async (req, res) => {
  try {
    const reports = await LabReport.find({})
      .populate("patientId", "name userId")   // populate patientId with name and userId
      .populate("doctorId", "name email")     // populate doctorId with name and email
      .sort({ createdAt: -1 });

    res.json({ success: true, reports });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};







export const getLabStats = async (req, res) => {
  try {
    const totalReports = await LabReport.countDocuments();
    const pendingReports = await LabReport.countDocuments({ status: "Pending" });
    const completedReports = await LabReport.countDocuments({ status: "Completed" });

    res.json({
      success: true,
      totalReports,
      pendingReports,
      completedReports,
    });
  } catch (err) {
    console.error("Failed to fetch lab stats:", err);
    res.status(500).json({ success: false, message: "Failed to fetch lab stats", error: err.message });
  }
};

/* ----------------------------------------------------
   7️⃣ ADMIN / LAB → EDIT REPORT DETAILS
----------------------------------------------------- */
import fs from "fs";
import path from "path";

/* ----------------------------------------------------
   ADMIN / LAB → EDIT REPORT + REPLACE FILE
----------------------------------------------------- */
export const editLabReport = async (req, res) => {
  try {
    const reportId = req.params.id;
    const { reportType, description, status } = req.body;

    const report = await LabReport.findById(reportId);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    // Update normal fields
    report.reportType = reportType || report.reportType;
    report.description = description || report.description;
    report.status = status || report.status;

    // ✅ If new file uploaded
    if (req.file) {
      // 🔥 Delete old file (if exists)
      if (report.reportFile) {
        const oldPath = path.join(process.cwd(), report.reportFile);
        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      // Save new file path
      report.reportFile = `/uploads/reports/${req.file.filename}`;
    }

    await report.save();

    const populatedReport = await LabReport.findById(reportId)
      .populate("doctorId", "name email")
      .populate("patientId", "name userId");

    res.json({
      success: true,
      message: "Report updated successfully",
      report: populatedReport,
    });

  } catch (err) {
    console.error("Edit Report Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to update report",
      error: err.message,
    });
  }
};
/* ----------------------------------------------------
   8️⃣ ADMIN / LAB → DELETE REPORT
----------------------------------------------------- */
export const deleteLabReport = async (req, res) => {
  try {
    const reportId = req.params.id;

    const report = await LabReport.findByIdAndDelete(reportId);

    if (!report) {
      return res.status(404).json({
        success: false,
        message: "Report not found",
      });
    }

    res.json({
      success: true,
      message: "Report deleted successfully",
    });

  } catch (err) {
    console.error("Delete Report Error:", err);
    res.status(500).json({
      success: false,
      message: "Failed to delete report",
      error: err.message,
    });
  }
};