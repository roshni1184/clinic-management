import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Admin from "../models/Admin.js";
import Doctor from "../models/Doctor.js";
import LabUser from "../models/LabUser.js";
import Employee from "../models/Employee.js";

export const verifyToken = (allowedRoles = []) => {
  return async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      // ❌ No token
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
      }

      const token = authHeader.split(" ")[1];

      // 🔐 Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (!decoded?.id) {
        return res.status(401).json({ message: "Invalid token" });
      }

      // 🔍 Find user in all collections (optimized)
      let user = null;
      let role = null;

      // Check in Admin
      user = await Admin.findById(decoded.id).select("-password");
      if (user) role = "admin";

      // Check in Doctor
      if (!user) {
        user = await Doctor.findById(decoded.id).select("-password");
        if (user) role = "doctor";
      }

      // Check in LabUser
      if (!user) {
        user = await LabUser.findById(decoded.id).select("-password");
        if (user) role = "labuser";
      }

      // Check in Employee
      if (!user) {
        user = await Employee.findById(decoded.id).select("-password");
        if (user) role = "employee";
      }

      // Check in normal User
      if (!user) {
        user = await User.findById(decoded.id).select("-password");
        if (user) role = "user";
      }

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Attach to request
      req.user = {
        id: user._id.toString(),
        role,
        ...user.toObject(),
      };

      console.log("✅ Role:", role, "| Allowed:", allowedRoles);

      // 🔒 Role check
      if (allowedRoles.length && !allowedRoles.includes(role)) {
        return res.status(403).json({
          message: "Access denied. Insufficient permissions.",
        });
      }

      next();
    } catch (error) {
      console.error("❌ Token verification error:", error.message);
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }
  };
};

export default verifyToken;