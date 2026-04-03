import express from "express";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Employee from "../models/Employee.js";
import verifyToken from "../middleware/authMiddleware.js";

dotenv.config();

const router = express.Router();
const SALT_ROUNDS = 10;

/**************************************
 * ⭐ ADMIN — REGISTER EMPLOYEE
 * POST /api/employee/register
 **************************************/
router.post("/register", verifyToken(["admin"]), async (req, res) => {
  try {
    const { name, email, phone, password, role, department } = req.body;

    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Name, email, password, and role are required." });
    }

    // Check existing email
    const existing = await Employee.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(409).json({ message: "Email already in use." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create employee
    const newEmployee = new Employee({
      name,
      email: email.toLowerCase(),
      phone,
      password: hashedPassword,
      role,
      department,
    });

    await newEmployee.save();

    // Remove password from response
    const responseData = newEmployee.toObject();
    delete responseData.password;

    res.status(201).json({
      message: "Employee registered successfully",
      employee: responseData,
    });
  } catch (error) {
    console.error("Employee Registration Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**************************************
 * ⭐ EMPLOYEE LOGIN
 * POST /api/employee/login
 **************************************/
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({
      email: email.toLowerCase(),
    });

    if (!employee)
      return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, employee.password);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({
      message: "Login successful",
      employee: {
        id: employee._id,
        name: employee.name,
        role: employee.role,
        customId: employee.customId,
        department: employee.department,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**************************************
 * ⭐ ADMIN — GET ALL EMPLOYEES
 * GET /api/employee
 **************************************/
router.get("/", verifyToken(["admin"]), async (req, res) => {
  try {
    const filter = {};
    if (req.query.role) filter.role = req.query.role;

    const employees = await Employee.find(filter).select("-password").sort({
      createdAt: 1,
    });

    res.json({ employees });
  } catch (error) {
    console.error("Get Employees Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**************************************
 * ⭐ GET EMPLOYEE BY ID / CUSTOM ID
 * GET /api/employee/:id
 **************************************/
router.get("/:id", verifyToken(["admin"]), async (req, res) => {
  try {
    const { id } = req.params;

    let employee;

    if (id.startsWith("PDC")) {
      employee = await Employee.findOne({ customId: id }).select("-password");
    } else {
      employee = await Employee.findById(id).select("-password");
    }

    if (!employee)
      return res.status(404).json({ message: "Employee not found" });

    res.json({ employee });
  } catch (error) {
    console.error("Get Employee Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**************************************
 * ⭐ ADMIN — UPDATE EMPLOYEE
 * PUT /api/employee/:id
 **************************************/
router.put("/:id", verifyToken(["admin"]), async (req, res) => {
  try {
    const updates = { ...req.body };

    // Hash new password if provided
    if (updates.password) {
      const salt = await bcrypt.genSalt(SALT_ROUNDS);
      updates.password = await bcrypt.hash(updates.password, salt);
    } else {
      delete updates.password;
    }

    const updated = await Employee.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true }
    ).select("-password");

    if (!updated)
      return res.status(404).json({ message: "Employee not found" });

    res.json({ message: "Employee updated successfully", employee: updated });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/**************************************
 * ⭐ ADMIN — DELETE EMPLOYEE
 * DELETE /api/employee/:id
 **************************************/
router.delete("/:id", verifyToken(["admin"]), async (req, res) => {
  try {
    const removed = await Employee.findByIdAndDelete(req.params.id);
    if (!removed)
      return res.status(404).json({ message: "Employee not found" });

    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

export default router;
