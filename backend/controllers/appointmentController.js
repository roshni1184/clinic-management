import Appointment from "../models/Appointments.js";
import generateAppointmentReceipt from "../utils/generateAppointmentReceipt.js";
import { sendEmail } from "../utils/sendEmail.js";

/* ======================================================
   📅 Book Appointment (User)
====================================================== */
export const bookAppointment = async (req, res) => {
  try {
    const user = req.user; // logged-in user
    const { doctor, date, time, reason, service, fee } = req.body;

    // Validation
    if (!doctor || !date || !time || !service || !fee) {
      return res.status(400).json({ message: "Missing fields" });
    }

    // Check double-booking
    const existing = await Appointment.findOne({ doctor, date, time });
    if (existing)
      return res.status(409).json({ message: "Slot already booked" });

    const appt = new Appointment({
      user: user._id,
      userId: user.userId,
      name: user.name,
      email: user.email,
      phone: user.phone,
      doctor,
      date,
      time,
      reason,
      service,
      fee,
    });

    await appt.save();
    res.status(201).json({ success: true, appointment: appt });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ message: "Slot already booked" });
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   👤 Get Logged-in User’s Appointments
====================================================== */
export const getMyAppointments = async (req, res) => {
  try {
    const userId = req.user._id;

    const appointments = await Appointment.find({ user: userId })
      .populate("doctor", "name specialization")
      .populate("user", "name email phone")
      .sort({ date: 1, time: 1 });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Server error while fetching appointments" });
  }
};

/* ======================================================
   ❌ Cancel Appointment (User)
====================================================== */
export const cancelAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appt = await Appointment.findById(id);
    if (!appt) return res.status(404).json({ message: "Not found" });
    if (String(appt.user) !== String(req.user._id))
      return res.status(403).json({ message: "Not allowed" });

    appt.status = "cancelled";
    await appt.save();
    res.json({ message: "Cancelled successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};




/* ======================================================
   🩺 Doctor: View Own Appointments
====================================================== */
export const getDoctorAppointments = async (req, res) => {
  try {
    const doctorId = req.user._id; // ✅ logged-in doctor's ID

    const appointments = await Appointment.find({ doctor: doctorId })
      .populate("user", "name email phone")
      .sort({ date: -1 });

    res.status(200).json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.error("Error fetching doctor appointments:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching appointments",
    });
  }
};
export const getAppointmentByIdForDoctor = async (req, res) => {
  try {
    const { id } = req.params;
    const doctorId = req.user._id; // assuming you have auth middleware setting req.user

    // Find appointment and ensure it belongs to the logged-in doctor
    const appointment = await Appointment.findOne({ _id: id, doctor: doctorId })
      .populate("doctor", "name specialization email")
      .populate("user", "name email phone address");

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found for this doctor" });
    }

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    console.error("Error fetching appointment details for doctor:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching appointment details",
    });
  }
};

export const updateAppointmentStatus = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { status: newStatus } = req.body;

    // ✅ Validate allowed statuses
    const validStatuses = ["pending", "confirmed", "cancelled", "completed"];
    if (!validStatuses.includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value",
      });
    }

    // Find appointment
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    // ✅ Optional: Only allow the doctor who owns this appointment to update
    if (req.user.role === "doctor") {
      if (appointment.doctor.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: "Unauthorized: You can update only your own appointments.",
        });
      }
    }

    // ✅ Allowed status transitions
    const allowedTransitions = {
      pending: ["confirmed", "cancelled"],
      confirmed: ["completed", "cancelled"],
      cancelled: [],
      completed: [],
    };

    const currentStatus = appointment.status;

    if (!allowedTransitions[currentStatus].includes(newStatus)) {
      return res.status(400).json({
        success: false,
        message: `Cannot change status from "${currentStatus}" to "${newStatus}"`,
      });
    }

    // Update status
    appointment.status = newStatus;
    await appointment.save();

    res.json({
      success: true,
      message: `Appointment status updated to "${newStatus}"`,
      appointment,
    });
  } catch (error) {
    console.error("Error updating appointment:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};



/* ======================================================
   🛠️ Admin: View All Appointments
====================================================== */
export const getAllAppointments = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied" });

    const appointments = await Appointment.find()
      .populate("doctor", "name")
      .populate("user", "userId name email")
      .sort({ date: 1, time: 1 });

    const formattedAppointments = appointments.map((a) => ({
      _id: a._id,
      userId: a.userId || a.user?.userId || "N/A",
      name: a.name || a.user?.name || "N/A",
      email: a.email || a.user?.email || "N/A",
      phone: a.phone || "N/A",
      doctor: { name: a.doctor?.name || "N/A" },
      service: a.service || "General",
      fee: a.fee || 0,
      date: a.date,
      time: a.time,
      status: a.status,
    }));

    res.status(200).json({ success: true, appointments: formattedAppointments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

/* ======================================================
   ✅ Admin: Confirm Appointment
====================================================== */
export const confirmAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    const appt = await Appointment.findById(id);
    if (!appt) return res.status(404).json({ message: "Appointment not found" });

    appt.status = "confirmed";
    await appt.save();

    res.json({ message: "Appointment confirmed successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

/* ======================================================
   🔍 Admin: Get Single Appointment Details
====================================================== */
export const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;

    const appointment = await Appointment.findById(id)
      .populate("doctor", "name specialization email")
      .populate("user", "name email phone address");

    if (!appointment) {
      return res
        .status(404)
        .json({ success: false, message: "Appointment not found" });
    }

    res.status(200).json({ success: true, appointment });
  } catch (error) {
    console.error("Error fetching appointment details:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching appointment details",
    });
  }
};
export const deleteAppointmentByAdmin = async (req, res) => {
  try {
    // ✅ Check if logged-in user is admin
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admin can delete appointments." });
    }

    const { id } = req.params;
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    await Appointment.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully by admin",
    });
  } catch (error) {
    console.error("Error deleting appointment:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting appointment",
    });
  }
};


export const getUserAppointmentDetails = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const userId = req.user._id;
    const userRole = req.user.role;

    const appointment = await Appointment.findById(appointmentId)
      .populate("doctor", "name email phone specialization experience status customId")
      .populate("user", "name email phone");

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    if (userRole === "user" && appointment.user._id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: "Access denied. Insufficient permissions.",
      });
    }

    res.status(200).json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};








export const getUserAppointmentById = async (req, res) => {
  try {
    const userId = req.user._id;
    const appointmentId = req.params.id;

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // ✅ Check owner
    if (appointment.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Access denied. Insufficient permissions." });
    }

    res.json({
      success: true,
      appointment,
    });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};




// 
export const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    // If not admin, allow only owner
    if (req.user.role !== "admin" && appointment.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await appointment.deleteOne();
    res.json({ message: "Appointment deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
