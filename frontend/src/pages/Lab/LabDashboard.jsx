// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom"; // ✅ ADD

// const LabDashboard = () => {
//   const [stats, setStats] = useState({
//     totalReports: 0,
//     pendingReports: 0,
//     completedReports: 0,
//   });

//   const navigate = useNavigate(); // ✅ ADD

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchStats = async () => {
//       try {
//         const res = await axios.get(
//           "${API}/api/lab-report/stats",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         if (res.data) {
//           setStats(res.data);
//         }
//       } catch (error) {
//         console.error("Stats fetch error:", error);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div className="p-6">
//       <h1 className="text-3xl font-bold text-red-600 mb-8 text-center">
//         Lab Dashboard
//       </h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

//         {/* Total Reports */}
//         <div
//           onClick={() => navigate("/lab/reports")} // ✅ ADD
//           className="p-6 bg-black text-white shadow-lg rounded-xl border-l-8 border-red-500 hover:scale-[1.03] transition-transform duration-200 cursor-pointer"
//         >
//           <h2 className="text-xl font-semibold">Total Reports</h2>
//           <p className="text-5xl font-extrabold text-red-500 mt-2">
//             {stats.totalReports}
//           </p>
//         </div>

//         {/* Pending Reports */}
//         <div
//           onClick={() => navigate("/lab/pending-request")} // ✅ ADD
//           className="p-6 bg-black text-white shadow-lg rounded-xl border-l-8 border-yellow-500 hover:scale-[1.03] transition-transform duration-200 cursor-pointer"
//         >
//           <h2 className="text-xl font-semibold">Pending Reports</h2>
//           <p className="text-5xl font-extrabold text-yellow-400 mt-2">
//             {stats.pendingReports}
//           </p>
//         </div>

//         {/* Completed Reports */}
//         <div
//           onClick={() => navigate("/lab/completed-reports")} // ✅ ADD
//           className="p-6 bg-black text-white shadow-lg rounded-xl border-l-8 border-green-500 hover:scale-[1.03] transition-transform duration-200 cursor-pointer"
//         >
//           <h2 className="text-xl font-semibold">Completed Reports</h2>
//           <p className="text-5xl font-extrabold text-green-400 mt-2">
//             {stats.completedReports}
//           </p>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default LabDashboard;



import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../utils/api"; 


const LabDashboard = () => {
  const [stats, setStats] = useState([
    { title: "Total Reports", count: 0, status: "all" },
    { title: "Completed", count: 0, status: "Completed" },
    { title: "Pending", count: 0, status: "Pending" },
  ]);

  const [reports, setReports] = useState([]);
  const [groupedReports, setGroupedReports] = useState({});
  const [activeFilter, setActiveFilter] = useState("all");
  const [previewFile, setPreviewFile] = useState(null); // ✅ modal

  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  const getPatientId = (r) =>
    r.patientId?.userId || r.patientId?._id || "N/A";

  // Fetch Reports
  const fetchReports = async () => {
    try {
      const res = await axios.get(
        `${API}/api/lab-report/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const data = res.data.reports || [];

      setReports(data);

      const total = data.length;
      const completed = data.filter((r) => r.status === "Completed").length;
      const pending = data.filter((r) => r.status === "Pending").length;

      setStats([
        { title: "Total Reports", count: total, status: "all" },
        { title: "Completed", count: completed, status: "Completed" },
        { title: "Pending", count: pending, status: "Pending" },
      ]);

      applyFilter("all", data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filter + Group
  const applyFilter = (filterStatus, sourceReports = reports) => {
    setActiveFilter(filterStatus);

    let filtered =
      filterStatus === "all"
        ? sourceReports
        : sourceReports.filter((r) => r.status === filterStatus);

    const grouped = filtered.reduce((acc, r) => {
      const pid = getPatientId(r);

      if (!acc[pid]) {
        acc[pid] = {
          userId: pid,
          name: r.patientId?.name || "N/A",
          reports: [],
        };
      }

      acc[pid].reports.push({
        _id: r._id,
        reportType: r.reportType,
        status: r.status,
        file: r.reportFile,
      });

      return acc;
    }, {});

    setGroupedReports(grouped);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Loading...</p>;

  const users = Object.values(groupedReports);

  return (
    <div className="max-w-7xl mx-auto p-6">

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        {stats.map((stat, i) => (
          <div
            key={i}
            onClick={() => applyFilter(stat.status)}
            className={`cursor-pointer bg-white border rounded-xl shadow-md p-6 flex flex-col items-center transition hover:scale-105
              ${activeFilter === stat.status ? "border-red-600" : "border-gray-200"}
            `}
          >
            <p className="text-4xl font-bold">{stat.count}</p>
            <p className="text-gray-600">{stat.title}</p>
          </div>
        ))}
      </div>

      {/* REPORTS */}
      {users.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        users.map((user) => (
          <div
            key={user.userId}
            className="border rounded-xl mb-6 overflow-hidden shadow"
          >
            {/* HEADER */}
            <div className="bg-black text-white px-4 py-3 flex justify-between">
              <p>
                <span className="text-red-400 font-bold">Name: </span>
                {user.name}
              </p>

              <p>
                <span className="text-red-400 font-bold">Patient ID: </span>
                {user.userId}
              </p>
            </div>

            {/* TABLE */}
            <table className="w-full">
              <thead>
                <tr className="bg-gray-200 text-black">
                  <th className="p-3 text-center">Report Type</th>
                  <th className="p-3 text-center">Status</th>
                  <th className="p-3 text-center">Action</th>
                </tr>
              </thead>

              <tbody>
                {user.reports.map((r) => (
                  <tr key={r._id} className="border-b">
                    <td className="p-2 text-center">{r.reportType}</td>

                    <td className="p-2 text-center">
                      <span
                        className={`px-2  py-1 rounded text-white  ${
                          r.status === "Completed"
                            ? "bg-green-600 "
                            : "bg-yellow-500"
                        }`}
                      >
                        {r.status}
                      </span>
                    </td>

                    {/* ✅ VIEW REPORT */}
                    <td className="p-2 text-center">
                      {r.file ? (
                        <button
                          onClick={() =>
                            setPreviewFile(
                              `${API}${r.file}`
                            )
                          }
                          className="text-blue-600 underline"
                        >
                          View
                        </button>
                      ) : (
                        "N/A"
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))
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

export default LabDashboard;