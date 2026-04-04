import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import API from "../../api/api"; 


const AdminUserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("adminToken") || localStorage.getItem("token");
      const res = await API.get(`/admin/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data.user);
      setAppointments(res.data.appointments);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch user details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-20 text-white text-xl font-semibold animate-pulse">
        Loading user details...
      </div>
    );
  if (!user)
    return (
      <div className="text-center mt-20 text-red-500 text-xl font-semibold">
        User not found
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-red-600 border-b border-gray-700 pb-2">
        Patient Details
      </h1>

      {/* ===== User Info Section ===== */}
      <div className="bg-black text-white rounded-xl shadow-lg p-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side */}
        <div>
          <h2 className="text-xl font-semibold mb-4 text-red-500 border-b border-gray-700 pb-1">
            Account Information
          </h2>
          <p className="mb-2">
            <strong className="text-gray-300">Patient ID:</strong> {user.userId || user._id}
          </p>
          <p className="mb-2">
            <strong className="text-gray-300">Joined On:</strong>{" "}
            {new Date(user.createdAt).toLocaleDateString("en-IN")}
          </p>
        </div>

        {/* Right Side */}
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-red-500 border-b border-gray-700 pb-1">
            Contact Information
          </h2>
          <div className="space-y-2">
            <p>
              <strong className="text-gray-300">Name:</strong> {user.name}
            </p>
            <p>
              <strong className="text-gray-300">Email:</strong>{" "}
              <span className="text-blue-500">{user.email}</span>
            </p>
            <p>
              <strong className="text-gray-300">Phone:</strong> {user.phone || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* ===== Appointments Table ===== */}
      <h2 className="text-2xl font-semibold mb-4 text-red-500">Appointments</h2>

      {appointments.length > 0 ? (
        <div className="overflow-x-auto bg-black text-white rounded-xl shadow-lg border border-gray-700 p-4 mb-10">
          <table className="min-w-full border border-gray-700">
            <thead>
              <tr className="bg-gray-900 text-white text-left border-b border-gray-700">
                <th className="py-2 px-4">Doctor</th>
                <th className="py-2 px-4">Specialization</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Time</th>
                <th className="py-2 px-4">Service</th>
                <th className="py-2 px-4">Fee</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr
                  key={appt._id}
                  className="hover:bg-gray-800 transition border-b border-gray-700"
                >
                  <td className="py-2 px-4">{appt.doctor?.name}</td>
                  <td className="py-2 px-4">{appt.doctor?.specialization}</td>
                  <td className="py-2 px-4">{appt.date}</td>
                  <td className="py-2 px-4">{appt.time}</td>
                  <td className="py-2 px-4">{appt.service}</td>
                  <td className="py-2 px-4 font-semibold">₹{appt.fee}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-400 text-lg">No appointments found.</p>
      )}

      {/* ===== Back Button ===== */}
      <div className="flex justify-center mt-8">
        <Link
          to="/admin/users"
          className="bg-red-600 hover:bg-red-700 text-white px-8 py-2 rounded-lg shadow-md transition"
        >
          Back to Users
        </Link>
      </div>
    </div>
  );
};

export default AdminUserDetails;
