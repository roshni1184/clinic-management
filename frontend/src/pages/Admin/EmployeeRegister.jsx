import React, { useState, useEffect } from "react";

import API from "../../api/api"; 


const EmployeeRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    department: "",
  });

  const [successId, setSuccessId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const roles = [
    { value: "nurse", label: "Nurse" },
    { value: "receptionist", label: "Receptionist" },
    { value: "sweeper", label: "Sweeper" },
    { value: "accountant", label: "Accountant" },
    { value: "hr", label: "HR" },
    { value: "staff", label: "Staff" },
  ];

  // Allow only admin
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "admin") {
      setError("Access Denied: Only admin can register employees.");
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        `/employee/register`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const employee = res.data.employee;
      setSuccessId(employee.customId);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "",
        department: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }

    setLoading(false);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-2xl border border-red-600 rounded-2xl p-8"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-red-600 drop-shadow">
          Register New Employee
        </h2>

        {/* Error */}
        {error && (
          <p className="text-red-600 text-center mb-3 font-semibold bg-red-100 p-2 rounded">
            {error}
          </p>
        )}

        {/* Success */}
        {successId && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-xl text-center shadow">
            🎉 Employee Registered Successfully!
            <br />
            <span className="font-bold text-black">Staff ID: {successId}</span>
          </div>
        )}

        {/* Access check */}
        {error === "Access Denied: Only admin can register employees." ? null : (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-red-500"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-red-500"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-red-500"
              value={formData.phone}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="Create Password"
              className="w-full p-3 border border-gray-300 rounded-lg mb-3 focus:ring-2 focus:ring-red-500"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <select
              name="role"
              className="w-full p-3 border border-gray-300 rounded-lg mb-3 bg-white focus:ring-2 focus:ring-red-500"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              {roles.map((r) => (
                <option key={r.value} value={r.value}>
                  {r.label}
                </option>
              ))}
            </select>

            <input
              type="text"
              name="department"
              placeholder="Department (Optional)"
              className="w-full p-3 border border-gray-300 rounded-lg mb-5 focus:ring-2 focus:ring-red-500"
              value={formData.department}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg text-white font-bold transition ${
                loading
                  ? "bg-red-300"
                  : "bg-red-600 hover:bg-red-700 shadow-lg"
              }`}
            >
              {loading ? "Registering..." : "Register Employee"}
            </button>
          </>
        )}
      </form>
    </div>
  );
};

export default EmployeeRegister;
