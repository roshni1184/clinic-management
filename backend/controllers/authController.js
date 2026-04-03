import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import User from "../models/User.js";
import Doctor from "../models/Doctor.js";
import Admin from "../models/Admin.js";
import LabUser from "../models/LabUser.js";
import Employee from "../models/Employee.js";   // ⭐ NEW — IMPORTANT

// -------------------------------------------------------------------------------
// ⭐ VERIFY TOKEN (ALL ROLES)
// -------------------------------------------------------------------------------
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user =
      (await Admin.findById(decoded.id).select("-password")) ||
      (await Doctor.findById(decoded.id).select("-password")) ||
      (await LabUser.findById(decoded.id).select("-password")) ||
      (await Employee.findById(decoded.id).select("-password")) || // ⭐ ADD EMPLOYEE
      (await User.findById(decoded.id).select("-password"));

    if (!user) return res.status(404).json({ message: "User not found" });

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// -------------------------------------------------------------------------------
// ⭐ USER SIGNUP
// -------------------------------------------------------------------------------
export const signupUser = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "user",
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: "user" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: "user",
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Signup failed" });
  }
};

// -------------------------------------------------------------------------------
// ⭐ LOGIN (ALL ROLES HANDLED — USER/ADMIN/DOCTOR/LAB/EMPLOYEE)
// -------------------------------------------------------------------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    let user =
      (await Admin.findOne({ email })) ||
      (await Doctor.findOne({ email })) ||
      (await LabUser.findOne({ email })) ||
      (await Employee.findOne({ email })) ||  // ⭐ ADD EMPLOYEE LOGIN
      (await User.findOne({ email }));

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Login failed" });
  }
};

// -------------------------------------------------------------------------------
// ⭐ ADMIN REGISTER
// -------------------------------------------------------------------------------
export const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exist = await Admin.findOne({ email });
    if (exist) return res.status(400).json({ message: "Admin already exists" });

    const hash = await bcrypt.hash(password, 10);

    const admin = new Admin({
      name,
      email,
      password: hash,
      role: "admin",
    });

    await admin.save();

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Admin registered successfully",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "admin",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// -------------------------------------------------------------------------------
// ⭐ ADMIN LOGIN
// -------------------------------------------------------------------------------
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(404).json({ message: "Admin not found" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Admin login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: "admin",
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
