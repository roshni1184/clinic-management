import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import API from "../../utils/api";


const DoctorUserDetails = () => {
  const { id } = useParams(); // patient/user id
  const [user, setUser] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem("token"); // doctor token
      if (!token) {
        setError("⚠ Please login first.");
        setLoading(false);
        return;
      }

      const res = await axios.get(
        `${API}/api/doctors/user/${id}`, // make sure this matches your backend route
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data.user);
      setAppointments(res.data.appointments || []);
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "❌ Failed to fetch user details."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [id]);

  if (loading)
    return <div className="text-center mt-20">Loading user details...</div>;
  if (error)
    return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (!user) return <div className="text-center mt-20">User not found</div>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Patient Details</h1>

      {/* ===== User Info Section ===== */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        <div>
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Account Information
          </h2>
          <p className="mb-2"><strong>User ID:</strong> {user._id}</p>
          <p className="mb-2">
            <strong>Joined On:</strong> {new Date(user.createdAt).toLocaleDateString("en-IN")}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4 border">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Contact Information</h2>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> <span className="text-blue-600">{user.email}</span></p>
          <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
        </div>
      </div>

      {/* ===== Appointments Table ===== */}
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Appointments</h2>

      {appointments.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border mb-8">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4 border-b">Doctor</th>
                <th className="py-2 px-4 border-b">Specialization</th>
                <th className="py-2 px-4 border-b">Date</th>
                <th className="py-2 px-4 border-b">Time</th>
                <th className="py-2 px-4 border-b">Service</th>
                <th className="py-2 px-4 border-b">Fee</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50 border-b">
                  <td className="py-2 px-4">{appt.doctor?.name}</td>
                  <td className="py-2 px-4">{appt.doctor?.specialization}</td>
                  <td className="py-2 px-4">{appt.date}</td>
                  <td className="py-2 px-4">{appt.time}</td>
                  <td className="py-2 px-4">{appt.service}</td>
                  <td className="py-2 px-4">₹{appt.fee}</td>
                  <td className="py-2 px-4">{appt.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No appointments found for this user.</p>
      )}

      <div className="flex justify-center mt-8">
        <Link
          to="/doctor/appointments"
          className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-2 rounded-md"
        >
          Back to Appointments
        </Link>
      </div>
    </div>
  );
};

export default DoctorUserDetails;
