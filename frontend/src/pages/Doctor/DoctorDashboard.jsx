import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../utils/api";


const DoctorDashboard = () => {
  const [doctorName, setDoctorName] = useState("");

  const [stats, setStats] = useState([
    { title: "Total Appointments", count: 0, status: "all" },
    { title: "Completed", count: 0, status: "completed" },
    { title: "Pending", count: 0, status: "pending" },
    { title: "Cancelled", count: 0, status: "cancelled" },
  ]);

  const [appointments, setAppointments] = useState([]);
  const [groupedAppointments, setGroupedAppointments] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ⭐ Use EXACT SAME Patient ID you requested
  const getCorrectPatientId = (a) =>
    a.user?.userId || a.userId || "N/A";

  // Fetch Doctor Info
  const fetchDoctorInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("${API}/api/doctors/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctorName(res.data.name || "");
    } catch (err) {
      console.error("Doctor info error:", err);
    }
  };

  // Fetch ALL Appointments
  const fetchDoctorAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API}/api/appointments/doctor/appointments`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data.appointments || [];

      const updated = data.map((a) => ({
        ...a,
        status: a.status || "pending",
      }));

      setAppointments(updated);

      // Stats
      const total = updated.length;
      const completed = updated.filter((a) => a.status === "completed").length;
      const pending = updated.filter((a) => a.status === "pending").length;
      const cancelled = updated.filter((a) => a.status === "cancelled").length;

      setStats([
        { title: "Total Appointments", count: total, status: "all" },
        { title: "Completed", count: completed, status: "completed" },
        { title: "Pending", count: pending, status: "pending" },
        { title: "Cancelled", count: cancelled, status: "cancelled" },
      ]);

      applyFilter("all", updated);
    } catch (err) {
      console.error("Dashboard load error:", err);
      setError("Failed to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  // Apply filter + group results
  const applyFilter = (filterStatus, sourceAppointments = appointments) => {
    setActiveFilter(filterStatus);

    let filtered =
      filterStatus === "all"
        ? sourceAppointments
        : sourceAppointments.filter((a) => a.status === filterStatus);

    // ⭐ GROUP BY PATIENT using SAME ID format
    const grouped = filtered.reduce((acc, a) => {
      const pid = getCorrectPatientId(a); // ⭐ Correct ID used

      if (!acc[pid]) {
        acc[pid] = {
          userId: pid,
          name: a.user?.name || "N/A",
          email: a.user?.email || "N/A",
          phone: a.user?.phone || "N/A",
          appointments: [],
        };
      }

      acc[pid].appointments.push({
        _id: a._id,
        service: a.service,
        fee: a.fee,
        date: a.date,
        time: a.time,
        status: a.status,
      });

      return acc;
    }, {});

  setGroupedAppointments(grouped);
  };

  useEffect(() => {
    fetchDoctorInfo();
    fetchDoctorAppointments();
  }, []);

  if (loading)
    return <p className="text-center mt-10 text-lg text-gray-700">Loading...</p>;

  const users = Object.values(groupedAppointments);

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* Greeting */}
      <div className="bg-black text-white rounded-xl p-6 mb-10 shadow-lg flex justify-between items-center border border-red-600">
        <div>
          <h2 className="text-3xl font-bold">Welcome, Dr. {doctorName} 👋</h2>
          <p className="text-sm text-gray-300">Your appointment dashboard</p>
        </div>
        <div className="text-6xl opacity-20">🩺</div>
      </div>

      {/* Stats Cards (Filter Buttons) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            onClick={() => applyFilter(stat.status)}
            className={`cursor-pointer bg-white border rounded-xl shadow-md p-6 flex flex-col items-center transition hover:scale-105
              ${activeFilter === stat.status ? "border-red-600 shadow-red-300" : "border-gray-200"}
            `}
          >
            <p className="text-4xl font-bold">{stat.count}</p>
            <p className="text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* GROUPED APPOINTMENTS */}
      <h2 className="text-2xl font-bold mb-4">Appointments</h2>

      {users.length === 0 ? (
        <p className="text-gray-500 text-lg">No appointments found.</p>
      ) : (
        users.map((user) => (
          <div
            key={user.userId}
            className="border border-gray-300 rounded-xl mb-6 overflow-hidden shadow"
          >
            {/* HEADER */}
            <div className="bg-black px-4 py-3 flex justify-between items-center text-white">
              <div>
                <p className="font-semibold">
                  <span className="text-red-400 font-bold">Name: </span>
                  {user.name}
                </p>
                <p className="text-sm mt-1">
                  <span className="text-red-400 font-bold">Email: </span>
                  {user.email}
                </p>
                <p className="text-sm mt-1">
                  <span className="text-red-400 font-bold">Phone: </span>
                  {user.phone}
                </p>
              </div>

              <p className="text-sm">
                <span className="text-red-400 font-bold">Patient ID: </span>
                {user.userId}
              </p>
            </div>

            {/* TABLE */}
            <table className="min-w-full border-t">
              <thead>
                <tr className="bg-gray-200 text-black text-left">
                  <th className="py-2 px-4 border-b">Service</th>
                  <th className="py-2 px-4 border-b">Fee</th>
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Time</th>
                  <th className="py-2 px-4 border-b text-center">Status</th>
                </tr>
              </thead>

              <tbody>
                {user.appointments.map((appt) => (
                  <tr key={appt._id} className="hover:bg-gray-100 border-b">
                    <td className="py-2 px-4">{appt.service}</td>
                    <td className="py-2 px-4">₹{appt.fee}</td>
                    <td className="py-2 px-4">{appt.date}</td>
                    <td className="py-2 px-4">{appt.time}</td>

                    <td className="py-2 px-4 text-center">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          appt.status === "completed"
                            ? "bg-green-600"
                            : appt.status === "pending"
                            ? "bg-yellow-500"
                            : appt.status === "cancelled"
                            ? "bg-red-600"
                            : "bg-gray-500"
                        }`}
                      >
                        {appt.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
      )}  
    </div>
  );
};

export default DoctorDashboard;
 