import express from "express";
import PatientNotes from "../models/PatientNotes.js";
import Appointment from "../models/Appointments.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Add or update patient notes (POST)
router.post("/:appointmentId", verifyToken(["doctor"]), async (req, res) => {
  const { appointmentId } = req.params;
  const { notes = [], medicines = [], reports = [] } = req.body;

  try {
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment)
      return res.status(404).json({ success: false, message: "Appointment not found" });

    let patientNotes = await PatientNotes.findOne({ appointmentId });

    if (patientNotes) {
      if (notes.length) patientNotes.notes.push(...notes);
      if (medicines.length) patientNotes.medicines.push(...medicines);
      if (reports.length) patientNotes.reports.push(...reports);
    } else {
      patientNotes = new PatientNotes({
        appointmentId,
        userId: appointment.user,
        doctorId: req.user._id,
        notes,
        medicines,
        reports,
      });
    }

    await patientNotes.save();
    return res.status(200).json({ success: true, patientNotes });
  } catch (error) {
    console.error("Error saving patient notes:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Get patient notes (always returns a notes object)
router.get("/:appointmentId", verifyToken(["doctor"]), async (req, res) => {
  const { appointmentId } = req.params;
  try {
    let patientNotes = await PatientNotes.findOne({ appointmentId });

    if (!patientNotes) {
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment)
        return res.status(404).json({ success: false, message: "Appointment not found" });

      // Create empty notes if none exist
      patientNotes = new PatientNotes({
        appointmentId,
        userId: appointment.user,
        doctorId: req.user._id,
        notes: [],
        medicines: [],
        reports: [],
      });
      await patientNotes.save();
    }

    return res.status(200).json({ success: true, patientNotes });
  } catch (error) {
    console.error("Error fetching patient notes:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

// ✅ Update patient notes (PUT, creates if not exist)
router.put("/:appointmentId", verifyToken(["doctor"]), async (req, res) => {
  const { appointmentId } = req.params;
  const { notes = [], medicines = [], reports = [] } = req.body;

  try {
    let patientNotes = await PatientNotes.findOne({ appointmentId });

    if (!patientNotes) {
      const appointment = await Appointment.findById(appointmentId);
      if (!appointment)
        return res.status(404).json({ success: false, message: "Appointment not found" });

      patientNotes = new PatientNotes({
        appointmentId,
        userId: appointment.user,
        doctorId: req.user._id,
        notes,
        medicines,
        reports,
      });
    } else {
      // Overwrite existing notes
      patientNotes.notes = notes;
      patientNotes.medicines = medicines;
      patientNotes.reports = reports;
    }

    await patientNotes.save();
    return res.status(200).json({ success: true, patientNotes });
  } catch (error) {
    console.error("Error updating patient notes:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
});

export default router;
