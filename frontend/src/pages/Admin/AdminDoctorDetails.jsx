import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const AdminDoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDoctorDetails = async () => {
    try {
      const token = localStorage.getItem("token") || localStorage.getItem("adminToken");
      const res = await axios.get(`${API}/api/admin/doctor/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDoctor(res.data.doctor);
      setAppointments(res.data.appointments);
    } catch (err) {
      console.error("Error fetching doctor details:", err);
      alert("Failed to fetch doctor details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctorDetails();
  }, [id]);

  if (loading)
    return (
      <div className="text-center mt-20 text-xl font-semibold text-white animate-pulse">
        Loading doctor details...
      </div>
    );

  if (!doctor)
    return (
      <div className="text-center mt-20 text-xl font-semibold text-red-500">
        Doctor not found
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-red-600 tracking-tight border-b border-gray-700 pb-2">
        Doctor Details
      </h1>

      {/* Doctor Card */}
      <div className="bg-black text-white rounded-xl shadow-lg p-6 border border-gray-800 mb-10 hover:shadow-xl transition">
        <h2 className="text-2xl font-semibold mb-4 border-b border-gray-700 pb-2 text-red-500">
          Profile Information
        </h2>

        <div className="grid md:grid-cols-2 gap-4">
          <p>
            <strong className="font-semibold text-white">Doctor ID:</strong> {doctor.customId || doctor._id}
          </p>
          <p>
            <strong className="font-semibold text-white">Name:</strong> {doctor.name}
          </p>
          <p>
            <strong className="font-semibold text-white">Email:</strong> {doctor.email}
          </p>
          <p>
            <strong className="font-semibold text-white">Phone:</strong> {doctor.phone || "N/A"}
          </p>
          <p>
            <strong className="font-semibold text-white">Specialization:</strong> {doctor.specialization}
          </p>
          <p>
            <strong className="font-semibold text-white">Experience:</strong> {doctor.experience} years
          </p>

          {doctor.description && (
            <p className="md:col-span-2">
              <strong className="font-semibold text-white">Description:</strong> {doctor.description}
            </p>
          )}

          <p>
            <strong className="font-semibold text-white">Status:</strong>{" "}
            <span
              className={`px-3 py-1 rounded-full text-sm ${
                doctor.status === "Active" ? "bg-green-600" : "bg-red-500"
              }`}
            >
              {doctor.status || "Inactive"}
            </span>
          </p>
        </div>
      </div>

      {/* Appointments */}
      <h2 className="text-3xl font-semibold mb-4 text-red-600 border-b border-gray-700 pb-2">
        Appointments
      </h2>

      {appointments.length > 0 ? (
        <div className="overflow-x-auto bg-black text-white rounded-xl shadow-lg border border-gray-800 p-4 mb-10">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-900 text-white border-b border-gray-700 text-sm">
                <th className="py-3 px-4 text-left">User ID</th>
                <th className="py-3 px-4 text-left">Patient</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Service</th>
                <th className="py-3 px-4 text-left">Date</th>
                <th className="py-3 px-4 text-left">Time</th>
                <th className="py-3 px-4 text-left">Fee</th>
                <th className="py-3 px-4 text-left">Payment</th>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Payment ID</th>
                <th className="py-3 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-800 transition border-b border-gray-700">
                  <td className="py-3 px-4">{appt.userId || "N/A"}</td>
                  <td className="py-3 px-4">{appt.name || appt.user?.name}</td>
                  <td className="py-3 px-4">{appt.email || appt.user?.email}</td>
                  <td className="py-3 px-4">{appt.service}</td>
                  <td className="py-3 px-4">{appt.date}</td>
                  <td className="py-3 px-4">{appt.time}</td>
                  <td className="py-3 px-4 font-semibold">₹{appt.fee}</td>

                  {/* Payment Status Badge */}
                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 text-white rounded-full text-xs font-semibold ${
                        appt.paymentStatus === "Paid"
                          ? "bg-green-600"
                          : appt.paymentStatus === "Failed"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {appt.paymentStatus}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-xs break-all">{appt.razorpay_order_id || "-"}</td>
                  <td className="py-3 px-4 text-xs break-all">{appt.razorpay_payment_id || "-"}</td>

                  {/* Appointment Status Badge */}
                  <td className="py-3 px-4 text-center">
                    <span
                      className={`px-3 py-1 text-white rounded-full text-xs font-semibold ${
                        appt.status === "confirmed"
                          ? "bg-green-600"
                          : appt.status === "pending"
                          ? "bg-yellow-500"
                          : appt.status === "completed"
                          ? "bg-blue-600"
                          : appt.status === "cancelled"
                          ? "bg-red-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {appt.status?.charAt(0).toUpperCase() + appt.status?.slice(1) || "N/A"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-400 text-lg">No appointments found.</p>
      )}

      <Link
        to="/admin/doctors"
        className="inline-block bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg shadow-md transition text-lg"
      >
        ⬅ Back to Doctors
      </Link>
    </div>
  );
};

export default AdminDoctorDetails;
