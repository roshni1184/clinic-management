import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../utils/api"; 


const UserLabReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentReportFile, setCurrentReportFile] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          setError("⚠ User not logged in.");
          setLoading(false);
          return;
        }

        const userId = user.id;
        if (!userId) {
          setError("User ID not found.");
          setLoading(false);
          return;
        }

        const res = await axios.get(
          `${API}/api/lab-report/user/${userId}`
        );

        if (res.data.success) {
          setReports(res.data.reports || []);
        } else {
          setError("Failed to fetch reports.");
        }
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("❌ Error fetching reports from server.");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, []);

  const openReportModal = (file) => {
    setCurrentReportFile(file);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setCurrentReportFile("");
  };

  const getFullFileUrl = (filePath) => {
    if (!filePath) return "";
    return `${API}${filePath.startsWith("/") ? "" : "/"}${filePath}`;
  };

  if (loading)
    return (
      <p className="p-6 text-center text-gray-600 font-medium text-lg">
        Loading reports...
      </p>
    );
  if (error)
    return (
      <p className="p-6 text-center text-red-500 font-medium text-lg">{error}</p>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-8 text-red-500">My Lab Reports</h2>

      {reports.length === 0 ? (
        <p className="text-gray-500 text-lg">No reports available.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reports.map((r) => (
            <div
              key={r._id}
              className="bg-white border border-gray-200 rounded-xl shadow-md p-5 hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-lg text-gray-800">{r.reportType}</h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    r.status === "Completed"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {r.status}
                </span>
              </div>

              <div className="mb-2 text-gray-600">
                <p>
                  <span className="font-medium">Doctor:</span> {r?.doctorId?.name || "Not assigned"}
                </p>
                <p>
                  <span className="font-medium">Patient:</span> {r?.patientId?.name || "N/A"}
                </p>
                {r.description && (
                  <p>
                    <span className="font-medium">Description:</span> {r.description}
                  </p>
                )}
              </div>

              {r.labResult && (
                <p className="mb-2 text-gray-800 font-medium">Lab Result: {r.labResult}</p>
              )}

              {/* Modal Trigger */}
              {r.reportFile && (
                <button
                  onClick={() => openReportModal(r.reportFile)}
                  className="inline-block bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm mb-2 transition"
                >
                  View Report
                </button>
              )}

              <p className="text-gray-400 text-sm mt-3">
                Reported on: {new Date(r.reportDate || r.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-3xl w-full relative border border-red-500">
            <button
              className="absolute top-3 right-3 text-red-500 text-xl font-bold"
              onClick={closeModal}
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-3 text-red-400">Report Preview</h3>

            {currentReportFile.endsWith(".pdf") ? (
              <iframe
                src={getFullFileUrl(currentReportFile)}
                className="w-full h-96 border border-red-600"
                title="PDF Report"
              />
            ) : (
              <img
                src={getFullFileUrl(currentReportFile)}
                alt="Lab Report"
                className="w-full h-auto max-h-[500px] rounded border border-red-600"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserLabReports;
