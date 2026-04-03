import mongoose from "mongoose";

const labReportSchema = new mongoose.Schema(
  {
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    reportType: { type: String, required: true },
    reportFile: { type: String },
    description: { type: String },
    status: { type: String, default: "Pending" }, // Pending | Completed
    labResult: { type: String },   // Lab remark/result
    reportDate: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("LabReport", labReportSchema);
