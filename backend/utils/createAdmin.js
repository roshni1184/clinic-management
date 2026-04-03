import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";

export const createAdminIfNotExists = async () => {
  try {
    // 🔍 check admin already exists
    const existingAdmin = await Admin.findOne({
      email: process.env.ADMIN_EMAIL,
    });

    if (!existingAdmin) {
      if (
        !process.env.ADMIN_EMAIL ||
        !process.env.ADMIN_PASSWORD ||
        !process.env.ADMIN_NAME
      ) {
        console.log("❌ Admin credentials missing in .env");
        return;
      }

      // 🔐 hash password
      const hashedPassword = await bcrypt.hash(
        process.env.ADMIN_PASSWORD,
        10
      );

      const admin = new Admin({
        name: process.env.ADMIN_NAME,
        email: process.env.ADMIN_EMAIL,
        password: hashedPassword,
      });

      await admin.save();
      console.log("✅ Admin created successfully");
    } else {
      console.log("ℹ️ Admin already exists");
    }
  } catch (error) {
    console.log("❌ Error creating admin:", error);
  }
};