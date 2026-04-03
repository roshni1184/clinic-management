import React, { useEffect, useState } from "react";
import axios from "axios";

const UserDashboard = () => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [stats, setStats] = useState([
    { title: "Total Appointments", count: 0, status: "all" },
    { title: "Completed", count: 0, status: "completed" },
    { title: "Pending", count: 0, status: "pending" },
    { title: "Cancelled", count: 0, status: "cancelled" },
    { title: "Confirmed", count: 0, status: "confirmed" },
  ]);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  // Fetch logged-in user info
  const fetchUserInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("⚠ Please login first.");
        setLoading(false);
        return;
      }

      const res = await axios.get("${API}/api/user/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const userData = res.data.user || res.data;
      setUserName(userData.name || "User");
      setUserEmail(userData.email || "");
    } catch (err) {
      console.error("Error fetching user info:", err);
      setError("❌ Failed to fetch user info. Please login again.");
    }
  };

  // Fetch logged-in user's appointments
  const fetchUserAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("⚠ Please login first.");
        setLoading(false);
        return;
      }

      const res = await axios.get("${API}/api/appointments/me", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const appointments = res.data.appointments || [];
      const appointmentsWithStatus = appointments.map((appt) => ({
        ...appt,
        status: appt.status || "pending",
      }));

      // Stats counts
      const total = appointmentsWithStatus.length;
      const completed = appointmentsWithStatus.filter(a => a.status === "completed").length;
      const pending = appointmentsWithStatus.filter(a => a.status === "pending").length;
      const cancelled = appointmentsWithStatus.filter(a => a.status === "cancelled").length;
      const confirmed = appointmentsWithStatus.filter(a => a.status === "confirmed").length;

      setStats([
        { title: "Total Appointments", count: total, status: "all" },
        { title: "Completed", count: completed, status: "completed" },
        { title: "Pending", count: pending, status: "pending" },
        { title: "Cancelled", count: cancelled, status: "cancelled" },
        { title: "Confirmed", count: confirmed, status: "confirmed" },
      ]);

      const sortedRecent = appointmentsWithStatus
        .sort((a, b) => new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time))
        .slice(0, 10);

      setRecentAppointments(sortedRecent);
      setFilteredAppointments(sortedRecent);
    } catch (err) {
      console.error("Error fetching appointments:", err);
      setError(err.response?.data?.message || "❌ Failed to fetch appointments.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchUserInfo();
      await fetchUserAppointments();
    };
    fetchData();
  }, []);

  const handleFilter = (status) => {
    setActiveFilter(status);
    if (status === "all") setFilteredAppointments(recentAppointments);
    else setFilteredAppointments(recentAppointments.filter(a => a.status === status));
  };

  if (loading)
    return <p className="text-center text-gray-600 mt-10 font-medium text-lg">Loading...</p>;

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* User Greeting */}
      {userName && (
        <div className="bg-black text-white rounded-lg p-6 mb-8 shadow-lg flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold text-red-500">Hi, {userName} 👋</h2>
            <p className="text-sm mt-1 text-gray-300">{userEmail}</p>
          </div>
          <div className="text-6xl opacity-20">🧑‍⚕️</div>
        </div>
      )}

      {error && <p className="text-center text-red-500 mb-6 font-medium">{error}</p>}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        {stats.map((stat, index) => (
          <div
            key={index}
            onClick={() => handleFilter(stat.status)}
            className={`cursor-pointer bg-white rounded-xl shadow-lg p-6 flex flex-col items-center justify-center transform hover:scale-105 transition duration-300
              ${activeFilter === stat.status ? "ring-4 ring-red-500" : ""}`}
          >
            <p className="text-4xl font-extrabold text-red-500">{stat.count}</p>
            <p className="text-gray-700 mt-2 font-medium">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Appointments Table */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Recent Appointments</h2>
      {filteredAppointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-xl">
          <table className="min-w-full border border-gray-200 divide-y divide-gray-200">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3 text-left">Doctor Name</th>
                <th className="p-3 text-left">Service</th>
                <th className="p-3 text-left">Fee</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Time</th>
                <th className="p-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAppointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50">
                  <td className="p-3">{appt.doctor?.name || "N/A"}</td>
                  <td className="p-3">{appt.service || "General"}</td>
                  <td className="p-3">₹{appt.fee || 0}</td>
                  <td className="p-3">{appt.date}</td>
                  <td className="p-3">{appt.time}</td>

                  {/* UPDATED STATUS COLORS */}
                  <td className="p-3">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
                        appt.status === "completed"
                          ? "bg-blue-500"       // ⭐ COMPLETED → BLUE
                          : appt.status === "pending"
                          ? "bg-yellow-500"
                          : appt.status === "cancelled"
                          ? "bg-red-600"        // ⭐ CANCELLED → RED
                          : appt.status === "confirmed"
                          ? "bg-green-500"
                          : "bg-gray-400"
                      }`}
                    >
                      {appt.status.charAt(0).toUpperCase() + appt.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
