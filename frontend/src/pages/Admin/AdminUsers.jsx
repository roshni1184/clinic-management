


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import DownloadButton from "../../components/DownloadButton";

// const AdminUsers = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [editingUser, setEditingUser] = useState(null);
//   const [editData, setEditData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//   });

//   const [searchTerm, setSearchTerm] = useState("");

//   const fetchUsers = async () => {
//     try {
//       const token =
//         localStorage.getItem("adminToken") ||
//         localStorage.getItem("token");

//       const res = await axios.get(
//         "http://localhost:5000/api/admin/users",
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setUsers(res.data);
//     } catch (err) {
//       console.error("Error fetching users:", err);
//       alert("Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleEditClick = (user) => {
//     setEditingUser(user._id);
//     setEditData({
//       name: user.name,
//       email: user.email,
//       phone: user.phone,
//     });
//   };

//   const handleCancel = () => {
//     setEditingUser(null);
//     setEditData({ name: "", email: "", phone: "" });
//   };

//   const handleSave = async (userId) => {
//     try {
//       const token =
//         localStorage.getItem("adminToken") ||
//         localStorage.getItem("token");

//       const res = await axios.put(
//         `http://localhost:5000/api/admin/update-user/${userId}`,
//         editData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setUsers(
//         users.map((u) => (u._id === userId ? res.data.user : u))
//       );

//       setEditingUser(null);
//       setEditData({ name: "", email: "", phone: "" });
//       alert("User updated successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to update user");
//     }
//   };

//   const handleDelete = async (userId) => {
//     if (!window.confirm("Are you sure you want to delete this user?"))
//       return;

//     try {
//       const token =
//         localStorage.getItem("adminToken") ||
//         localStorage.getItem("token");

//       await axios.delete(
//         `http://localhost:5000/api/admin/delete-user/${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setUsers(users.filter((u) => u._id !== userId));
//       alert("User deleted successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete user");
//     }
//   };

//   const filteredUsers = users.filter((user) => {
//     const term = searchTerm.toLowerCase();
//     return (
//       user.userId?.toLowerCase().includes(term) ||
//       user.name?.toLowerCase().includes(term) ||
//       user.email?.toLowerCase().includes(term)
//     );
//   });

//   if (loading)
//     return (
//       <div className="text-center text-white mt-20 text-xl font-semibold animate-pulse">
//         Loading users...
//       </div>
//     );

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
      
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
//         <div>
//           <h1 className="text-3xl font-bold text-red-600 border-b border-gray-700 pb-2">
//             Manage Patients
//           </h1>
//           <p className="text-gray-400 text-sm mt-1">
//             View, search and manage all registered patients
//           </p>
//         </div>

//         {/* Download Button */}
//         <div className="shadow-lg rounded-lg">
//           <DownloadButton
//             url="http://localhost:5000/api/admin/download-patients"
//             fileName="patients-list.csv"
//             title="⬇ Download Patients"
//           />
//         </div>
//       </div>

//       {/* Search Bar */}
//       <div className="mb-6">
//         <div className="relative w-full md:w-1/2">
//           <input
//             type="text"
//             placeholder="Search by Patient ID, Name or Email..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 pl-10 border border-gray-600 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
//           />
//           <span className="absolute left-3 top-2.5 text-gray-400 text-sm">
//             🔍
//           </span>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto bg-black text-white rounded-xl shadow-lg border border-gray-800 p-4">
//         <h2 className="text-xl font-semibold mb-4 text-red-500 border-b border-gray-700 pb-1">
//           All Patients
//         </h2>

//         <table className="min-w-full">
//           <thead>
//             <tr className="bg-gray-900 text-white text-left border-b border-gray-700">
//               <th className="py-2 px-3">Patient ID</th>
//               <th className="py-2 px-3">Name</th>
//               <th className="py-2 px-3">Email</th>
//               <th className="py-2 px-3">Phone</th>
//               <th className="py-2 px-3 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {filteredUsers.length > 0 ? (
//               filteredUsers.map((user) => (
//                 <tr
//                   key={user._id}
//                   className="hover:bg-gray-800 transition border-b border-gray-700"
//                 >
//                   <td className="py-2 px-3 text-gray-400 text-sm">
//                     {user.userId || "—"}
//                   </td>

//                   <td className="py-2 px-3">
//                     {editingUser === user._id ? (
//                       <input
//                         type="text"
//                         value={editData.name}
//                         onChange={(e) =>
//                           setEditData({ ...editData, name: e.target.value })
//                         }
//                         className="border border-gray-600 px-2 py-1 rounded w-full text-sm bg-white text-black"
//                       />
//                     ) : (
//                       user.name
//                     )}
//                   </td>

//                   <td className="py-2 px-3">
//                     {editingUser === user._id ? (
//                       <input
//                         type="email"
//                         value={editData.email}
//                         onChange={(e) =>
//                           setEditData({ ...editData, email: e.target.value })
//                         }
//                         className="border border-gray-600 px-2 py-1 rounded w-full text-sm bg-white text-black"
//                       />
//                     ) : (
//                       user.email
//                     )}
//                   </td>

