import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import API from "../../api/api"; 



const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const allowedTransitions = {
    pending: ["confirmed", "cancelled"],
    confirmed: ["completed", "cancelled"],
    cancelled: [],
    completed: [],
  };

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setMessage("");
      setError("");

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setMessage("⚠ Please login first as a doctor.");
          setLoading(false);
          return;
        }

        const res = await API.get(
          `/appointments/doctor/appointments`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success && res.data.appointments.length > 0) {
          const updated = res.data.appointments.map((appt) => ({
            ...appt,
            status: appt.status || "pending",
          }));
          setAppointments(updated);
        } else {
          setMessage("No appointments found.");
        }
      } catch (err) {
        if (!err.response) {
          setError("❌ Backend unreachable. Is the server running?");
        } else {
          setError(`❌ ${err.response.data?.message || "Error fetching data."}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleStatusChange = async (apptId, newStatus, currentStatus) => {
    if (!allowedTransitions[currentStatus].includes(newStatus)) {
      alert(`❌ Cannot change status from ${currentStatus} → ${newStatus}`);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const res = await API.put(
        `/appointments/update-status/${apptId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setAppointments((prev) =>
          prev.map((a) =>
            a._id === apptId ? { ...a, status: newStatus } : a
          )
        );
        alert(`✅ Status updated to ${newStatus}`);
      }
    } catch (err) {
      alert("❌ Error updating status.");
    }
  };

  const handleViewAppointment = (apptId) => {
    navigate(`/doctor/appointment/${apptId}`);
  };

  if (loading)
    return (
      <p className="text-center text-gray-700 mt-10 font-medium text-lg">
        Loading...
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center text-black mb-6">
        My Appointments
      </h1>

      {error && <p className="text-center text-red-600 mb-4">{error}</p>}
      {message && !error && (
        <p className="text-center text-gray-700 mb-4">{message}</p>
      )}

      {appointments.length > 0 && (
        <div className="overflow-x-auto shadow-xl rounded-xl border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">

            {/* Table Header */}
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3 text-left">Patient ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Fee</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Payment</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appt, idx) => {
                const currentStatus = appt.status || "pending";

                return (
                  <tr
                    key={appt._id}
                    className={`transition ${
                      idx % 2 === 0 ? "bg-gray-50" : "bg-white"
                    } hover:bg-gray-100`}
                  >
                    <td className="p-3 text-gray-700">{appt.userId || "N/A"}</td>
                    <td className="p-3 text-gray-700">{appt.name || "N/A"}</td>
                    <td className="p-3 text-gray-700">{appt.email || "N/A"}</td>
                    <td className="p-3 text-gray-700">{appt.phone || "N/A"}</td>
                    <td className="p-3 text-gray-700">{appt.service || "N/A"}</td>
                    <td className="p-3 text-gray-700">₹{appt.fee || 0}</td>
                    <td className="p-3 text-gray-700">{appt.date}</td>
                    <td className="p-3 text-gray-700">{appt.time}</td>

                    {/* Payment Badge */}
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm font-medium
                        ${
                          appt.paymentStatus === "Paid"
                            ? "bg-green-600"
                            : appt.paymentStatus === "Failed"
                            ? "bg-red-600"
                            : "bg-yellow-600"
                        }`}
                      >
                        {appt.paymentStatus || "Pending"}
                      </span>
                    </td>

                    {/* Status Dropdown */}
                    <td className="p-3">
                      <select
                        value={currentStatus}
                        onChange={(e) =>
                          handleStatusChange(
                            appt._id,
                            e.target.value,
                            currentStatus
                          )
                        }
                        className={`border rounded px-2 py-1 text-sm font-medium
                        ${
                          currentStatus === "confirmed"
                            ? "bg-green-100 text-green-800 border-green-400"
                            : currentStatus === "pending"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-400"
                            : currentStatus === "cancelled"
                            ? "bg-red-100 text-red-800 border-red-400"
                            : "bg-gray-200 text-gray-700 border-gray-400"
                        }`}
                      >
                        <option value={currentStatus}>{currentStatus}</option>
                        {allowedTransitions[currentStatus].map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </td>

                    {/* View Detail Button */}
                    <td className="p-3">
                      <button
                        onClick={() => handleViewAppointment(appt._id)}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm transition"
                      >
                        View Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}
    </div>
  );
};

export default DoctorAppointments;
