import Doctor from "../models/Doctor.js";
import Admin from "../models/Admin.js";
import User from "../models/User.js";
import Appointment from "../models/Appointments.js";
import Blog from "../models/Blog.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import LabUser from "../models/LabUser.js";
import Users from "../models/User.js";
import { Parser } from "json2csv";

// ================= Admin Login =================
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

    res.status(200).json({ admin, token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= Register Doctor (Admin Only) =================
export const registerDoctor = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { name, email, phone, specialization, experience, password, description } = req.body;

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor)
      return res.status(400).json({ message: "Doctor already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newDoctor = new Doctor({
      name,
      email,
      phone,
      specialization,
      experience,
      description, // ✅ include description
      password: hashedPassword,
    });

    await newDoctor.save();
    res.status(201).json({ message: "Doctor registered successfully", doctor: newDoctor });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= Get All Doctors (Admin Only) =================
export const getAllDoctors = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const doctors = await Doctor.find().select("-password");
    res.status(200).json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
 
// ================= Get Doctor Details =================
export const getDoctorDetails = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    const appointments = await Appointment.find({ doctor: doctor._id })
      .populate("user", "name email")
      .sort({ date: -1 });

    res.status(200).json({ doctor, appointments });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ================= Update Doctor (Admin Only) =================
export const updateDoctor = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const { id } = req.params;
    const updates = { ...req.body };

    // Hash password if provided
    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    } else delete updates.password;

    // ✅ description will be included automatically from req.body
    const doctor = await Doctor.findByIdAndUpdate(id, updates, { new: true });
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.status(200).json({ message: "Doctor updated successfully", doctor });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= Delete Doctor (Admin Only) =================
export const deleteDoctor = async (req, res) => {
  try {
    await Doctor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Doctor deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};


// ================= Get All Users =================

export const getAllUsers = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") return res.status(403).json({ message: "Access denied. Admins only." });

    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= Update User =================

export const updateUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json({ message: "Access denied" });

    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    } else delete updates.password;

    const user = await User.findByIdAndUpdate(id, updates, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= Delete User =================

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// ================= Get User Details + Appointments =================

export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    const appointments = await Appointment.find({ user: user._id })
      .populate("doctor", "name specialization")
      .select("doctor date time reason status service fee userId name email phone");

    res.status(200).json({ user, appointments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};



// ================= Admin Stats =================

export const getStats = async (req, res) => {
  try {
    const users = await User.countDocuments();
    const doctors = await Doctor.countDocuments();
    const totalAppointments = await Appointment.countDocuments();

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");
    const todayStr = `${yyyy}-${mm}-${dd}`;

    const todayAppointments = await Appointment.countDocuments({ date: todayStr });

    res.status(200).json({ users, doctors, appointments: totalAppointments, todayAppointments });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stats" });
  }
};

// ================= Recent Appointments =================

// controllers/adminController.js
export const getRecentAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ createdAt: -1 })
      .limit(10)
      .populate("user", "name email phone")   // populates user info including _id
      .populate("doctor", "name");            // populates doctor info including _id

    // Map to frontend-friendly format
    const formatted = appointments.map(a => ({
      _id: a._id,
      userId: a.user?._id || "N/A",       // <-- actual MongoDB ID of user
      doctorId: a.doctor?._id || "N/A",   // <-- actual MongoDB ID of doctor
      name: a.user?.name || "N/A",
      email: a.user?.email || "N/A",
      phone: a.user?.phone || "N/A",
      doctorName: a.doctor?.name || "N/A",
      service: a.service,
      fee: a.fee,
      date: a.date,
      time: a.time,
      status: a.status,
      paymentStatus: a.paymentStatus,
      razorpay_order_id: a.razorpay_order_id,
      razorpay_payment_id: a.razorpay_payment_id
    }));

    res.status(200).json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch recent appointments" });
  }
};



// ================= Create Blog =================

// export const createBlog = async (req, res) => {
//   try {
//     if (!req.user || req.user.role !== "admin")
//       return res.status(403).json({ message: "Access denied. Admins only." });

//     const { title, content, author, image, tags } = req.body;

//     const blog = new Blog({ title, content, author, image, tags });
//     await blog.save();

//     res.status(201).json({ message: "Blog created successfully", blog });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

export const createBlog = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { title, content, author, tags } = req.body;

    // ✅ FINAL FIX: full path save karo
    const image = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const blog = new Blog({
      title,
      content,
      author,
      tags,
      image,
    });

    await blog.save();

    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= Get All Blogs =================

export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= Get Single Blog =================
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= Update Blog =================
// export const updateBlog = async (req, res) => {
//   try {
//     if (!req.user || req.user.role !== "admin")
//       return res.status(403).json({ message: "Access denied. Admins only." });

//     const updates = { ...req.body };
//     const blog = await Blog.findByIdAndUpdate(req.params.id, updates, { new: true });
//     if (!blog) return res.status(404).json({ message: "Blog not found" });

