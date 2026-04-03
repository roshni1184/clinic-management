import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  id: { type: String, required: true }, // "userId"
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("Counter", counterSchema);

const userSchema = new mongoose.Schema({
  userId: { type: String, unique: true }, // PDCP001
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number },
  password: { type: String, required: true },
  status: { type: String, enum: ["Active", "Inactive"], default: "Active" },
  createdAt: { type: Date, default: Date.now },
});

// Pre-save hook to generate userId
userSchema.pre("save", async function (next) {
  if (!this.userId) {
    const counter = await Counter.findOneAndUpdate(
      { id: "userId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    const seqNum = counter.seq.toString().padStart(3, "0"); // 001, 002, ...
    this.userId = `PDCP${seqNum}`;
  }
  next();
});

export default mongoose.model("User", userSchema);
