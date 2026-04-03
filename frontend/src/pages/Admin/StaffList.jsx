// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const StaffList = () => {
//   const [staff, setStaff] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // ✅ ADDED SEARCH STATE
//   const [searchTerm, setSearchTerm] = useState("");

//   const navigate = useNavigate();

//   // Fetch staff list
//   const fetchStaff = async () => {
//     try {
//       const token = localStorage.getItem("token");

//       const res = await axios.get("${API}/api/employee", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setStaff(res.data.employees || []);
//     } catch (err) {
//       setError("Failed to load staff list");
//     }
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   // Delete staff
//   const deleteStaff = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this employee?"))
//       return;

//     try {
//       const token = localStorage.getItem("token");

//       await axios.delete(`${API}/api/employee/${id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setStaff(staff.filter((item) => item._id !== id));
//     } catch (err) {
//       alert("Failed to delete");
//     }
//   };

//   // ✅ ADDED FILTER LOGIC
//   const filteredStaff = staff.filter((item) => {
//     const term = searchTerm.toLowerCase();

//     return (
//       item.customId?.toLowerCase().includes(term) ||
//       item.name?.toLowerCase().includes(term) ||
//       item.role?.toLowerCase().includes(term) ||
//       item.department?.toLowerCase().includes(term) ||
//       item.email?.toLowerCase().includes(term)
//     );
//   });

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center py-10">
//         <p className="text-white text-lg">Loading staff...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 bg-black min-h-screen">
//       {/* Heading */}
//       <h2 className="text-3xl font-bold mb-6 text-red-500 border-b border-red-600 pb-2">
//         Employee / Staff List
//       </h2>

//       {error && (
//         <p className="text-red-600 bg-red-100 p-3 rounded mb-4">{error}</p>
//       )}

//       {/* ✅ SEARCH BAR ADDED */}
//       <div className="mb-4">
//   <input
//     type="text"
//     placeholder="Search by ID, Name, Role, Department or Email..."
//     value={searchTerm}
//     onChange={(e) => setSearchTerm(e.target.value)}
//     className="w-full md:w-1/2 px-4 py-2 border border-gray-400 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600"
//   />
// </div>

//       {/* TABLE */}
//       <div className="overflow-x-auto shadow-xl rounded-lg bg-white border border-red-500">
//         <table className="w-full text-sm text-left">
//           <thead className="bg-red-600 text-white">
//             <tr>
//               <th className="px-4 py-3">Custom ID</th>
//               <th className="px-4 py-3">Name</th>
//               <th className="px-4 py-3">Role</th>
//               <th className="px-4 py-3">Department</th>
//               <th className="px-4 py-3">Email</th>
//               <th className="px-4 py-3">Phone</th>
//               <th className="px-4 py-3 text-right">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredStaff.length === 0 && (
//               <tr>
//                 <td colSpan="7" className="text-center py-6 text-gray-500">
//                   No staff found
//                 </td>
//               </tr>
//             )}

//             {filteredStaff.map((item) => (
//               <tr
//                 key={item._id}
//                 className="border-b hover:bg-red-50 transition"
//               >
//                 <td className="px-4 py-3 font-semibold">{item.customId}</td>
//                 <td className="px-4 py-3">{item.name}</td>
//                 <td className="px-4 py-3 capitalize">{item.role}</td>
//                 <td className="px-4 py-3">{item.department || "-"}</td>
//                 <td className="px-4 py-3">{item.email}</td>
//                 <td className="px-4 py-3">{item.phone || "-"}</td>

//                 <td className="px-4 py-3 text-right space-x-2">
//                   <button
//                     onClick={() => navigate(`/admin/employee/${item._id}`)}
//                     className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded shadow"
//                   >
//                     View
//                   </button>

//                   <button
//                     onClick={() =>
//                       navigate(`/admin/employee/edit/${item._id}`)
//                     }
//                     className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded shadow"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => deleteStaff(item._id)}
//                     className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded shadow"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default StaffList;




import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StaffList = () => {

  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // NEW STATE FOR DELETE POPUP
  const [deleteId, setDeleteId] = useState(null);

  const navigate = useNavigate();

  const fetchStaff = async () => {

    try {

      const token = localStorage.getItem("token");

      const res = await axios.get(
        "${API}/api/employee",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStaff(res.data.employees || []);

    } catch (err) {

      setError("Failed to load staff list");

    }

    setLoading(false);

  };

  useEffect(() => {
    fetchStaff();
  }, []);

  // CONFIRM DELETE FUNCTION
  const confirmDelete = async () => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `${API}/api/employee/${deleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setStaff(staff.filter((item) => item._id !== deleteId));
      setDeleteId(null);

    } catch (err) {

      setError("Failed to delete employee");

    }

  };

  const filteredStaff = staff.filter((item) => {

    const term = searchTerm.toLowerCase();

    return (
      item.customId?.toLowerCase().includes(term) ||
      item.name?.toLowerCase().includes(term) ||
      item.role?.toLowerCase().includes(term) ||
      item.department?.toLowerCase().includes(term) ||
      item.email?.toLowerCase().includes(term)
    );

  });

  if (loading) {

    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-white text-lg">Loading staff...</p>
      </div>
    );

  }

  return (

    <div className="p-6 bg-black min-h-screen">

      <h2 className="text-3xl font-bold mb-6 text-red-500 border-b border-red-600 pb-2">
        Employee / Staff List
      </h2>

      {error && (
        <p className="text-red-600 bg-red-100 p-3 rounded mb-4">
          {error}
        </p>
      )}

      {/* SEARCH */}
      <div className="mb-4">

        <input
          type="text"
          placeholder="Search by ID, Name, Role, Department or Email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border border-gray-400 rounded bg-white text-black"
        />

      </div>

      {/* TABLE */}

      <div className="overflow-x-auto shadow-xl rounded-lg bg-white border border-red-500">

        <table className="w-full text-sm text-left">

          <thead className="bg-red-600 text-white">

            <tr>
              <th className="px-4 py-3">Custom ID</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Department</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Phone</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredStaff.length === 0 && (

              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No staff found
                </td>
              </tr>

            )}

            {filteredStaff.map((item) => (

              <tr
                key={item._id}
                className="border-b hover:bg-red-50 transition"
              >

                <td className="px-4 py-3 font-semibold">
                  {item.customId}
                </td>

                <td className="px-4 py-3">
                  {item.name}
                </td>

                <td className="px-4 py-3 capitalize">
                  {item.role}
                </td>

                <td className="px-4 py-3">
                  {item.department || "-"}
                </td>

                <td className="px-4 py-3">
                  {item.email}
                </td>

                <td className="px-4 py-3">
                  {item.phone || "-"}
                </td>

                <td className="px-4 py-3 text-right space-x-2">

                  <button
                    onClick={() => navigate(`/admin/employee/${item._id}`)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    View
                  </button>

                  <button
                    onClick={() => navigate(`/admin/employee/edit/${item._id}`)}
                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(item._id)}
                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* DELETE POPUP */}

      {deleteId && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl text-center w-[350px] shadow-xl">

            <h2 className="text-xl font-bold text-red-600 mb-3">
              Confirm Delete
            </h2>

            <p className="mb-6">
              Are you sure you want to delete this employee?
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
                className="bg-gray-600 text-white px-4 py-2 rounded"
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

export default StaffList;

