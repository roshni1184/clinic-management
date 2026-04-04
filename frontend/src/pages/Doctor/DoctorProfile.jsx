import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import API from "../../utils/api";


const DoctorProfile = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    description: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(true);

  // ⭐ Fetch doctor profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(`${API}/api/doctors/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setDoctor({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          specialization: res.data.specialization || "",
          experience: res.data.experience || "",
          description: res.data.description || "",
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

  // ⭐ Handle Input Change
  const handleChange = (e) => {
    setDoctor({ ...doctor, [e.target.name]: e.target.value });
  };

  // ⭐ Update Profile
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ❗ Check if passwords match
    if (doctor.password !== doctor.confirmPassword) {
      toast.error("Passwords do not match!");
      setDoctor((prev) => ({ ...prev, password: "", confirmPassword: "" }));
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `${API}/api/doctors/profile`,
        {
          name: doctor.name,
          email: doctor.email,
          phone: doctor.phone,
          specialization: doctor.specialization,
          experience: doctor.experience,
          description: doctor.description,
          password: doctor.password || undefined, // only send if entered
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast.success(res.data.message || "Profile updated successfully!");

      setDoctor((prev) => ({
        ...prev,
        password: "",
        confirmPassword: "",
      }));
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  if (loading) return <p>Loading profile...</p>;

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <Toaster position="top-right" />

      <h2 className="text-2xl font-bold mb-6 text-center">Doctor Profile</h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={doctor.name}
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
            value={doctor.email}
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
            value={doctor.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Specialization</label>
          <input
            type="text"
            name="specialization"
            value={doctor.specialization}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Experience (years)</label>
          <input
            type="number"
            name="experience"
            value={doctor.experience}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            name="description"
            value={doctor.description}
            onChange={handleChange}
            rows="3"
            className="w-full border px-3 py-2 rounded-md"
            placeholder="Write about the doctor..."
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={doctor.password}
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
            value={doctor.confirmPassword}
            onChange={handleChange}
            placeholder="Re-enter password"
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

export default DoctorProfile;
