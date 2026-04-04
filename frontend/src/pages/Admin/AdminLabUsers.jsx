// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const AdminLabUsers = () => {
//   const [labUsers, setLabUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({ name: "", email: "", phone: "" });

//   const token = localStorage.getItem("token");
//   const navigate = useNavigate();

//   // Fetch lab users
//   const fetchLabUsers = async () => {
//     try {
//       const res = await axios.get("${API}/api/admin/lab-users", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setLabUsers(res.data.labUsers || []);
//       setLoading(false);
//     } catch (err) {
//       console.error("Error fetching lab users:", err);
//       setError("Failed to load lab users");
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchLabUsers();
//   }, []);

//   // Delete Lab User
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this Lab User?")) return;

//     try {
//       await axios.delete(`${API}/api/admin/delete-lab/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       setLabUsers(labUsers.filter((u) => u._id !== id));
//       alert("Lab user deleted successfully!");
//     } catch (err) {
//       console.error("Delete error:", err);
//       alert("Failed to delete user");
//     }
//   };

//   // Start editing
//   const handleEditClick = (user) => {
//     setEditingId(user._id);
//     setEditForm({ name: user.name, email: user.email, phone: user.phone || "" });
//   };

//   // Cancel editing
//   const handleCancelEdit = () => {
//     setEditingId(null);
//     setEditForm({ name: "", email: "", phone: "" });
//   };

//   // Save changes
//   const handleSaveEdit = async (id) => {
//     try {
//       const res = await axios.put(
//         `${API}/api/admin/update-lab/${id}`,
//         editForm,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       setLabUsers(
//         labUsers.map((user) => (user._id === id ? { ...user, ...res.data.user } : user))
//       );

//       setEditingId(null);
//       setEditForm({ name: "", email: "", phone: "" });
//       alert("Lab user updated successfully!");
//     } catch (err) {
//       console.error("Update error:", err);
//       alert("Failed to update user");
//     }
//   };

//   if (loading)
//     return <p className="text-center mt-5 text-white">Loading lab users...</p>;
//   if (error) return <p className="text-center text-red-500">{error}</p>;

//   return (
//     <div className="p-6 min-h-screen bg-[#111] text-white">
//       <h2 className="text-3xl font-bold mb-6 text-red-500 text-center">Lab Users List</h2>

//       {labUsers.length === 0 ? (
//         <p className="text-center text-gray-400">No lab users found.</p>
//       ) : (
//         <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-700">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr className="bg-gray-800 text-left text-red-400">
//                 <th className="p-3 border border-gray-700">Name</th>
//                 <th className="p-3 border border-gray-700">Email</th>
//                 <th className="p-3 border border-gray-700">Phone</th>
//                 <th className="p-3 border border-gray-700">Role</th>
//                 <th className="p-3 border border-gray-700 text-center">Actions</th>
//               </tr>
//             </thead>

//             <tbody>
//               {labUsers.map((user) => (
//                 <tr
//                   key={user._id}
//                   className="hover:bg-gray-900 transition-colors"
//                 >
//                   <td className="p-3 border border-gray-700">
//                     {editingId === user._id ? (
//                       <input
//                         type="text"
//                         value={editForm.name}
//                         onChange={(e) =>
//                           setEditForm({ ...editForm, name: e.target.value })
//                         }
//                         className="border rounded px-2 py-1 w-full bg-gray-800 text-white focus:ring-2 focus:ring-red-500"
//                       />
//                     ) : (
//                       user.name
//                     )}
//                   </td>

//                   <td className="p-3 border border-gray-700">
//                     {editingId === user._id ? (
//                       <input
//                         type="email"
//                         value={editForm.email}
//                         onChange={(e) =>
//                           setEditForm({ ...editForm, email: e.target.value })
//                         }
//                         className="border rounded px-2 py-1 w-full bg-gray-800 text-white focus:ring-2 focus:ring-red-500"
//                       />
//                     ) : (
//                       user.email
//                     )}
//                   </td>

//                   <td className="p-3 border border-gray-700">
//                     {editingId === user._id ? (
//                       <input
//                         type="text"
//                         value={editForm.phone}
//                         onChange={(e) =>
//                           setEditForm({ ...editForm, phone: e.target.value })
//                         }
//                         className="border rounded px-2 py-1 w-full bg-gray-800 text-white focus:ring-2 focus:ring-red-500"
//                       />
//                     ) : (
//                       user.phone || "N/A"
//                     )}
//                   </td>

//                   <td className="p-3 border border-gray-700">{user.role}</td>

//                   <td className="p-3 border border-gray-700 flex flex-wrap gap-2 justify-center">
//                     {editingId === user._id ? (
//                       <>
//                         <button
//                           className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded transition"
//                           onClick={() => handleSaveEdit(user._id)}
//                         >
//                           Save
//                         </button>
//                         <button
//                           className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded transition"
//                           onClick={handleCancelEdit}
//                         >
//                           Cancel
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <button
//                           className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition"
//                           onClick={() => navigate(`/admin/lab/user/${user._id}`)}
//                         >
//                           View
//                         </button>
//                         <button
//                           className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded transition"
//                           onClick={() => handleEditClick(user)}
//                         >
//                           Edit
//                         </button>
//                         <button
//                           className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition"
//                           onClick={() => handleDelete(user._id)}
//                         >
//                           Delete
//                         </button>
//                       </>
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

// export default AdminLabUsers;





