import mongoose from "mongoose";
import Doctor from "../models/Doctor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Appointments from "../models/Appointments.js";
import User from "../models/User.js";
import LabReport from "../models/labReport.js";

// ================= Register Doctor =================
export const registerDoctor = async (req, res) => {
  try {
    const { name, email, password, phone, specialization, experience, description } = req.body;

    const existing = await Doctor.findOne({ email });
    if (existing) return res.status(400).json({ message: "Doctor already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newDoctor = new Doctor({
      name,
      email,
      password: hashedPassword,
      phone,
      specialization,
      experience,
      description,
      photo: req.file ? req.file.filename : null, // ✅ Save photo
    });

    await newDoctor.save();

    res.status(201).json({
      success: true,
      message: "Doctor Registered Successfully",
      doctor: newDoctor,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};


// ================= Doctor Login =================
export const loginDoctor = async (req, res) => {
  try {
    const { email, password } = req.body;

    const doctor = await Doctor.findOne({ email });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: doctor._id, role: "doctor" }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.status(200).json({ doctor, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= Get All Doctors =================
export const getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");
    res.status(200).json({ success: true, doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch doctors" });
  }
};

// ================= Get Doctor Appointments =================
export const getDoctorAppointments = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "doctor") {
      return res.status(403).json({ message: "Access denied" });
    }

    const doctorId = req.user.id;
    const appointments = await Appointments.find({ doctor: doctorId })
      .populate("userId", "name email phone")
      .sort({ date: 1, time: 1 });

    res.status(200).json({ success: true, appointments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// ================= Update Appointment Status =================
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const appointment = await Appointments.findByIdAndUpdate(
      req.params.appointmentId,
      { status },
      { new: true }
    );
    if (!appointment) return res.status(404).json({ message: "Appointment not found" });
    res.status(200).json({ message: "Status updated", appointment });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

// ✅ Get all users who have booked appointments with this doctor
export const getAllUsersForDoctor = async (req, res) => {
  try {
    const doctorId = req.user.id;

    // Fetch appointments of this doctor and populate user details
    const appointments = await Appointments.find({ doctor: doctorId })
      .populate("user", "name email phone") // populate user info
      .sort({ date: -1 });

    // Get unique users from appointments
    const uniqueUsers = [...new Map(appointments.map(a => [a.user._id, a.user])).values()];

    res.status(200).json({ success: true, users: uniqueUsers });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

export const getUserDetailsForDoctor = async (req, res) => {
  try {
    const userId = req.params.id;

    // Check if user exists
    const user = await User.findById(userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    // Fetch appointments for this user
    const appointments = await Appointments.find({ user: userId })
      .populate("doctor", "name specialization") // populate doctor info
      .select("doctor date time reason status service fee userId name email phone");

    res.status(200).json({
      success: true,
      user,
      appointments,
    });
  } catch (error) {
    console.error("Error fetching user details for doctor:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



//profile

export const getDoctorProfile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id).select("-password");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.status(200).json(doctor);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (updates.password && updates.password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    } else {
      delete updates.password;
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(req.user.id, updates, {
      new: true,
    }).select("-password");

    if (!updatedDoctor)
      return res.status(404).json({ message: "Doctor not found" });

    res
      .status(200)
      .json({ message: "Profile updated successfully", doctor: updatedDoctor });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};





export const referToLab = async (req, res) => {
  try {
    const { appointmentId, reportType, description } = req.body;

    // 1️⃣ Fetch appointment + patient details
    const appointment = await Appointment.findById(appointmentId).populate("user");

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // 2️⃣ Create lab report entry
    const report = await LabReport.create({
      patientId: appointment.user._id,   // Patient = user
      doctorId: req.user.id,
      reportType,
      description,
      status: "Pending",
      reportDate: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Lab test request sent successfully",
      report,
    });

  } catch (err) {
    console.log("Lab refer error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};



export const getDoctorReports = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.user.id).populate({
      path: "reports.patientId",
      select: "name email"
    });

    res.json({ success: true, reports: doctor.reports });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error fetching doctor reports" });
  }
};




