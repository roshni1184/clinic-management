

import mongoose from "mongoose";

const gallerySchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",   // ✅ Not required anymore
    },
  },
  { timestamps: true }
);

export default mongoose.model("Gallery", gallerySchema);