import React, { useEffect, useState } from "react";

import API from "../../api/api"; 


const DoctorRegistration = ({ doctor, onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    password: "",
    description: "",
    status: "Active",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Prefill form if editing doctor
  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || "",
        email: doctor.email || "",
        phone: doctor.phone || "",
        specialization: doctor.specialization || "",
        experience: doctor.experience || "",
        password: "",
        description: doctor.description || "",
        status: doctor.status || "Active",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        experience: "",
        password: "",
        description: "",
        status: "Active",
      });
    }
  }, [doctor]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token =
        localStorage.getItem("token") || localStorage.getItem("adminToken");

      const payload = { ...formData };
      if (!doctor || formData.password) {
        payload.password = formData.password;
      } else {
        delete payload.password;
      }

      let res;
      if (doctor) {
        res = await API.put(
          `/admin/update-doctor/${doctor._id}`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        res = await API.post(
          `/admin/register-doctor`,
          payload,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        phone: "",
        specialization: "",
        experience: "",
        password: "",
        description: "",
        status: "Active",
      });

      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#111] flex justify-center items-start py-10 px-4">
      <div className="bg-[#1f1f1f] shadow-2xl rounded-3xl w-full max-w-lg p-8 border-t-4 border-red-600">
        <h2 className="text-3xl font-bold text-center text-red-500 mb-6">
          {doctor ? "Edit Doctor Details" : "Register New Doctor"}
        </h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form className="space-y-5" onSubmit={handleSubmit}>
          {/* Name, Email, Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 bg-[#222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 bg-[#222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 bg-[#222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
            <input
              type="text"
              name="specialization"
              placeholder="Specialization"
              value={formData.specialization}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 bg-[#222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
          </div>

          {/* Experience & Password */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="number"
              name="experience"
              placeholder="Experience (years)"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-3 border border-gray-700 bg-[#222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />
            {!doctor && (
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-700 bg-[#222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            )}
          </div>

          {/* Description */}
          <textarea
            name="description"
            placeholder="Short description (e.g., 8 years experience, child specialist)"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 bg-[#222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
            rows="3"
            required
          />

          {/* Status */}
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full p-3 border border-gray-700 bg-[#222] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-600" : "bg-red-600 hover:bg-red-700"
            } text-white p-3 rounded-lg font-semibold transition`}
          >
            {loading
              ? doctor
                ? "Updating..."
                : "Registering..."
              : doctor
              ? "Update Doctor"
              : "Register Doctor"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DoctorRegistration;
