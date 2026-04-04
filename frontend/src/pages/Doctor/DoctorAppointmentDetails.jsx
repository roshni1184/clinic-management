import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../api/api"; 


const DoctorAppointmentDetails = () => {
  const { id } = useParams();
  const [appointment, setAppointment] = useState(null);
  const [patientNotes, setPatientNotes] = useState({ notes: [], medicines: [], reports: [] });
  const [labReports, setLabReports] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const [showNotesInput, setShowNotesInput] = useState(false);
  const [newNote, setNewNote] = useState("");
  const [newMedicines, setNewMedicines] = useState("");
  const [newReports, setNewReports] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [currentReportFile, setCurrentReportFile] = useState("");

  useEffect(() => {
  const fetchAll = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/appointments/doctor/appointment/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );


        const data = await res.json();
        if (data.success) {
          setAppointment(data.appointment);
          fetchPatientNotes();

          const patientMongoId = data.appointment.user?._id;
          if (patientMongoId) fetchLabReports(patientMongoId);
        } else {
          setError(data.message);
        }
      } catch (err) {
        setError("Failed to load details.");
      }
    };

    const fetchPatientNotes = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/patient-notes/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setPatientNotes(data.patientNotes);
      } catch {}
    };

    const fetchLabReports = async (patientMongoId) => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/lab-report/doctor/${patientMongoId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.success) setLabReports(data.reports);
      } catch {}
    };

    fetchAll();
  }, [id, token]);

  const handleSaveNotes = async () => {
    const notesArray = newNote.split(",").map(n => n.trim()).filter(Boolean);
    const medicinesArray = newMedicines.split(",").map(m => m.trim()).filter(Boolean);
    const reportsArray = newReports.split(",").map(r => r.trim()).filter(Boolean);

    if (!notesArray.length && !medicinesArray.length && !reportsArray.length)
      return alert("Add at least one note");

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/patient-notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          notes: notesArray,
          medicines: medicinesArray,
          reports: reportsArray,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setPatientNotes(data.patientNotes);
        setShowNotesInput(false);
        setNewNote("");
        setNewMedicines("");
        setNewReports("");
      }
    } catch {}
  };

  const handleEditNotes = () => {
    setNewNote(patientNotes.notes.join(", "));
    setNewMedicines(patientNotes.medicines.join(", "));
    setNewReports(patientNotes.reports.join(", "));
    setShowNotesInput(true);
  };

  const openReportModal = (file) => {
    setCurrentReportFile(file);
    setShowModal(true);
  };

  const getFullFileUrl = (file) =>
    `${API}${file.startsWith("/") ? "" : "/"}${file}`;

  if (error)
    return <p className="text-center text-red-600 text-xl mt-10">{error}</p>;

  if (!appointment)
    return <p className="text-center text-gray-600 mt-10">Loading...</p>;

  const user = appointment.user || {};

  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <h1 className="text-4xl font-extrabold text-center text-red-600 mb-10">
        Appointment Details
      </h1>

      {/* SEND TO LAB */}
      <div className="text-center mb-8">
        <Link
          to={`/doctor/send-lab/${appointment._id}`}
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Send to Lab Test
        </Link>
      </div>

      {/* MAIN CARD */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-6 relative">

        {/* Add Notes Button */}
        {!showNotesInput && (
          <button
            onClick={handleEditNotes}
            className="absolute top-5 right-5 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-black transition"
          >
            Add / Edit Notes
          </button>
        )}

        {/* NOTES INPUT */}
        {showNotesInput && (
          <div className="bg-gray-100 border p-4 rounded-lg mb-6">
            <h3 className="text-xl font-semibold text-black mb-3">Add Notes</h3>

            <textarea
              className="w-full border p-2 rounded"
              rows="3"
              placeholder="Notes (comma separated)"
              value={newNote}
              onChange={(e) => setNewNote(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded mt-2"
              placeholder="Medicines (comma separated)"
              value={newMedicines}
              onChange={(e) => setNewMedicines(e.target.value)}
            />

            <input
              className="w-full border p-2 rounded mt-2"
              placeholder="Reports (comma separated)"
              value={newReports}
              onChange={(e) => setNewReports(e.target.value)}
            />

            <div className="flex space-x-3 mt-3">
              <button
                onClick={handleSaveNotes}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-black transition"
              >
                Save
              </button>
              <button
                onClick={() => setShowNotesInput(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* PATIENT SECTION */}
        <h2 className="text-xl font-bold text-black mt-2 mb-3">Patient Details</h2>
        <div className="bg-white border p-4 rounded-lg shadow-sm mb-6">
          <Row label="Patient ID" value={appointment.userId} />
          <Row label="Name" value={user.name || appointment.name} />
          <Row label="Phone" value={user.phone || appointment.phone} />
          <Row label="Email" value={user.email || appointment.email} />
        </div>

        {/* APPOINTMENT DETAILS */}
        <h2 className="text-xl font-bold text-black mb-3">Appointment Info</h2>
        <div className="bg-white border p-4 rounded-lg shadow-sm mb-6 space-y-2">
          <Row label="Service" value={appointment.service} />
          <Row label="Doctor" value={appointment.doctor?.name} />
          <Row label="Fee" value={`₹${appointment.fee}`} />
          <Row label="Date" value={appointment.date} />
          <Row label="Time" value={appointment.time} />
          <Row label="Status" value={appointment.status} />
          <Row label="Payment" value={appointment.paymentStatus} />
        </div>

        {/* EXISTING NOTES */}
        <div className="bg-gray-100 p-4 rounded-lg space-y-3">
          <h3 className="text-xl font-bold text-black">Patient Notes</h3>

          {patientNotes.notes.length > 0 && (
            <Section title="Notes" color="text-red-600" list={patientNotes.notes} />
          )}

          {patientNotes.medicines.length > 0 && (
            <Section title="Medicines" color="text-black" list={patientNotes.medicines} />
          )}

          {patientNotes.reports.length > 0 && (
            <Section title="Reports" color="text-gray-800" list={patientNotes.reports} />
          )}

          {!patientNotes.notes.length &&
            !patientNotes.medicines.length &&
            !patientNotes.reports.length && (
              <p className="text-gray-500">No notes added yet.</p>
            )}
        </div>

        {/* LAB REPORTS */}
        <div className="mt-6 bg-gray-100 p-4 rounded-lg">
          <h3 className="text-xl font-bold text-black mb-3">Lab Reports</h3>

          {labReports.length === 0 ? (
            <p className="text-gray-500">No lab reports available.</p>
          ) : (
            <ul className="space-y-3">
              {labReports.map((r) => (
                <li key={r._id} className="bg-white p-3 rounded shadow flex justify-between">
                  <div>
                    <p><b>Type:</b> {r.reportType}</p>
                    <p><b>Status:</b> {r.status}</p>
                  </div>

                  {r.reportFile && (
                    <button
                      onClick={() => openReportModal(r.reportFile)}
                      className="text-red-600 underline hover:text-black"
                    >
                      View File
                    </button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* BACK BUTTON */}
      <div className="text-center mt-8">
        <Link
          to="/doctor/appointments"
          className="bg-black text-white px-6 py-2 rounded-lg hover:bg-red-700 transition"
        >
          Back
        </Link>
      </div>

      {/* REPORT MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg p-6 relative max-w-3xl w-full">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-red-600 font-black text-xl"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold mb-4">Lab Report</h3>

            {currentReportFile.endsWith(".pdf") ? (
              <iframe src={getFullFileUrl(currentReportFile)} className="w-full h-96"></iframe>
            ) : (
              <img
                src={getFullFileUrl(currentReportFile)}
                className="w-full max-h-[500px] object-contain"
                alt="Report"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/* Helper Row Component */
const Row = ({ label, value }) => (
  <div className="flex border-b py-2">
    <span className="font-semibold w-1/3">{label}:</span>
    <span className="w-2/3 text-gray-700">{value || "N/A"}</span>
  </div>
);

const Section = ({ title, color, list }) => (
  <div>
    <h4 className={`font-bold ${color}`}>{title}:</h4>
    <ul className="list-disc ml-5">
      {list.map((i, idx) => (
        <li key={idx}>{i}</li>
      ))}
    </ul>
  </div>
);

export default DoctorAppointmentDetails;
