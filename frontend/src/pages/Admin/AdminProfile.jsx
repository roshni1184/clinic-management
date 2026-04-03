import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);

  // ✅ Fetch admin profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/admin/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setAdmin({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          password: "",
          confirmPassword: "",
        });
      } catch (err) {
        console.error(err);
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // ✅ Handle input change
  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  // ✅ Submit updated profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Check if passwords match
    if (admin.password !== admin.confirmPassword) {
      toast.error("Passwords do not match. Please re-enter.");
      setAdmin((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        "http://localhost:5000/api/admin/profile",
        {
          name: admin.name,
          email: admin.email,
          phone: admin.phone,
          password: admin.password || undefined, // send password only if changed
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // ✅ Reset password fields after update
      setAdmin((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));

      // ✅ Show success toast
      toast.success(res.data.message || "Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* ✅ Toaster for toast messages */}
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-2xl font-bold mb-6 text-center">Admin Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={admin.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Phone</label>
          <input
            type="text"
            name="phone"
            value={admin.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={admin.password}
            onChange={handleChange}
            placeholder="Enter new password (optional)"
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={admin.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter new password"
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-[#FF3366] text-white font-semibold rounded-md hover:bg-red-600 transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default AdminProfile;
