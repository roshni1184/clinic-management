import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";

const UserProfile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [showProfile, setShowProfile] = useState(true); // ✅ Show/hide card

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser({
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

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user.password !== user.confirmPassword) {
      toast.error("Passwords do not match");
      setUser((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        "http://localhost:5000/api/user/profile",
        {
          name: user.name,
          email: user.email,
          phone: user.phone,
          password: user.password || undefined,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      toast.success(res.data.message || "Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update profile");
    }
  };

  if (loading)
    return (
      <p className="text-center text-white mt-10 font-medium text-lg">
        Loading profile...
      </p>
    );

  if (!showProfile) return null; // ✅ Hide card when closed

  return (
    <div className="min-h-screen flex items-center justify-center bg-black p-4 relative">
      <Toaster position="top-right" />

      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg border border-red-500 relative">
        {/* Close Button */}
        <button
          onClick={() => setShowProfile(false)}
          className="absolute top-4 right-4 text-red-500 hover:text-red-700 font-bold text-xl transition"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-center text-red-500 mb-6">
          Update Profile
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            name="name"
            value={user.name}
            onChange={handleChange}
            placeholder="Full Name"
            className="border border-black rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
            required
          />
          <input
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Email"
            type="email"
            className="border border-black rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
            required
          />
          <input
            name="phone"
            value={user.phone}
            onChange={handleChange}
            placeholder="Phone Number"
            type="text"
            className="border border-black rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
          />
          <input
            name="password"
            value={user.password}
            onChange={handleChange}
            type="password"
            placeholder="New Password (optional)"
            className="border border-black rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
          />
          <input
            name="confirmPassword"
            value={user.confirmPassword}
            onChange={handleChange}
            type="password"
            placeholder="Confirm New Password"
            className="border border-black rounded-xl p-3 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
          />

          <button
            type="submit"
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all shadow-md hover:shadow-lg"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
