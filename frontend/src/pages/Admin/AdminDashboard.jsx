// File: src/admin/AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import API from "../../api/api"; 

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("");
  const [stats, setStats] = useState({
    totalDoctors: 0,
    totalUsers: 0,
    totalAppointments: 0,
  });
  const [groupedAppointments, setGroupedAppointments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getUserId = (a) =>
    a.user?.userId || a.userId || "N/A";

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("Please login first");
          setLoading(false);
          return;
        }

        // Fetch Admin Info
        const adminRes = await API.get(`/admin/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminName(adminRes.data.name || "Admin");

        // Fetch Stats
        const statsRes = await API.get(
          `/admin/stats`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setStats({
          totalDoctors: statsRes.data.doctors || 0,
          totalUsers: statsRes.data.users || 0,
          totalAppointments: statsRes.data.appointments || 0,
        });

        // Fetch All Appointments
        const apptRes = await API.geT(
          `/appointments/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const data = apptRes.data.appointments || [];

        if (data.length === 0) {
          setGroupedAppointments({});
          setLoading(false);
          return;
        }

        // Sort by MOST RECENT Appointment
        const sorted = data.sort(
          (a, b) =>
            new Date(b.date + " " + b.time) -
            new Date(a.date + " " + a.time)
        );

        const latest = sorted[0];
        const userId = getUserId(latest);

        // FINAL — Store ONLY ONE USER
        const userGroup = {
          [userId]: {
            userId,
            name: latest.user?.name || latest.name || "N/A",
            email: latest.user?.email || latest.email || "N/A",
            phone: latest.user?.phone || latest.phone || "N/A",
            appointments: [
              {
                _id: latest._id,
                doctorName: latest.doctor?.name || "N/A",
                service: latest.service || "General",
                fee: latest.fee || 0,
                date: latest.date,
                time: latest.time,
                status: latest.status || "pending",
              },
            ],
          },
        };

        // ⭐ Store ONLY ONE USER in State
        setGroupedAppointments(userGroup);
      } catch (err) {
        console.error(err);
        setError(
          err.response?.data?.message ||
            "Failed to fetch dashboard data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleView = (id) => navigate(`/admin/appointment/${id}`);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this appointment?"))
      return;

    try {
      const token = localStorage.getItem("token");
      await API.delete(
        `/appointments/admin/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert("✅ Appointment deleted!");

      // refresh dashboard
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete appointment");
    }
  };

  if (loading)
    return <p className="text-center mt-10 text-white">Loading...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">{error}</p>;

  const users = Object.values(groupedAppointments); // ALWAYS ONLY 1 USER

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h2 className="text-4xl font-bold mb-6 text-black">
        Hello, {adminName}!
      </h2>

      {/* Stats */}
      <div className="flex flex-wrap justify-center gap-6 mb-10">
        <div
          onClick={() => navigate("/admin/doctors")}
          className="bg-black text-white rounded-xl shadow-lg p-6 w-[300px] cursor-pointer hover:scale-105 transition border-l-4 border-red-600"
        >
          <h3 className="text-lg font-semibold">Total Doctors</h3>
          <p className="text-4xl font-bold">{stats.totalDoctors}</p>
        </div>

        <div
          onClick={() => navigate("/admin/users")}
          className="bg-black text-white rounded-xl shadow-lg p-6 w-[300px] cursor-pointer hover:scale-105 transition border-l-4 border-red-600"
        >
          <h3 className="text-lg font-semibold">Total Patients</h3>
          <p className="text-4xl font-bold">{stats.totalUsers}</p>
        </div>

        <div
          onClick={() => navigate("/admin/appointments")}
          className="bg-black text-white rounded-xl shadow-lg p-6 w-[300px] cursor-pointer hover:scale-105 transition border-l-4 border-red-600"
        >
          <h3 className="text-lg font-semibold">Total Appointments</h3>
          <p className="text-4xl font-bold">{stats.totalAppointments}</p>
        </div>
      </div>

      {/* ONE USER + ONE APPOINTMENT */}
      <div className="bg-gray-50 rounded shadow p-4">
        {users.length === 0 ? (
          <p className="text-center text-gray-500">No recent appointment.</p>
        ) : (
          users.map((user) => (
            <div
              key={user.userId}
              className="border border-gray-300 rounded-lg mb-6 overflow-hidden"
            >
              <div className="bg-black px-4 py-3 flex justify-between items-center text-white">
                <div>
                  <p className="font-bold">
                    <span className="text-red-400">Name:</span> {user.name}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="text-red-400">Email:</span> {user.email}
                  </p>
                  <p className="text-sm mt-1">
                    <span className="text-red-400">Phone:</span> {user.phone}
                  </p>
                </div>

                <p className="text-sm">
                  <span className="text-red-400">Patient ID:</span>{" "}
                  {user.userId}
                </p>
              </div>

              <table className="min-w-full border-t">
                <thead>
                  <tr className="bg-gray-200 text-black">
                    <th className="py-2 px-4 border-b">Doctor</th>
                    <th className="py-2 px-4 border-b">Service</th>
                    <th className="py-2 px-4 border-b">Fee</th>
                    <th className="py-2 px-4 border-b">Date</th>
                    <th className="py-2 px-4 border-b">Time</th>
                    <th className="py-2 px-4 border-b text-center">
                      Status
                    </th>
                    <th className="py-2 px-4 border-b text-center">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {user.appointments.map((appt) => (
                    <tr key={appt._id} className="hover:bg-gray-100 border-b">
                      <td className="py-2 px-4">{appt.doctorName}</td>
                      <td className="py-2 px-4">{appt.service}</td>
                      <td className="py-2 px-4">₹{appt.fee}</td>
                      <td className="py-2 px-4">{appt.date}</td>
                      <td className="py-2 px-4">{appt.time}</td>
                      <td className="py-2 px-4 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-white ${
                            appt.status === "confirmed"
                              ? "bg-green-500"
                              : appt.status === "pending"
                              ? "bg-yellow-500"
                              : appt.status === "completed"
                              ? "bg-blue-500"
                              : appt.status === "cancelled"
                              ? "bg-red-500"
                              : "bg-gray-400"
                          }`}
                        >
                          {appt.status}
                        </span>
                      </td>

                      <td className="py-2 px-4 text-center">
                        <button
                          onClick={() => handleView(appt._id)}
                          className="bg-red-600 text-white px-3 py-1 rounded-md text-sm mr-2"
                        >
                          View
                        </button>

                        <button
                          onClick={() => handleDelete(appt._id)}
                          className="bg-black border border-red-600 hover:bg-gray-900 text-white px-3 py-1 rounded-md text-sm"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
