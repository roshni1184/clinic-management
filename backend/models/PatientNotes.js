import mongoose from "mongoose";

const patientNotesSchema = new mongoose.Schema(
  {
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Appointment", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    notes: { type: [String], default: [] },
    medicines: { type: [String], default: [] },
    reports: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model("PatientNotes", patientNotesSchema);
 