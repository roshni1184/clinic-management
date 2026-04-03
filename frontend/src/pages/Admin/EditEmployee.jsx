import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    department: "",
    password: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    const loadEmployee = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${API}/api/employee/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const emp = res.data.employee;

        setForm({
          name: emp.name,
          email: emp.email,
          phone: emp.phone || "",
          role: emp.role,
          department: emp.department || "",
          password: "",
        });
      } catch (err) {
        setError("Failed to load employee details");
      }
    };

    loadEmployee();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateEmployee = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      await axios.put(
        `${API}/api/employee/${id}`,
        form,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("Employee updated successfully");

      // Stay on the same page (no redirect)
      // Optional: refresh page → navigate(0);

    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="p-6 bg-black min-h-screen">
      <h2 className="text-3xl font-bold mb-4 text-red-500 border-b border-red-600 pb-2">
        Edit Employee
      </h2>

      {error && <p className="text-red-500 bg-red-100 p-3 rounded">{error}</p>}

      <form
        onSubmit={updateEmployee}
        className="bg-white text-black p-6 rounded shadow-xl border border-red-500 max-w-xl"
      >
        {/* NAME */}
        <label className="block mb-2 font-semibold text-red-600">Name</label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          className="w-full p-2 rounded mb-4 border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* EMAIL */}
        <label className="block mb-2 font-semibold text-red-600">
          Email (read-only)
        </label>
        <input
          name="email"
          value={form.email}
          readOnly
          className="w-full p-2 rounded mb-4 bg-gray-300 border border-red-300 cursor-not-allowed"
        />

        {/* PHONE */}
        <label className="block mb-2 font-semibold text-red-600">Phone</label>
        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full p-2 rounded mb-4 border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        />

        {/* ROLE */}
        <label className="block mb-2 font-semibold text-red-600">Role</label>
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
          className="w-full p-2 rounded mb-4 border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="">Select Role</option>
          <option value="admin">Admin</option>
          <option value="doctor">Doctor</option>
          <option value="nurse">Nurse</option>
          <option value="receptionist">Receptionist</option>
          <option value="staff">Staff</option>
        </select>

        {/* DEPARTMENT */}
        <label className="block mb-2 font-semibold text-red-600">
          Department
        </label>
        <input
          name="department"
          value={form.department}
          onChange={handleChange}
          className="w-full p-2 rounded mb-4 border border-red-400 focus:ring-2 focus:ring-red-500"
        />

        {/* PASSWORD */}
        <label className="block mb-2 font-semibold text-red-600">
          New Password (optional)
        </label>
        <input
          type="password"
          name="password"
          placeholder="Leave empty to keep old password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 rounded mb-4 border border-red-400 focus:ring-2 focus:ring-red-500"
        />

        {/* BUTTONS */}
        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded shadow"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditEmployee;
