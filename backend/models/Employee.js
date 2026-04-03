// import mongoose from "mongoose";

// const prefixMap = {
//   nurse: "PDCN",
//   receptionist: "PDCR",
//   sweeper: "PDCSW",
//   accountant: "PDCAC",
//   hr: "PDCHR",
//   staff: "PDCSF",
// };

// const counterSchema = new mongoose.Schema({
//   role: { type: String, required: true },
//   seq: { type: Number, default: 0 },
// });

// const Counter = mongoose.model("EmployeeCounter", counterSchema);

// const employeeSchema = new mongoose.Schema(
//   {
//     customId: { type: String, unique: true }, // ⭐ NEW FIELD

//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     phone: { type: String },
//     password: { type: String, required: true },

//     role: {
//       type: String,
//       enum: [
//         "nurse",
//         "receptionist",
//         "staff",
//         "accountant",
//         "hr",
//         "sweeper"
//       ],
//       required: true,
//     },

//     department: { type: String }
//   },
//   { timestamps: true }
// );


// // ⭐⭐⭐ CUSTOM ID AUTO-GENERATION
// employeeSchema.pre("save", async function (next) {
//   try {
//     if (!this.customId) {
//       const prefix = prefixMap[this.role];

//       const counter = await Counter.findOneAndUpdate(
//         { role: this.role },
//         { $inc: { seq: 1 } },
//         { new: true, upsert: true }
//       );

//       const num = String(counter.seq).padStart(3, "0");
//       this.customId = `${prefix}${num}`;
//     }
//   } catch (err) {
//     console.error("Error generating employee customId:", err);
//   }

//   next();
// });

// export default mongoose.model("Employee", employeeSchema);

import mongoose from "mongoose";

const prefixMap = {
  nurse: "PDCN",
  receptionist: "PDCR",
  sweeper: "PDCSW",
  accountant: "PDCAC",
  hr: "PDCHR",
  staff: "PDCSF",
};

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true },  // ⭐ GLOBAL COUNTER
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model("EmployeeCounter", counterSchema);

const employeeSchema = new mongoose.Schema(
  {
    customId: { type: String, unique: true },

    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: { type: String, required: true },

    role: {
      type: String,
      enum: [
        "nurse",
        "receptionist",
        "staff",
        "accountant",
        "hr",
        "sweeper"
      ],
      required: true,
    },

    department: { type: String }
  },
  { timestamps: true }
);

// ⭐ GLOBAL AUTO ID GENERATION
employeeSchema.pre("save", async function (next) {
  try {
    if (!this.customId) {
      const prefix = prefixMap[this.role];

      const counter = await Counter.findOneAndUpdate(
        { name: "employeeId" },
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      );

      const num = String(counter.seq).padStart(3, "0");
      this.customId = `${prefix}${num}`;
    }
  } catch (err) {
    console.error("Error generating employee customId:", err);
  }

  next();
});

export default mongoose.model("Employee", employeeSchema);
