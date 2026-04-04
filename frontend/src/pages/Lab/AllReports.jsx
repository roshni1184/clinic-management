// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AllReports = () => {
//   const [reports, setReports] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         setLoading(true);
//         const res = await axios.get("${API}/api/lab-report/all", {
//           headers: { Authorization: `Bearer ${token}` },
//         });

//         if (res.data.success) setReports(res.data.reports);
//         else setError("Failed to fetch reports");
//       } catch (err) {
//         console.error("Error fetching reports:", err.response || err);
//         setError(
//           err.response?.data?.message ||
//             "Something went wrong while fetching reports"
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, [token]);

//   if (loading) return <p className="p-6 text-center text-gray-500">Loading reports...</p>;
//   if (error) return <p className="p-6 text-center text-red-500">{error}</p>;

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">All Lab Reports</h2>

//       {reports.length === 0 ? (
//         <p className="text-center text-gray-500">No reports found.</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse border border-gray-700 text-white">
//             <thead className="bg-red-600">
//               <tr>
//                 <th className="p-3 border">Patient Name</th>
//                 <th className="p-3 border">Doctor Name</th>
//                 <th className="p-3 border">Report Type</th>
//                 <th className="p-3 border">Description</th>
//                 <th className="p-3 border">Status</th>
//                 <th className="p-3 border">Report Date</th>
//                 <th className="p-3 border">File</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reports.map((r, idx) => (
//                 <tr
//                   key={r._id}
//                   className={idx % 2 === 0 ? "bg-black" : "bg-gray-900"}
//                 >
//                   <td className="p-2 border">{r.patientId?.name || "N/A"}</td>
//                   <td className="p-2 border">{r.doctorId?.name || "N/A"}</td>
//                   <td className="p-2 border">{r.reportType}</td>
//                   <td className="p-2 border">{r.description}</td>
//                   <td className="p-2 border text-red-400 font-semibold">{r.status}</td>
//                   <td className="p-2 border">
//                     {r.reportDate
//                       ? new Date(r.reportDate).toLocaleString()
//                       : "N/A"}
//                   </td>
//                   <td className="p-2 border">
//                     {r.reportFile ? (
//                       <a
//                         href={`${API}${r.reportFile}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-red-500 hover:underline"
//                       >
//                         View File
//                       </a>
//                     ) : (
//                       "N/A"
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllReports;






import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../utils/api";


const AllReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    reportType: "",
    description: "",
    status: "",
  });

  const [newFile, setNewFile] = useState(null);

  const [previewFile, setPreviewFile] = useState(null); // ✅ ADDED

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await axios.get(
          `${API}/api/lab-report/all`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (res.data.success) {
          setReports(res.data.reports);
        } else {
          setError("Failed to fetch reports");
        }
      } catch (err) {
        console.error(err);
        setError("Something went wrong while fetching reports");
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [token]);

  const handleEditClick = (report) => {
    setEditingId(report._id);
    setEditForm({
      reportType: report.reportType,
      description: report.description,
      status: report.status,
    });
    setNewFile(null);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setNewFile(null);
  };

  const handleSaveEdit = async (id) => {
    try {
      const formData = new FormData();
      formData.append("reportType", editForm.reportType);
      formData.append("description", editForm.description);
      formData.append("status", editForm.status);

      if (newFile) {
        formData.append("reportFile", newFile);
      }

      const res = await axios.put(
        `${API}/api/lab-report/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setReports(
        reports.map((r) => (r._id === id ? res.data.report : r))
      );

      setEditingId(null);
      setNewFile(null);
      alert("Report updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update report");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this report?"))
      return;

    try {
      await axios.delete(
        `${API}/api/lab-report/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setReports(reports.filter((r) => r._id !== id));
      alert("Report deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete report");
    }
  };

  if (loading)
    return <p className="p-6 text-center text-gray-500">Loading reports...</p>;
  if (error)
    return <p className="p-6 text-center text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">
        All Lab Reports
      </h2>

      {reports.length === 0 ? (
        <p className="text-center text-gray-500">No reports found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-700 text-white">
            <thead className="bg-red-600">
              <tr>
                <th className="p-3 border">Patient ID</th>
                <th className="p-3 border">Patient Name</th>
                <th className="p-3 border">Doctor Name</th>
                <th className="p-3 border">Report Type</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">File</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {reports.map((r, idx) => (
                <tr
                  key={r._id}
                  className={idx % 2 === 0 ? "bg-black" : "bg-gray-900"}
                >
                  <td className="p-2 border text-red-400 font-semibold">
                    {r.patientId?.userId || "N/A"}
                  </td>

                  <td className="p-2 border">
                    {r.patientId?.name || "N/A"}
                  </td>

                  <td className="p-2 border">
                    {r.doctorId?.name || "N/A"}
                  </td>

                  <td className="p-2 border">
                    {editingId === r._id ? (
                      <input
                        type="text"
                        value={editForm.reportType}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            reportType: e.target.value,
                          })
                        }
                        className="bg-gray-800 text-white border px-2 py-1 rounded"
                      />
                    ) : (
                      r.reportType
                    )}
                  </td>

                  <td className="p-2 border">
                    {editingId === r._id ? (
                      <input
                        type="text"
                        value={editForm.description}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            description: e.target.value,
                          })
                        }
                        className="bg-gray-800 text-white border px-2 py-1 rounded"
                      />
                    ) : (
                      r.description
                    )}
                  </td>

                  <td className="p-2 border">
                    {editingId === r._id ? (
                      <select
                        value={editForm.status}
                        onChange={(e) =>
                          setEditForm({
                            ...editForm,
                            status: e.target.value,
                          })
                        }
                        className="bg-gray-800 text-white border px-2 py-1 rounded"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                    ) : (
                      r.status
                    )}
                  </td>

                  {/* ✅ FIXED FILE VIEW */}
                  <td className="p-2 border">
                    {editingId === r._id ? (
                      <input
                        type="file"
                        onChange={(e) => setNewFile(e.target.files[0])}
                        className="text-white"
                      />
                    ) : r.reportFile ? (
                      <button
                        onClick={() =>
                          setPreviewFile(
                            `${API}${r.reportFile}`
                          )
                        }
                        className="text-red-500 hover:underline"
                      >
                        View File
                      </button>
                    ) : (
                      "N/A"
                    )}
                  </td>

                  <td className="p-2 border text-center space-x-2">
                    {editingId === r._id ? (
                      <>
                        <button
                          className="bg-green-600 px-2 py-1 rounded"
                          onClick={() => handleSaveEdit(r._id)}
                        >
                          Save
                        </button>
                        <button
                          className="bg-gray-600 px-2 py-1 rounded"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="bg-yellow-500 px-2 py-1 rounded"
                          onClick={() => handleEditClick(r)}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-600 px-2 py-1 rounded"
                          onClick={() => handleDelete(r._id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ MODAL PREVIEW */}
      {previewFile && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl overflow-hidden w-[80%] h-[80%] relative">
            <button
              className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded"
              onClick={() => setPreviewFile(null)}
            >
              X
            </button>

            {previewFile.endsWith(".pdf") ? (
              <iframe
                src={previewFile}
                className="w-full h-full"
                title="Report"
              ></iframe>
            ) : (
              <img
                src={previewFile}
                alt="Report"
                className="w-full h-full object-contain"
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AllReports;