//                   <td className="py-2 px-3">
//                     {editingUser === user._id ? (
//                       <input
//                         type="text"
//                         value={editData.phone}
//                         onChange={(e) =>
//                           setEditData({ ...editData, phone: e.target.value })
//                         }
//                         className="border border-gray-600 px-2 py-1 rounded w-full text-sm bg-white text-black"
//                       />
//                     ) : (
//                       user.phone
//                     )}
//                   </td>

//                   <td className="py-2 px-3 text-center space-x-2">
//                     {editingUser === user._id ? (
//                       <>
//                         <button
//                           onClick={() => handleSave(user._id)}
//                           className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm"
//                         >
//                           Save
//                         </button>
//                         <button
//                           onClick={handleCancel}
//                           className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-sm"
//                         >
//                           Cancel
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <Link
//                           to={`/admin/user/${user._id}`}
//                           className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm"
//                         >
//                           View
//                         </Link>
//                         <button
//                           onClick={() => handleEditClick(user)}
//                           className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
//                         >
//                           Edit
//                         </button>
//                         <button
//                           onClick={() => handleDelete(user._id)}
//                           className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
//                         >
//                           Delete
//                         </button>
//                       </>
//                     )}
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center py-4 text-gray-400 text-sm">
//                   No users found.
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminUsers;    


import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import DownloadButton from "../../components/DownloadButton";

const AdminUsers = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const [searchTerm, setSearchTerm] = useState("");

  const fetchUsers = async () => {
    try {

      const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/admin/users",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers(res.data);

    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEditClick = (user) => {
    setEditingUser(user._id);
    setEditData({
      name: user.name,
      email: user.email,
      phone: user.phone,
    });
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditData({ name: "", email: "", phone: "" });
  };

  const handleSave = async (userId) => {

    try {

      const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/api/admin/update-user/${userId}`,
        editData,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUsers(users.map((u) =>
        u._id === userId ? res.data.user : u
      ));

      setEditingUser(null);

    } catch (err) {
      console.error(err);
      alert("Failed to update user");
    }

  };

  const confirmDelete = async () => {

    try {

      const token =
        localStorage.getItem("adminToken") ||
        localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/admin/delete-user/${deleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUsers(users.filter((u) => u._id !== deleteId));
      setDeleteId(null);

    } catch (err) {
      console.error(err);
      alert("Failed to delete user");
    }

  };

  const filteredUsers = users.filter((user) => {
    const term = searchTerm.toLowerCase();

    return (
      user.userId?.toLowerCase().includes(term) ||
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term)
    );
  });

  if (loading)
    return (
      <div className="text-center text-white mt-20 text-xl font-semibold animate-pulse">
        Loading users...
      </div>
    );

  return (
    <div className="p-6 max-w-6xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">

        <div>
          <h1 className="text-3xl font-bold text-red-600">
            Manage Patients
          </h1>
        </div>

        <DownloadButton
          url="http://localhost:5000/api/admin/download-patients"
          fileName="patients-list.csv"
          title="⬇ Download Patients"
        />

      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search patients..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:w-1/2 px-4 py-2 border rounded mb-6"
      />

      {/* Table */}
      <div className="bg-black text-white rounded-xl p-4">

        <table className="min-w-full">

          <thead>
            <tr className="bg-gray-900">
              <th className="py-2 px-3">Patient ID</th>
              <th className="py-2 px-3">Name</th>
              <th className="py-2 px-3">Email</th>
              <th className="py-2 px-3">Phone</th>
              <th className="py-2 px-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {filteredUsers.map((user) => (

              <tr key={user._id} className="border-b border-gray-700">

                <td className="py-2 px-3">{user.userId}</td>

                <td className="py-2 px-3">
                  {editingUser === user._id ? (
                    <input
                      value={editData.name}
                      onChange={(e) =>
                        setEditData({ ...editData, name: e.target.value })
                      }
                      className="text-black px-2 py-1 rounded"
                    />
                  ) : user.name}
                </td>

                <td className="py-2 px-3">
                  {editingUser === user._id ? (
                    <input
                      value={editData.email}
                      onChange={(e) =>
                        setEditData({ ...editData, email: e.target.value })
                      }
                      className="text-black px-2 py-1 rounded"
                    />
                  ) : user.email}
                </td>

                <td className="py-2 px-3">
                  {editingUser === user._id ? (
                    <input
                      value={editData.phone}
                      onChange={(e) =>
                        setEditData({ ...editData, phone: e.target.value })
                      }
                      className="text-black px-2 py-1 rounded"
                    />
                  ) : user.phone}
                </td>

                <td className="text-center">

                  <Link
                    to={`/admin/user/${user._id}`}
                    className="bg-blue-600 px-3 py-1 rounded mr-2"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => handleEditClick(user)}
                    className="bg-yellow-500 px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(user._id)}
                    className="bg-red-600 px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Delete Modal */}
      {deleteId && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-white p-6 rounded-xl text-center w-[350px]">

            <h2 className="text-xl font-bold text-red-600 mb-3">
              Confirm Delete
            </h2>

            <p className="mb-6">
              Are you sure you want to delete this patient?
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

export default AdminUsers;

