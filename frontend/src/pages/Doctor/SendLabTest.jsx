import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SendLabTest = () => {
  const { id } = useParams(); // appointment id
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [appointment, setAppointment] = useState(null);
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const fetchAppointment = async () => {
      const res = await fetch(
        `http://localhost:5000/api/appointments/doctor/appointment/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await res.json();
      if (data.success) setAppointment(data.appointment);
    };

    fetchAppointment();
  }, [id, token]);

  const handleSend = async () => {
    if (!reportType) return alert("Select report type");

    const res = await fetch("http://localhost:5000/api/lab-report/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        patientId: appointment.user._id,
        doctorId: appointment.doctor._id,
        reportType,
        description,
      }),
    });

    const data = await res.json();
    if (data.success) {
      alert("Report sent to Lab!");
      navigate("/doctor/appointments");
    } else {
      alert(data.message);
    }
  };

  if (!appointment) return <div>Loading...</div>;

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-center">Send to Lab</h2>

      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h3 className="font-semibold">Patient Name:</h3>
        <p>{appointment.user.name}</p>

        <label className="block mt-4 font-semibold">Report Type</label>
        <select
          className="w-full border p-2 rounded"
          value={reportType}
          onChange={(e) => setReportType(e.target.value)}
        >
          <option value="">Select Test</option>
          <option value="Blood Test">Blood Test</option>
          <option value="X-Ray">X-Ray</option>
          <option value="ECG">ECG</option>
          <option value="MRI">MRI</option>
        </select>

        <label className="block mt-4 font-semibold">Description</label>
        <textarea
          className="w-full border p-2 rounded"
          rows="3"
          placeholder="Write notes..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>

        <button
          onClick={handleSend}
          className="mt-6 w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700"
        >
          Send to Lab
        </button>
      </div>
    </div>
  );
};

export default SendLabTest;