//     res.status(200).json({ message: "Blog updated successfully", blog });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
export const updateBlog = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    const { title, content, author, tags } = req.body;

    const updateData = {
      title,
      content,
      author,
      tags,
    };

    // ✅ image update fix
    if (req.file) {
      updateData.image = req.file.path.replace(/\\/g, "/");
    }

    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });

  } catch (err) {
    console.log("UPDATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};

// ================= Delete Blog =================
export const deleteBlog = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin")
      return res.status(403).json({ message: "Access denied. Admins only." });

    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// ✅ Fetch logged-in admin profile
export const getAdminProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select("-password");
    if (!admin) return res.status(404).json({ message: "Admin not found" });
    res.status(200).json(admin);
  } catch (err) {
    console.error("Error fetching admin profile:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update logged-in admin profile
export const updateAdminProfile = async (req, res) => {
  try {
    const adminId = req.user.id;
    const updates = { ...req.body };

    // if password field provided, hash it
    if (updates.password && updates.password.trim() !== "") {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    } else {
      delete updates.password;
    }

    const updatedAdmin = await Admin.findByIdAndUpdate(adminId, updates, {
      new: true,
    }).select("-password");

    if (!updatedAdmin)
      return res.status(404).json({ message: "Admin not found" });

    res.status(200).json({
      message: "Profile updated successfully",
      admin: updatedAdmin,
    });
  } catch (err) {
    console.error("Error updating admin:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// ================= Register Lab User (Admin Only) =================
export const adminRegisterLabUser = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    const { name, email, phone, password } = req.body;

    const existing = await LabUser.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Lab user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const labUser = new LabUser({
      name,
      email,
      phone,
      password: hashedPassword,
      role: "labuser",
    });

    await labUser.save();

    res.status(201).json({
      success: true,
      message: "Lab user registered successfully",
      labUser,
    });
  } catch (err) {
    console.error("Error registering lab user:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================= Get All Lab Users (Admin Only) =================
export const getAllLabUsers = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    const labUsers = await LabUser.find().select("-password");
    res.status(200).json({ success: true, labUsers });
  } catch (err) {
    console.error("Error fetching lab users:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================= Get Single Lab User (Admin Only) =================
export const getLabUserById = async (req, res) => {
  try {
    const user = await LabUser.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Lab user not found",
      });
    }

    return res.json({
      success: true,
      user,
    });
  } catch (err) {
    console.error("Error fetching lab user:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
// ================= Update Lab User (Admin Only) =================
export const updateLabUser = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    const { id } = req.params;
    const updates = { ...req.body };

    if (updates.password) {
      const salt = await bcrypt.genSalt(10);
      updates.password = await bcrypt.hash(updates.password, salt);
    } else delete updates.password;

    const labUser = await LabUser.findByIdAndUpdate(id, updates, { new: true }).select("-password");
    if (!labUser) return res.status(404).json({ success: false, message: "Lab user not found" });

    res.status(200).json({ success: true, message: "Lab user updated successfully", labUser });
  } catch (err) {
    console.error("Error updating lab user:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================= Delete Lab User (Admin Only) =================
export const deleteLabUser = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Access denied. Admins only." });
    }

    const { id } = req.params;
    const labUser = await LabUser.findByIdAndDelete(id);
    if (!labUser) return res.status(404).json({ success: false, message: "Lab user not found" });

    res.status(200).json({ success: true, message: "Lab user deleted successfully" });
  } catch (err) {
    console.error("Error deleting lab user:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};




// -------------------- DOWNLOAD DOCTORS --------------------
export const downloadDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find().select("-password");

    let csv = "Name,Email,Phone,Specialization\n";

    doctors.forEach((doc) => {
      csv += `${doc.name || ""},${doc.email || ""},${doc.phone || ""},${doc.specialization || ""}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=doctors-list.csv");

    res.status(200).send(csv);

  } catch (error) {
    console.error("Doctor Download Error:", error);
    res.status(500).json({ message: "Failed to download doctors list" });
  }
};



// -------------------- DOWNLOAD PATIENTS --------------------
// -------------------- DOWNLOAD PATIENTS --------------------
export const downloadPatients = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    let csv = "UserID,Name,Email,Phone,Status\n";

    users.forEach((u) => {
      csv += `"${u.userId || ""}","${u.name || ""}","${u.email || ""}","${u.phone || ""}","${u.status || ""}"\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=users-list.csv"
    );

    res.status(200).send(csv);

  } catch (error) {
    console.error("Download Error:", error);
    res.status(500).json({ message: "Download failed" });
  }
};



// -------------------- DOWNLOAD LAB USERS --------------------
export const downloadLabUsers = async (req, res) => {
  try {
    const labUsers = await LabUser.find().select("-password");

    let csv = "Name,Email,Phone,Lab Name\n";

    labUsers.forEach((lab) => {
      csv += `${lab.name || ""},${lab.email || ""},${lab.phone || ""},${lab.labName || ""}\n`;
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=lab-users-list.csv");

    res.status(200).send(csv);

  } catch (error) {
    console.error("Lab Users Download Error:", error);
    res.status(500).json({ message: "Failed to download lab users list" });
  }
};