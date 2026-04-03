// import mongoose from "mongoose";

// const labUserSchema = new mongoose.Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },

//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//     },

//     phone: {
//       type: String,
//       required: false,
//     },

//     password: {
//       type: String,
//       required: true,
//     },

//     role: {
//       type: String,
//       default: "labuser", // lab staff
//     }
//   },
//   { timestamps: true }
// );

// export default mongoose.model("LabUser", labUserSchema);



import mongoose from "mongoose";

const labUserSchema = new mongoose.Schema(
  {
    customId: { type: String, unique: true }, // ✅ Lab ID like PDCL001

    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: false,
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      default: "labuser",
    }
  },
  { timestamps: true }
);



// ✅ Auto-generate Lab customId before saving
labUserSchema.pre("save", async function (next) {
  if (!this.customId) {
    try {
      const lastLabUser = await mongoose
        .model("LabUser")
        .findOne()
        .sort({ createdAt: -1 });

      let nextNumber = 1;

      if (lastLabUser && lastLabUser.customId) {
        const lastNumber = parseInt(
          lastLabUser.customId.replace("PDCL", "")
        );

        if (!isNaN(lastNumber)) {
          nextNumber = lastNumber + 1;
        }
      }

      this.customId = `PDCL${String(nextNumber).padStart(3, "0")}`;

    } catch (err) {
      console.error("Error generating Lab customId:", err);
    }
  }

  next();
});

export default mongoose.model("LabUser", labUserSchema);
