import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("⚠ Please login first");
        setLoading(false);
        return;
      }

      const res = await axios.get("http://localhost:5000/api/appointments/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.error("Fetch error:", err);
      setError(err.response?.data?.message || "❌ Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id) => {
    navigate(`/user/appointment/${id}`);
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this appointment?")) return;

    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:5000/api/appointments/cancel/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Appointment cancelled successfully");
      fetchAppointments();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to cancel appointment");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-gray-600 font-medium">Loading...</p>;

  if (error)
    return <p className="text-center mt-10 text-red-500 font-medium">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-red-500">My Appointments</h1>

      <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
        {appointments.length === 0 ? (
          <p className="text-center text-gray-500 p-6">
            You have no appointments scheduled.
          </p>
        ) : (
          <table className="min-w-full border border-gray-300 divide-y divide-gray-200">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3 text-left">Doctor</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Fee</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-center">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50">
                  <td className="p-3">{appt?.doctor?.name || "N/A"}</td>
                  <td className="p-3">{appt.service || "General"}</td>
                  <td className="p-3">₹{appt.fee || 0}</td>
                  <td className="p-3">{appt.date}</td>
                  <td className="p-3">{appt.time}</td>

                  {/* ⭐ STATUS COLOR FIXED */}
                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                        appt.status === "completed"
                          ? "bg-blue-500"     // Completed → Blue
                          : appt.status === "pending"
                          ? "bg-yellow-500"   // Pending → Yellow
                          : appt.status === "confirmed"
                          ? "bg-green-500"    // Confirmed → Green
                          : appt.status === "cancelled"
                          ? "bg-red-600"      // Cancelled → Red
                          : "bg-gray-400"
                      }`}
                    >
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </span>
                  </td>

                  <td className="p-3 text-center">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => handleView(appt._id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                      >
                        View
                      </button>

                      {appt.status !== "cancelled" && (
                        <button
                          onClick={() => handleCancel(appt._id)}
                          className="bg-black hover:bg-gray-800 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        )}
      </div>
    </div>
  );
};

export default MyAppointments;
