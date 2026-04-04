import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import API from "../../api/api"; 


const UserAppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get(
          `/appointments/user/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        if (res.data.success) {
          setAppointment(res.data.appointment);
        } else {
          setError(res.data.message || "Failed to fetch appointment");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching appointment");
      }
    };
    fetchAppointment();
  }, [id]);

  if (error)
    return (
      <div className="text-center text-red-600 font-bold text-xl mt-8">{error}</div>
    );

  if (!appointment)
    return (
      <div className="text-center text-gray-400 text-xl mt-8 animate-pulse">
        Loading appointment...
      </div>
    );

  const doctor = appointment.doctor || {};

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gradient-to-b from-black via-gray-900 to-black text-white">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center mb-8 md:mb-10 bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-white">
        Appointment Details
      </h1>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-4 lg:gap-6">
        
        {/* LEFT PANEL */}
        <div className="flex flex-col gap-4 flex-1">

          <InfoCard title="User Information" color="red">
            <Row label="Name" value={appointment.name || appointment.user?.name} />
            <Row label="Phone" value={appointment.phone || appointment.user?.phone} />
            <Row label="Email" value={appointment.email || appointment.user?.email} />
          </InfoCard>

          {doctor && (
            <InfoCard title="Doctor Information" color="red">
              <Row label="Doctor Name" value={doctor.name} />
              <Row label="Specialization" value={doctor.specialization} />
              <Row label="Experience" value={`${doctor.experience || 0} years`} />
              <Row label="Email" value={doctor.email} />
              <Row label="Phone" value={doctor.phone} />
            </InfoCard>
          )}

          <InfoCard title="System Info" color="red">
            <Row
              label="Created At"
              value={new Date(appointment.createdAt).toLocaleString()}
            />
          </InfoCard>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex flex-col gap-4 flex-1">
          <InfoCard title="Appointment Details" color="red">
            <Row label="Appointment ID" value={appointment._id} />
            <Row label="Service" value={appointment.service} />
            <Row
              label="Date"
              value={
                appointment?.date
                  ? new Date(appointment.date).toLocaleDateString()
                  : "N/A"
              }
            />
            <Row label="Time" value={appointment.time} />
            <Row label="Type" value={appointment?.type || "Offline"} />
            <Row label="Fee" value={`₹${appointment.fee}`} />
            <StatusRow label="Status" value={appointment.status} />
            <Row label="Reason" value={appointment.reason} />
          </InfoCard>

          <InfoCard title="Payment Information" color="red">
            <StatusRow label="Payment Status" value={appointment.paymentStatus} />
            <Row label="Payment ID" value={appointment.razorpay_payment_id} />
            <Row label="Transaction ID" value={appointment.razorpay_signature} />
          </InfoCard>
        </div>
      </div>

      <div className="flex justify-center mt-8 md:mt-12">
        <Link
          to="/user/my-appointments"
          className="bg-red-600 hover:bg-red-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-xl font-semibold shadow-xl transform hover:-translate-y-1 hover:scale-105 transition-all"
        >
          Back to Appointments
        </Link>
      </div>
    </div>
  );
};

/* -------------------------------------
   Row with perfect alignment
-------------------------------------- */
const Row = ({ label, value }) => (
  <div className="flex py-1 px-2 md:px-3 rounded-md hover:bg-gray-800 transition-colors">
    <span className="font-medium text-gray-300 w-40">{label}:</span>
    <span className="text-white break-all flex-1">{value || "N/A"}</span>
  </div>
);

/* -------------------------------------
   Status Row with NEW COLORS
-------------------------------------- */
const StatusRow = ({ label, value }) => {
  let colorClass = "bg-gray-500";

  if (value?.toLowerCase() === "confirmed") colorClass = "bg-green-500";
  else if (value?.toLowerCase() === "pending") colorClass = "bg-yellow-500";
  else if (value?.toLowerCase() === "cancelled") colorClass = "bg-red-500";
  else if (value?.toLowerCase() === "completed") colorClass = "bg-blue-500"; // ⭐ Completed → Blue
  else if (value?.toLowerCase() === "paid") colorClass = "bg-green-600";     // ⭐ Paid → Green

  return (
    <div className="flex py-1 px-2 md:px-3 rounded-md hover:bg-gray-800 transition-colors">
      <span className="font-medium text-gray-300 w-40">{label}:</span>
      <span className={`text-white px-2 py-1 rounded-full ${colorClass} text-sm`}>
        {value || "N/A"}
      </span>
    </div>
  );
};

/* -------------------------------------
   InfoCard
-------------------------------------- */
const InfoCard = ({ title, color, children }) => (
  <div className="bg-black/40 backdrop-blur-md border border-gray-700 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-red-500/50 transition-shadow duration-300">
    <h2
      className={`text-xl md:text-2xl font-bold mb-3 md:mb-4 ${
        color === "red" ? "text-red-500" : "text-white"
      }`}
    >
      {title}
    </h2>

    <div className="space-y-1 md:space-y-2">{children}</div>
  </div>
);

export default UserAppointmentDetails;
