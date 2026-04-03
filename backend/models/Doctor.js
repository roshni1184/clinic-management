import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    customId: { type: String, unique: true }, // ✅ Custom doctor ID like PDCD001
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: Number },
    specialization: { type: String, required: true },
    experience: { type: Number, required: true },
    description: { type: String, default: "" }, // ✅ Added description field
    status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
    password: { type: String, required: true },
    role: { type: String, default: "doctor" },
  },
  { timestamps: true }
);

// ✅ Auto-generate customId before saving
doctorSchema.pre("save", async function (next) {
  if (!this.customId) {
    try {
      const lastDoctor = await mongoose
        .model("Doctor")
        .findOne()
        .sort({ createdAt: -1 });

      let nextNumber = 1;
      if (lastDoctor && lastDoctor.customId) {
        const lastNumber = parseInt(lastDoctor.customId.replace("PDCD", ""));
        if (!isNaN(lastNumber)) {
          nextNumber = lastNumber + 1;
        }
      }

      this.customId = `PDCD${String(nextNumber).padStart(3, "0")}`;
    } catch (err) {
      console.error("Error generating customId:", err);
    }
  }
  next();
});

export default mongoose.model("Doctor", doctorSchema);
