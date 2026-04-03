import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
  userId: { type: String }, // ✅ ADD THIS LINE
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },

  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  service: { type: String, required: true },
  fee: { type: Number, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  reason: { type: String },

  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending",
  },

  createdAt: { type: Date, default: Date.now },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending",
  },
  razorpay_order_id: { type: String },
  razorpay_payment_id: { type: String },
  razorpay_signature: { type: String },
});

appointmentSchema.index({ doctor: 1, date: 1, time: 1 }, { unique: true });

export default mongoose.model("Appointment", appointmentSchema);