import React, { useEffect, useState } from "react";
import axios from "axios";
import API from "../../utils/api";
import { useNavigate } from "react-router-dom";
import DownloadButton from "../../components/DownloadButton";
import Swal from "sweetalert2";

const AdminLabUsers = () => {
  const [labUsers, setLabUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ name: "", email: "", phone: "" });
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchLabUsers = async () => {
    try {
      const res = await axios.get(
        `${API}/api/admin/lab-users`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setLabUsers(res.data.labUsers || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching lab users:", err);
      setError("Failed to load lab users");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLabUsers();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this Lab User!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `${API}/api/admin/delete-lab/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLabUsers(labUsers.filter((u) => u._id !== id));

      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "Lab user deleted successfully!",
        confirmButtonColor: "#dc2626",
      });
    } catch (err) {
      console.error("Delete error:", err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to delete user",
      });
    }
  };

  const handleEditClick = (user) => {
    setEditingId(user._id);
    setEditForm({
      name: user.name,
      email: user.email,
      phone: user.phone || "",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditForm({ name: "", email: "", phone: "" });
  };

  const handleSaveEdit = async (id) => {
    try {
      const res = await axios.put(
        `${API}/api/admin/update-lab/${id}`,
        editForm,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setLabUsers(
        labUsers.map((user) =>
          user._id === id ? { ...user, ...res.data.user } : user
        )
      );

      setEditingId(null);
      setEditForm({ name: "", email: "", phone: "" });

      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Lab user updated successfully!",
        confirmButtonColor: "#dc2626",
      });
    } catch (err) {
      console.error("Update error:", err);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to update user",
      });
    }
  };

  const filteredLabUsers = labUsers.filter((user) => {
    const term = searchTerm.toLowerCase();
    return (
      user.customId?.toLowerCase().includes(term) ||
      user.name?.toLowerCase().includes(term) ||
      user.email?.toLowerCase().includes(term) ||
      user.role?.toLowerCase().includes(term)
    );
  });

  if (loading)
    return <p className="text-center mt-5 text-white">Loading lab users...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 min-h-screen bg-[#111] text-white">

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-red-500">
            Lab Users Management
          </h2>
          <p className="text-gray-400 text-sm mt-1">
            View, search and manage registered lab users
          </p>
        </div>

        <div className="shadow-md rounded-lg">
          <DownloadButton
            url="${API}/api/admin/download-labusers"
            fileName="lab-users-list.csv"
            title="⬇ Download Lab Users"
          />
        </div>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by Lab ID, Name, Email or Role..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-600 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-500 transition"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">
            🔍
          </span>
        </div>
      </div>

      {filteredLabUsers.length === 0 ? (
        <p className="text-center text-gray-400">No lab users found.</p>
      ) : (
        <div className="overflow-x-auto shadow-lg rounded-lg border border-gray-700">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-800 text-left text-red-400">
                <th className="p-3 border border-gray-700">Lab ID</th>
                <th className="p-3 border border-gray-700">Name</th>
                <th className="p-3 border border-gray-700">Email</th>
                <th className="p-3 border border-gray-700">Phone</th>
                <th className="p-3 border border-gray-700">Role</th>
                <th className="p-3 border border-gray-700 text-center">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {filteredLabUsers.map((user) => (
                <tr
                  key={user._id}
                  className="hover:bg-gray-900 transition-colors"
                >
                  <td className="p-3 border border-gray-700 font-semibold text-red-400">
                    {user.customId || "—"}
                  </td>

                  <td className="p-3 border border-gray-700">
                    {editingId === user._id ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="border rounded px-2 py-1 w-full bg-gray-800 text-white"
                      />
                    ) : (
                      user.name
                    )}
                  </td>

                  <td className="p-3 border border-gray-700">
                    {editingId === user._id ? (
                      <input
                        type="email"
                        value={editForm.email}
                        onChange={(e) =>
                          setEditForm({ ...editForm, email: e.target.value })
                        }
                        className="border rounded px-2 py-1 w-full bg-gray-800 text-white"
                      />
                    ) : (
                      user.email
                    )}
                  </td>

                  <td className="p-3 border border-gray-700">
                    {editingId === user._id ? (
                      <input
                        type="text"
                        value={editForm.phone}
                        onChange={(e) =>
                          setEditForm({ ...editForm, phone: e.target.value })
                        }
                        className="border rounded px-2 py-1 w-full bg-gray-800 text-white"
                      />
                    ) : (
                      user.phone || "N/A"
                    )}
                  </td>

                  <td className="p-3 border border-gray-700">{user.role}</td>

                  <td className="p-3 border border-gray-700 flex flex-wrap gap-2 justify-center">
                    {editingId === user._id ? (
                      <>
                        <button
                          className="px-3 py-1 bg-green-600 rounded"
                          onClick={() => handleSaveEdit(user._id)}
                        >
                          Save
                        </button>
                        <button
                          className="px-3 py-1 bg-gray-600 rounded"
                          onClick={handleCancelEdit}
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          className="px-3 py-1 bg-blue-600 rounded"
                          onClick={() =>
                            navigate(`/admin/lab/user/${user._id}`)
                          }
                        >
                          View
                        </button>
                        <button
                          className="px-3 py-1 bg-yellow-500 rounded"
                          onClick={() => handleEditClick(user)}
                        >
                          Edit
                        </button>
                        <button
                          className="px-3 py-1 bg-red-600 rounded"
                          onClick={() => handleDelete(user._id)}
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
    </div>
  );
};

export default AdminLabUsers;