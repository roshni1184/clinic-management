// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const AdminLabReports = () => {
//   const [reports, setReports] = useState([]);
//   const [stats, setStats] = useState({
//     totalReports: 0,
//     pendingReports: 0,
//     completedReports: 0,
//   });
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [currentReportFile, setCurrentReportFile] = useState("");

//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     reportType: "",
//     status: "",
//     labResult: "",
//   });

//   const [newFile, setNewFile] = useState(null);

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchReports = async () => {
//       try {
//         const [reportsRes, statsRes] = await Promise.all([
//           axios.get("${API}/api/lab-report/all", {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//           axios.get("${API}/api/lab-report/stats", {
//             headers: { Authorization: `Bearer ${token}` },
//           }),
//         ]);

//         if (reportsRes.data.success) setReports(reportsRes.data.reports);
//         if (statsRes.data.success) setStats(statsRes.data);
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         setError("Failed to fetch reports");
//         setLoading(false);
//       }
//     };

//     fetchReports();
//   }, [token]);

//   const openReportModal = (file) => {
//     setCurrentReportFile(file);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setCurrentReportFile("");
//   };

//   const getFullFileUrl = (filePath) => {
//     if (!filePath) return "";
//     return `${API}${
//       filePath.startsWith("/") ? "" : "/"
//     }${filePath}`;
//   };

//   const handleEditClick = (report) => {
//     setEditingId(report._id);
//     setEditForm({
//       reportType: report.reportType,
//       status: report.status,
//       labResult: report.labResult || "",
//     });
//     setNewFile(null);
//   };

//   const handleSaveEdit = async (id) => {
//     try {
//       const formData = new FormData();
//       formData.append("reportType", editForm.reportType);
//       formData.append("status", editForm.status);
//       formData.append("labResult", editForm.labResult);

//       if (newFile) {
//         formData.append("reportFile", newFile);
//       }

//       const res = await axios.put(
//         `${API}/api/lab-report/${id}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setReports(
//         reports.map((r) =>
//           r._id === id ? res.data.report : r
//         )
//       );

//       setEditingId(null);
//       setNewFile(null);
//       alert("Report updated successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update report");
//     }
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this report?"))
//       return;

//     try {
//       await axios.delete(
//         `${API}/api/lab-report/${id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setReports(reports.filter((r) => r._id !== id));
//       alert("Report deleted successfully!");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete report");
//     }
//   };

//   if (loading)
//     return (
//       <p className="text-center mt-10 text-gray-300 text-xl">
//         Loading reports...
//       </p>
//     );
//   if (error)
//     return <p className="text-center mt-10 text-red-500 text-xl">{error}</p>;

//   return (
//     <div className="p-8 min-h-screen bg-black text-white">
//       <h1 className="text-4xl font-bold mb-8 text-center text-red-500 tracking-wide">
//         All Lab Reports
//       </h1>

//       <div className="flex justify-center gap-6 mb-8">
//         <StatCard label="Total Reports" value={stats.totalReports} color="bg-red-600" />
//         <StatCard label="Pending" value={stats.pendingReports} color="bg-yellow-600" />
//         <StatCard label="Completed" value={stats.completedReports} color="bg-green-600" />
//       </div>

//       <div className="overflow-x-auto">
//         <table className="min-w-full border bg-gray-900 text-white rounded-md shadow-lg">
//           <thead className="bg-red-600 text-white">
//             <tr>
//               <th className="px-4 py-3 border">Patient ID</th>
//               <th className="px-4 py-3 border">Patient</th>
//               <th className="px-4 py-3 border">Doctor</th>
//               <th className="px-4 py-3 border">Type</th>
//               <th className="px-4 py-3 border">Status</th>
//               <th className="px-4 py-3 border">Result</th>
//               <th className="px-4 py-3 border">File</th>
//               <th className="px-4 py-3 border">Created At</th>
//               <th className="px-4 py-3 border">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {reports.map((r) => (
//               <tr
//                 key={r._id}
//                 className="text-center border border-gray-700 hover:bg-gray-800 transition"
//               >
//                 <td className="px-3 py-2 border text-red-400 font-semibold">
//                   {r.patientId?.userId || "N/A"}
//                 </td>
//                 <td className="px-3 py-2 border">
//                   {r.patientId?.name || "N/A"}
//                 </td>
//                 <td className="px-3 py-2 border">
//                   {r.doctorId?.name || "N/A"}
//                 </td>

//                 <td className="px-3 py-2 border">
//                   {editingId === r._id ? (
//                     <input
//                       value={editForm.reportType}
//                       onChange={(e) =>
//                         setEditForm({ ...editForm, reportType: e.target.value })
//                       }
//                       className="bg-gray-800 px-2 py-1 rounded"
//                     />
//                   ) : (
//                     r.reportType
//                   )}
//                 </td>

//                 <td className="px-3 py-2 border">
//                   {editingId === r._id ? (
//                     <select
//                       value={editForm.status}
//                       onChange={(e) =>
//                         setEditForm({ ...editForm, status: e.target.value })
//                       }
//                       className="bg-gray-800 px-2 py-1 rounded"
//                     >
//                       <option value="Pending">Pending</option>
//                       <option value="Completed">Completed</option>
//                     </select>
//                   ) : (
//                     r.status
//                   )}
//                 </td>

//                 <td className="px-3 py-2 border">
//                   {editingId === r._id ? (
//                     <input
//                       value={editForm.labResult}
//                       onChange={(e) =>
//                         setEditForm({ ...editForm, labResult: e.target.value })
//                       }
//                       className="bg-gray-800 px-2 py-1 rounded"
//                     />
//                   ) : (
//                     r.labResult || "N/A"
//                   )}
//                 </td>

//                 <td className="px-3 py-2 border">
//                   {editingId === r._id ? (
//                     <input
//                       type="file"
//                       onChange={(e) => setNewFile(e.target.files[0])}
//                       className="text-white"
//                     />
//                   ) : r.reportFile ? (
//                     <button
//                       className="text-red-500 underline"
//                       onClick={() => openReportModal(r.reportFile)}
//                     >
//                       View File
//                     </button>
//                   ) : (
//                     "No file"
//                   )}
//                 </td>

//                 <td className="px-3 py-2 border">
//                   {new Date(r.createdAt).toLocaleString()}
//                 </td>

//                 <td className="px-3 py-2 border space-x-2">
//                   {editingId === r._id ? (
//                     <>
//                       <button
//                         onClick={() => handleSaveEdit(r._id)}
//                         className="bg-green-600 px-2 py-1 rounded"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setEditingId(null)}
//                         className="bg-gray-600 px-2 py-1 rounded"
//                       >
//                         Cancel
//                       </button>
//                     </>
//                   ) : (
//                     <>
//                       <button
//                         onClick={() => handleEditClick(r)}
//                         className="bg-yellow-500 px-2 py-1 rounded"
//                       >
//                         Edit
//                       </button>
//                       <button
//                         onClick={() => handleDelete(r._id)}
//                         className="bg-red-600 px-2 py-1 rounded"
//                       >
//                         Delete
//                       </button>
//                     </>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//           <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-3xl w-full relative border border-red-500">
//             <button
//               className="absolute top-3 right-3 text-red-500 text-xl font-bold"
//               onClick={closeModal}
//             >
//               ✕
//             </button>

//             <h3 className="text-xl font-semibold mb-3 text-red-400">
//               Report Preview
//             </h3>

//             {currentReportFile.endsWith(".pdf") ? (
//               <iframe
//                 src={getFullFileUrl(currentReportFile)}
//                 className="w-full h-96 border border-red-600"
//                 title="PDF Report"
//               />
//             ) : (
//               <img
//                 src={getFullFileUrl(currentReportFile)}
//                 alt="Lab Report"
//                 className="w-full h-auto max-h-[500px] rounded border border-red-600"
//               />
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// const StatCard = ({ label, value, color }) => (
//   <div className={`p-5 rounded shadow-lg text-white ${color} w-44 text-center`}>
//     <p className="text-lg font-semibold">{label}</p>
//     <p className="text-3xl font-bold">{value}</p>
//   </div>
// );

// export default AdminLabReports;




import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const AdminLabReports = () => {
  const [reports, setReports] = useState([]);
  const [stats, setStats] = useState({
    totalReports: 0,
    pendingReports: 0,
    completedReports: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [currentReportFile, setCurrentReportFile] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    reportType: "",
    status: "",
    labResult: "",
  });

  const [newFile, setNewFile] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [reportsRes, statsRes] = await Promise.all([
          axios.get("${API}/api/lab-report/all", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("${API}/api/lab-report/stats", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (reportsRes.data.success) setReports(reportsRes.data.reports);
        if (statsRes.data.success) setStats(statsRes.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch reports");
        setLoading(false);
      }
    };

    fetchReports();
  }, [token]);

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
    return `${API}${
      filePath.startsWith("/") ? "" : "/"
    }${filePath}`;
  };

  const handleEditClick = (report) => {
    setEditingId(report._id);
    setEditForm({
      reportType: report.reportType,
      status: report.status,
      labResult: report.labResult || "",
    });
    setNewFile(null);
  };

  const handleSaveEdit = async (id) => {
    try {
      const formData = new FormData();
      formData.append("reportType", editForm.reportType);
      formData.append("status", editForm.status);
      formData.append("labResult", editForm.labResult);

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

      setReports(reports.map((r) => (r._id === id ? res.data.report : r)));

      setEditingId(null);
      setNewFile(null);

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Report updated successfully!",
        confirmButtonColor: "#dc2626",
      });
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update report",
      });
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this report!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API}/api/lab-report/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setReports(reports.filter((r) => r._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Report deleted successfully!",
        confirmButtonColor: "#dc2626",
      });
    } catch (err) {
      console.error(err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete report",
      });
    }
  };

  if (loading)
    return (
      <p className="text-center mt-10 text-gray-300 text-xl">
        Loading reports...
      </p>
    );

  if (error)
    return <p className="text-center mt-10 text-red-500 text-xl">{error}</p>;

  return (
    <div className="p-8 min-h-screen bg-black text-white">
      <h1 className="text-4xl font-bold mb-8 text-center text-red-500 tracking-wide">
        All Lab Reports
      </h1>

      <div className="flex justify-center gap-6 mb-8">
        <StatCard
          label="Total Reports"
          value={stats.totalReports}
          color="bg-red-600"
        />
        <StatCard
          label="Pending"
          value={stats.pendingReports}
          color="bg-yellow-600"
        />
        <StatCard
          label="Completed"
          value={stats.completedReports}
          color="bg-green-600"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border bg-gray-900 text-white rounded-md shadow-lg">
          <thead className="bg-red-600 text-white">
            <tr>
              <th className="px-4 py-3 border">Patient ID</th>
              <th className="px-4 py-3 border">Patient</th>
              <th className="px-4 py-3 border">Doctor</th>
              <th className="px-4 py-3 border">Type</th>
              <th className="px-4 py-3 border">Status</th>
              <th className="px-4 py-3 border">Result</th>
              <th className="px-4 py-3 border">File</th>
              <th className="px-4 py-3 border">Created At</th>
              <th className="px-4 py-3 border">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reports.map((r) => (
              <tr
                key={r._id}
                className="text-center border border-gray-700 hover:bg-gray-800 transition"
              >
                <td className="px-3 py-2 border text-red-400 font-semibold">
                  {r.patientId?.userId || "N/A"}
                </td>

                <td className="px-3 py-2 border">
                  {r.patientId?.name || "N/A"}
                </td>

                <td className="px-3 py-2 border">
                  {r.doctorId?.name || "N/A"}
                </td>

                <td className="px-3 py-2 border">{r.reportType}</td>

                <td className="px-3 py-2 border">{r.status}</td>

                <td className="px-3 py-2 border">{r.labResult || "N/A"}</td>

                <td className="px-3 py-2 border">
                  {r.reportFile ? (
                    <button
                      className="text-red-500 underline"
                      onClick={() => openReportModal(r.reportFile)}
                    >
                      View File
                    </button>
                  ) : (
                    "No file"
                  )}
                </td>

                <td className="px-3 py-2 border">
                  {new Date(r.createdAt).toLocaleString()}
                </td>

                <td className="px-3 py-2 border space-x-2">
                  <button
                    onClick={() => handleEditClick(r)}
                    className="bg-yellow-500 px-2 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(r._id)}
                    className="bg-red-600 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg max-w-3xl w-full relative border border-red-500">
            <button
              className="absolute top-3 right-3 text-red-500 text-xl font-bold"
              onClick={closeModal}
            >
              ✕
            </button>

            <h3 className="text-xl font-semibold mb-3 text-red-400">
              Report Preview
            </h3>

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

const StatCard = ({ label, value, color }) => (
  <div className={`p-5 rounded shadow-lg text-white ${color} w-44 text-center`}>
    <p className="text-lg font-semibold">{label}</p>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

export default AdminLabReports;