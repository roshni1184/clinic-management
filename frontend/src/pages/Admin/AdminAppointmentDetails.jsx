import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const AdminAppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [error, setError] = useState("");

  const token =
    localStorage.getItem("adminToken") || localStorage.getItem("token");

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/appointments/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setAppointment(data.appointment);
        else setError(data.message || "Failed to fetch details");
      } catch (err) {
        setError("Failed to fetch details");
        console.error(err);
      }
    };
    fetchAppointment();
  }, [id, token]);

  if (error)
    return (
      <div className="p-6 text-center text-red-500 text-lg font-semibold">
        {error}
      </div>
    );

  if (!appointment)
    return (
      <div className="p-6 text-center text-gray-400 text-lg">
        Loading details...
      </div>
    );

  return (
    <div className="p-8 min-h-screen bg-white text-white">
      <h1 className="text-4xl font-bold mb-10 text-[#e63946] text-center tracking-wider">
        Appointment Receipt
      </h1>

      <div className="max-w-3xl mx-auto space-y-8">
        {/* Patient Details */}
        <SectionCard title="Patient & Contact">
          <Row label="Patient ID" value={appointment.userId} />
          <Row label="Name" value={appointment.name || appointment.user?.name} />
          <Row label="Phone" value={appointment.phone || appointment.user?.phone} />
          <Row label="Email" value={appointment.email || appointment.user?.email} />
        </SectionCard>

        {/* Appointment Details */}
        <SectionCard title="Appointment Details">
          <Row label="Appointment ID" value={appointment._id} />
          <Row label="Doctor Name" value={appointment.doctor?.name} />
          <Row label="Speciality" value={appointment.doctor?.specialization} />
          <Row label="Service" value={appointment.service} />
          <Row
            label="Date"
            value={
              appointment.date
                ? new Date(appointment.date).toLocaleDateString()
                : "N/A"
            }
          />
          <Row label="Time" value={appointment.time} />
          <Row label="Consult Type" value={appointment.type || "Offline"} />
          <Row label="Fee" value={`₹${appointment.fee}`} />
          <Row label="Payment Status" value={appointment.paymentStatus} />
          <Row label="Payment ID" value={appointment.razorpay_payment_id} />
          <Row label="Transaction ID" value={appointment.razorpay_signature} />
        </SectionCard>
      </div>

      <div className="flex justify-center mt-10">
        <Link
          to="/admin/appointments"
          className="bg-[#e63946] hover:bg-[#d62828] text-white px-8 py-2 rounded-lg shadow-lg transition-all duration-300"
        >
          Back to Appointments
        </Link>
      </div>
    </div>
  );
};

// Compact Row component
const Row = ({ label, value }) => (
  <div className="flex items-center py-1">
    <span className="font-semibold w-32 bg-[#2a2a2a] px-2 py-1 rounded text-gray-200">
      {label}
    </span>
    <span className="ml-3 break-all text-gray-100">{value || "N/A"}</span>
  </div>
);

// Section card with hover & shadow
const SectionCard = ({ title, children }) => (
  <div className="bg-[#1f1f1f] rounded-xl shadow-md p-5 hover:shadow-xl transition-shadow duration-300 border-t-4 border-[#e63946]">
    <h2 className="text-2xl font-bold mb-4 text-[#e63946] tracking-wide">{title}</h2>
    {children}
  </div>
);

export default AdminAppointmentDetails;
