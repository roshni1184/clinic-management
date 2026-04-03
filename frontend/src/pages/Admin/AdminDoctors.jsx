
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import DoctorRegistration from "./DoctorRegistration";
// import DownloadButton from "../../components/DownloadButton";

// const AdminDoctors = () => {
//   const [doctors, setDoctors] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [editingDoctor, setEditingDoctor] = useState(null);
//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchDoctors = async () => {
//     try {
//       const token =
//         localStorage.getItem("token") ||
//         localStorage.getItem("adminToken");

//       const res = await axios.get(
//         "${API}/api/admin/doctors",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setDoctors(res.data);
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   const handleEdit = (doctor) => {
//     setEditingDoctor(doctor);
//     setShowForm(true);
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this doctor?"))
//       return;

//     try {
//       const token =
//         localStorage.getItem("token") ||
//         localStorage.getItem("adminToken");

//       await axios.delete(
//         `${API}/api/admin/delete-doctor/${id}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setDoctors(doctors.filter((doc) => doc._id !== id));
//       alert("Doctor deleted successfully");
//     } catch (error) {
//       console.error(error);
//       alert("Failed to delete doctor");
//     }
//   };

//   const filteredDoctors = doctors.filter((doctor) => {
//     const term = searchTerm.toLowerCase();
//     return (
//       doctor.customId?.toLowerCase().includes(term) ||
//       doctor.name?.toLowerCase().includes(term) ||
//       doctor.specialization?.toLowerCase().includes(term) ||
//       doctor.email?.toLowerCase().includes(term)
//     );
//   });

//   if (loading)
//     return (
//       <div className="text-center text-white mt-5">
//         Loading doctors...
//       </div>
//     );

//   return (
//     <div className="p-6 bg-white rounded-lg shadow">

//       {/* Header */}
//       <div className="mb-6">
//         <h1 className="text-3xl font-bold text-black border-l-4 border-red-600 pl-3">
//           Manage Doctors
//         </h1>
//         <p className="text-gray-500 text-sm mt-1">
//           View, search and manage registered doctors
//         </p>
//       </div>

//       {/* Add Doctor + Download Row */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">

//         <button
//           onClick={() => {
//             setEditingDoctor(null);
//             setShowForm(true);
//           }}
//           className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow transition transform hover:scale-105"
//         >
//           + Add New Doctor
//         </button>

//         <div className="shadow-md rounded-lg">
//           <DownloadButton
//             url="${API}/api/admin/download-doctors"
//             fileName="doctors-list.csv"
//             title="⬇ Download Doctors"
//           />
//         </div>

//       </div>

//       {/* Search Bar */}
//       <div className="mb-6">
//         <div className="relative w-full md:w-1/2">
//           <input
//             type="text"
//             placeholder="Search by ID, Name, Specialization or Email..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 pl-10 border border-gray-400 rounded-lg bg-gray-100 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
//           />
//           <span className="absolute left-3 top-2.5 text-gray-500 text-sm">
//             🔍
//           </span>
//         </div>
//       </div>

//       {/* Doctor Form */}
//       {showForm && (
//         <div className="relative bg-gray-50 shadow p-4 rounded mb-4">
//           <button
//             onClick={() => setShowForm(false)}
//             className="absolute top-2 right-2 text-gray-600 hover:text-black font-bold"
//           >
//             ×
//           </button>
//           <DoctorRegistration
//             doctor={editingDoctor}
//             onSuccess={() => {
//               setShowForm(false);
//               fetchDoctors();
//             }}
//           />
//         </div>
//       )}

//       {/* Doctor Table */}
//       <div className="bg-black text-white rounded-xl shadow-lg p-4">
//         <h2 className="text-lg font-semibold mb-3 text-red-500 border-b border-gray-700 pb-1">
//           All Doctors
//         </h2>

//         <table className="min-w-full border border-gray-700">
//           <thead>
//             <tr className="bg-gray-800 text-white">
//               <th className="py-2 px-3 border-b border-gray-700">Doctor ID</th>
//               <th className="py-2 px-3 border-b border-gray-700">Name</th>
//               <th className="py-2 px-3 border-b border-gray-700">Specialization</th>
//               <th className="py-2 px-3 border-b border-gray-700">Email</th>
//               <th className="py-2 px-3 border-b border-gray-700">Phone</th>
//               <th className="py-2 px-3 border-b border-gray-700 text-center">Status</th>
//               <th className="py-2 px-3 border-b border-gray-700 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredDoctors.length > 0 ? (
//               filteredDoctors.map((doctor) => (
//                 <tr
//                   key={doctor._id}
//                   className="hover:bg-gray-900 transition border-b border-gray-700"
//                 >
//                   <td className="py-2 px-3">{doctor.customId || "—"}</td>
//                   <td className="py-2 px-3 font-medium">{doctor.name}</td>
//                   <td className="py-2 px-3">{doctor.specialization}</td>
//                   <td className="py-2 px-3">{doctor.email}</td>
//                   <td className="py-2 px-3">{doctor.phone}</td>
//                   <td className="py-2 px-3 text-center">
//                     <span
//                       className={`px-3 py-1 rounded-full text-sm ${
//                         doctor.status === "Active"
//                           ? "bg-green-500"
//                           : "bg-red-500"
//                       }`}
//                     >
//                       {doctor.status}
//                     </span>
//                   </td>
//                   <td className="py-2 px-3 text-center flex justify-center gap-2">
//                     <Link
//                       to={`/admin/doctor/${doctor._id}`}
//                       className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
//                     >
//                       View
//                     </Link>

//                     <button
//                       onClick={() => handleEdit(doctor)}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => handleDelete(doctor._id)}
//                       className="bg-gray-800 hover:bg-gray-700 border border-red-600 text-white px-3 py-1 rounded text-sm"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center py-3 text-gray-300">
//                   No doctors found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//     </div>
//   );
// };

// export default AdminDoctors;





import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DoctorRegistration from "./DoctorRegistration";
import DownloadButton from "../../components/DownloadButton";

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const [deleteId, setDeleteId] = useState(null); // delete popup state

  const fetchDoctors = async () => {
    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("adminToken");

      const res = await axios.get(
        "${API}/api/admin/doctors",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDoctors(res.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleEdit = (doctor) => {
    setEditingDoctor(doctor);
    setShowForm(true);
  };

  /* DELETE FUNCTION */
  const confirmDelete = async () => {
    try {
      const token =
        localStorage.getItem("token") ||
        localStorage.getItem("adminToken");

      await axios.delete(
        `${API}/api/admin/delete-doctor/${deleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDoctors(doctors.filter((doc) => doc._id !== deleteId));
      setDeleteId(null);
    } catch (error) {
      console.error(error);
      alert("Failed to delete doctor");
    }
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const term = searchTerm.toLowerCase();
    return (
      doctor.customId?.toLowerCase().includes(term) ||
      doctor.name?.toLowerCase().includes(term) ||
      doctor.specialization?.toLowerCase().includes(term) ||
      doctor.email?.toLowerCase().includes(term)
    );
  });

  if (loading)
    return (
      <div className="text-center text-white mt-5">
        Loading doctors...
      </div>
    );

  return (
    <div className="p-6 bg-white rounded-lg shadow">

      {/* HEADER */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-black border-l-4 border-red-600 pl-3">
          Manage Doctors
        </h1>
      </div>

      {/* ADD + DOWNLOAD */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">

        <button
          onClick={() => {
            setEditingDoctor(null);
            setShowForm(true);
          }}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          + Add New Doctor
        </button>

        <DownloadButton
          url="${API}/api/admin/download-doctors"
          fileName="doctors-list.csv"
          title="⬇ Download Doctors"
        />

      </div>

      {/* SEARCH */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search doctors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg"
        />
      </div>

      {/* FORM */}
      {showForm && (
        <div className="relative bg-gray-50 shadow p-4 rounded mb-4">
          <button
            onClick={() => setShowForm(false)}
            className="absolute top-2 right-2 font-bold"
          >
            ×
          </button>

          <DoctorRegistration
            doctor={editingDoctor}
            onSuccess={() => {
              setShowForm(false);
              fetchDoctors();
            }}
          />
        </div>
      )}

      {/* TABLE */}
      <div className="bg-black text-white rounded-xl p-4">

        <table className="min-w-full border border-gray-700">

          <thead>
            <tr className="bg-gray-800">
              <th className="py-2 px-3">Doctor ID</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Specialization</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Phone</th>
              <th className="py-2 px-3 text-center">Status</th>
              <th className="py-2 px-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredDoctors.map((doctor) => (
              <tr key={doctor._id} className="border-b border-gray-700">

                <td className="py-2 px-3">{doctor.customId}</td>
                <td className="py-2 px-3">{doctor.name}</td>
                <td className="py-2 px-3">{doctor.specialization}</td>
                <td className="py-2 px-3">{doctor.email}</td>
                <td className="py-2 px-3">{doctor.phone}</td>

                <td className="text-center">
                  <span
                    className={`px-3 py-1 rounded-full ${
                      doctor.status === "Active"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {doctor.status}
                  </span>
                </td>

                <td className="flex justify-center gap-2 py-2">

                  <Link
                    to={`/admin/doctor/${doctor._id}`}
                    className="bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleEdit(doctor)}
                    className="bg-yellow-500 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(doctor._id)}
                    className="bg-gray-800 border border-red-600 px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>

      </div>

      {/* DELETE MODAL */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">

          <div className="bg-white p-6 rounded-xl text-center w-[350px]">

            <h2 className="text-xl font-bold text-red-600 mb-3">
              Confirm Delete
            </h2>

            <p className="mb-6">
              Are you sure you want to delete this doctor?
            </p>

            <div className="flex justify-center gap-4">

              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes Delete
              </button>

              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default AdminDoctors;

