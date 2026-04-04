
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import API from "../utils/api"; 

const AdminAppointment = () => {
  const [groupedAppointments, setGroupedAppointments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        `${API}/api/appointments/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data.appointments || [];

      const grouped = data.reduce((acc, a) => {
        const id = a.user?._id || a.userId || "N/A";

        if (!acc[id]) {
          acc[id] = {
            userId: id,
            name: a.user?.name || a.name || "N/A",
            email: a.user?.email || a.email || "N/A",
            phone: a.user?.phone || a.phone || "N/A",
            appointments: [],
          };
        }

        acc[id].appointments.push({
          _id: a._id,
          doctorName: a.doctor?.name || "N/A",
          service: a.service || "General",
          fee: a.fee || 0,
          date: a.date,
          time: a.time,
          status: a.status,
        });

        return acc;
      }, {});

      setGroupedAppointments(grouped);
    } catch (err) {
      setError("Failed to fetch appointments");
    } finally {
      setLoading(false);
    }
  };

  const handleView = (id) => navigate(`/admin/appointment/${id}`);

  /* 🔴 Delete API */
  const handleDelete = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.delete(
        `${API}/api/appointments/admin/delete/${deleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDeleteId(null);
      fetchAppointments();
    } catch (err) {
      alert("Delete failed");
    }
  };

  if (loading) return <p className="text-center mt-10 text-white">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  const users = Object.values(groupedAppointments);

  return (
    <div className="p-4 max-w-6xl mx-auto">

      <h1 className="text-2xl font-bold mb-6 text-red-600">
        Manage Appointments
      </h1>

      {users.map((user) => (
        <div
          key={user.userId}
          className="bg-black text-white rounded-xl mb-6 overflow-hidden border border-gray-700"
        >
          {/* USER INFO */}
          <div className="bg-gray-900 px-4 py-3 border-b border-gray-700">
            <p><span className="text-red-500 font-semibold">Name:</span> {user.name}</p>
            <p><span className="text-red-500 font-semibold">Email:</span> {user.email}</p>
            <p><span className="text-red-500 font-semibold">Phone:</span> {user.phone}</p>
          </div>

          {/* TABLE */}
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-900">
                <th className="py-2 px-4">Doctor</th>
                <th className="py-2 px-4">Service</th>
                <th className="py-2 px-4">Fee</th>
                <th className="py-2 px-4">Date</th>
                <th className="py-2 px-4">Time</th>
                <th className="py-2 px-4 text-center">Status</th>
                <th className="py-2 px-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {user.appointments.map((appt) => (
                <tr key={appt._id} className="border-b border-gray-700">
                  <td className="py-2 px-4">{appt.doctorName}</td>
                  <td className="py-2 px-4">{appt.service}</td>
                  <td className="py-2 px-4">₹{appt.fee}</td>
                  <td className="py-2 px-4">{appt.date}</td>
                  <td className="py-2 px-4">{appt.time}</td>

                  <td className="py-2 px-4 text-center">
                    <span className="bg-green-600 px-3 py-1 rounded text-sm">
                      {appt.status}
                    </span>
                  </td>

                  <td className="py-2 px-4 text-center">

                    <button
                      onClick={() => handleView(appt._id)}
                      className="bg-blue-600 px-3 py-1 rounded mr-2"
                    >
                      View
                    </button>

                    <button
                      onClick={() => setDeleteId(appt._id)}
                      className="bg-red-600 px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}

      {/* 🔴 DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl text-center w-[350px]">

            <h2 className="text-xl font-bold mb-3 text-red-600">
              Confirm Delete
            </h2>

            <p className="mb-6">
              Are you sure you want to delete this appointment?
            </p>

            <div className="flex justify-center gap-4">

              <button
                onClick={handleDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes Delete
              </button>

              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminAppointment;
