// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const LabPendingReports = () => {
//   const [reports, setReports] = useState([]);
//   const [labResult, setLabResult] = useState("");
//   const [file, setFile] = useState(null);

//   const token = localStorage.getItem("token");

//   // Fetch pending reports
//   const fetchPending = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/lab-report/pending", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setReports(res.data.reports || []);
//     } catch (err) {
//       console.error("Failed to fetch pending reports:", err);
//     }
//   };

//   useEffect(() => {
//     fetchPending();
//   }, []);

//   const handleUpdate = async (reportId) => {
//     try {
//       const formData = new FormData();
//       formData.append("labResult", labResult);
//       formData.append("status", "Completed");
//       if (file) formData.append("reportFile", file);

//       await axios.put(
//         `http://localhost:5000/api/lab-report/update/${reportId}`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       alert("Report Uploaded Successfully!");
//       setLabResult("");
//       setFile(null);
//       fetchPending();
//     } catch (err) {
//       console.error("Failed to update report:", err);
//       alert("Failed to upload report.");
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
//         Pending Lab Reports
//       </h2>

//       {reports.length === 0 ? (
//         <p className="text-gray-500 text-center mt-6">No pending reports found.</p>
//       ) : (
//         <div className="space-y-6">
//           {reports.map((r) => (
//             <div
//               key={r._id}
//               className="border-l-8 border-red-600 bg-black text-white p-6 rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-200"
//             >
//               <h3 className="text-xl font-bold mb-2 text-red-400">{r.reportType}</h3>
//               <p>
//                 <span className="font-semibold">Patient Name:</span> {r.patientId?.name}
//               </p>
//               <p>
//                 <span className="font-semibold">Patient ID:</span> {r.patientId?.userId}
//               </p>
//               <p>
//                 <span className="font-semibold">Doctor:</span> {r.doctorId?.name}
//               </p>

//               <textarea
//                 placeholder="Lab Result / Remark"
//                 className="border border-gray-300 rounded p-2 w-full mt-4 text-black"
//                 value={labResult}
//                 onChange={(e) => setLabResult(e.target.value)}
//               />

//               <input
//                 type="file"
//                 className="mt-3 text-white"
//                 onChange={(e) => setFile(e.target.files[0])}
//               />

//               <button
//                 onClick={() => handleUpdate(r._id)}
//                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 mt-4 rounded transition-all"
//               >
//                 Upload Report
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LabPendingReports;


import React, { useEffect, useState } from "react";
import axios from "axios";

const LabPendingReports = () => {
  const [reports, setReports] = useState([]);
  const [labResults, setLabResults] = useState({}); // ✅ per report result
  const [files, setFiles] = useState({}); // ✅ per report file

  const token = localStorage.getItem("token");

  // Fetch pending reports
  const fetchPending = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/lab-report/pending",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setReports(res.data.reports || []);
    } catch (err) {
      console.error("Failed to fetch pending reports:", err);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  // Handle update
  const handleUpdate = async (reportId) => {
    try {
      const formData = new FormData();
      formData.append("labResult", labResults[reportId] || "");
      formData.append("status", "Completed");

      if (files[reportId]) {
        formData.append("reportFile", files[reportId]);
      }

      await axios.put(
        `http://localhost:5000/api/lab-report/update/${reportId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Report Uploaded Successfully!");

      // reset only that report
      setLabResults((prev) => ({ ...prev, [reportId]: "" }));
      setFiles((prev) => ({ ...prev, [reportId]: null }));

      fetchPending();
    } catch (err) {
      console.error("Failed to update report:", err);
      alert("❌ Failed to upload report.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
        Pending Lab Reports
      </h2>

      {reports.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">
          No pending reports found.
        </p>
      ) : (
        <div className="space-y-6">
          {reports.map((r) => (
            <div
              key={r._id}
              className="border-l-8 border-red-600 bg-black text-white p-6 rounded-xl shadow-lg hover:scale-[1.02] transition-transform duration-200"
            >
              <h3 className="text-xl font-bold mb-2 text-red-400">
                {r.reportType}
              </h3>

              <p>
                <span className="font-semibold">Patient Name:</span>{" "}
                {r.patientId?.name}
              </p>

              <p>
                <span className="font-semibold">Patient ID:</span>{" "}
                {r.patientId?.userId}
              </p>

              <p>
                <span className="font-semibold">Doctor:</span>{" "}
                {r.doctorId?.name}
              </p>

              {/* ✅ TEXTAREA FIXED */}
              <textarea
                placeholder="Lab Result / Remark"
                className="border border-gray-300 rounded p-2 w-full mt-4 text-white"
                value={labResults[r._id] || ""}
                onChange={(e) =>
                  setLabResults({
                    ...labResults,
                    [r._id]: e.target.value,
                  })
                }
              />

              {/* ✅ FILE FIXED */}
              <input
                type="file"
                className="mt-3 text-white"
                onChange={(e) =>
                  setFiles({
                    ...files,
                    [r._id]: e.target.files[0],
                  })
                }
              />

              <button
                onClick={() => handleUpdate(r._id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 mt-4 rounded transition-all"
              >
                Upload Report
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LabPendingReports;
