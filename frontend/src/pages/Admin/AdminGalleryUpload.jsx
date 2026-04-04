


// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AdminGalleryUploads = () => {
//   const [gallery, setGallery] = useState([]);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [description, setDescription] = useState("");
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // =============================
//   // Fetch Gallery
//   // =============================
//   const fetchGallery = async () => {
//     try {
//       const res = await axios.get("${API}/api/gallery");
//       setGallery(res.data);
//     } catch (err) {
//       console.error("Fetch error:", err);
//     }
//   };

//   useEffect(() => {
//     fetchGallery();
//   }, []);

//   // =============================
//   // Submit (Upload / Update)
//   // =============================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!selectedFile) {
//       alert("Please select image");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("image", selectedFile);
//     formData.append("description", description);

//     try {
//       setLoading(true);

//       if (editingId) {
//         await axios.put(
//           `${API}/api/gallery/${editingId}`,
//           formData
//         );
//         alert("Updated successfully");
//       } else {
//         await axios.post(
//           "${API}/api/gallery/upload",
//           formData
//         );
//         alert("Uploaded successfully");
//       }

//       // Reset form
//       setSelectedFile(null);
//       setDescription("");
//       setEditingId(null);
//       fetchGallery();
//     } catch (error) {
//       console.error(error);
//       alert("Operation failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // =============================
//   // Delete
//   // =============================
//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure?")) return;

//     try {
//       await axios.delete(`${API}/api/gallery/${id}`);
//       fetchGallery();
//     } catch (error) {
//       alert("Delete failed");
//     }
//   };

//   // =============================
//   // Edit
//   // =============================
//   const handleEdit = (item) => {
//     setEditingId(item._id);
//     setDescription(item.description || "");
//     setSelectedFile(null);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="p-6 bg-white min-h-screen text-white">
//       <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
//         🖼️ Gallery Management
//       </h1>

//       {/* =============================
//            Upload / Update Form
//       ============================== */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-[#1f1f1f] p-6 rounded-2xl mb-10 border-t-4 border-blue-600"
//       >
//         <h2 className="text-2xl font-bold mb-5 text-blue-500">
//           {editingId ? "✏️ Update Image" : "📸 Upload New Image"}
//         </h2>

//         <input
//           type="file"
//           onChange={(e) => setSelectedFile(e.target.files[0])}
//           className="w-full mb-4"
//           required={!editingId}   // update me file optional
//         />

//         <textarea
//           placeholder="Write description about this image..."
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="w-full mb-4 p-3 rounded bg-gray-800 text-white"
//         />

//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
//         >
//           {loading
//             ? "Processing..."
//             : editingId
//             ? "Update Image"
//             : "Upload Image"}
//         </button>

//         {editingId && (
//           <button
//             type="button"
//             onClick={() => {
//               setEditingId(null);
//               setDescription("");
//               setSelectedFile(null);
//             }}
//             className="ml-4 bg-gray-700 px-5 py-2 rounded-lg"
//           >
//             Cancel
//           </button>
//         )}
//       </form>

//       {/* =============================
//            Gallery Table
//       ============================== */}
//       <div className="bg-[#1f1f1f] p-6 rounded-2xl border-t-4 border-blue-600">
//         <h2 className="text-xl font-bold mb-4 text-blue-500">
//           🖼️ Uploaded Images
//         </h2>

//         <table className="min-w-full border border-gray-700">
//           <thead>
//             <tr className="bg-gray-800 text-blue-400">
//               <th className="py-3 px-4">Image</th>
//               <th className="py-3 px-4">Description</th>
//               <th className="py-3 px-4 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>
//             {gallery.length === 0 ? (
//               <tr>
//                 <td colSpan="3" className="text-center py-6 text-gray-400">
//                   No images uploaded yet.
//                 </td>
//               </tr>
//             ) : (
//               gallery.map((item) => (
//                 <tr key={item._id} className="border-b border-gray-700">
//                   <td className="py-3 px-4">
//                     <img
//                       src={`${API}/uploads/gallery/${item.image}`}
//                       alt="gallery"
//                       className="w-32 h-20 object-cover rounded"
//                     />
//                   </td>

//                   <td className="py-3 px-4 text-gray-300">
//                     {item.description}
//                   </td>

//                   <td className="py-3 px-4 text-center space-x-2">
//                     <button
//                       onClick={() => handleEdit(item)}
//                       className="bg-yellow-500 px-3 py-1 rounded text-sm"
//                     >
//                       Edit
//                     </button>

//                     <button
//                       onClick={() => handleDelete(item._id)}
//                       className="bg-red-600 px-3 py-1 rounded text-sm"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default AdminGalleryUploads;



import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../utils/api"; 

const AdminGalleryUploads = () => {
  const [gallery, setGallery] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchGallery = async () => {
    const res = await axios.get(`${API}/api/gallery`);
    setGallery(res.data);
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  // ================= Upload / Update =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (selectedFile) formData.append("image", selectedFile);
    formData.append("description", description);

    try {
      setLoading(true);

      if (editingId) {
        await axios.put(
          `${API}/api/gallery/${editingId}`,
          formData
        );
      } else {
        if (!selectedFile) return;
        await axios.post(
          `${API}/api/gallery/upload`,
          formData
        );
      }

      closeModal();
      fetchGallery();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (item = null) => {
    if (item) {
      setEditingId(item._id);
      setDescription(item.description || "");
    } else {
      setEditingId(null);
      setDescription("");
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingId(null);
    setDescription("");
    setSelectedFile(null);
  };

  // ================= DELETE POPUP =================
  const confirmDelete = async () => {
    await axios.delete(`${API}/api/gallery/${deleteId}`);
    setDeleteId(null);
    fetchGallery();
  };

  return (
    <div className="p-6 bg-white min-h-screen text-white">
      <h1 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        🖼️ Gallery Management
      </h1>

      {/* Add Button */}
      <div className="text-right mb-6">
        <button
          onClick={() => openModal()}
          className="bg-blue-600 px-5 py-2 rounded-lg"
        >
          + Add Image
        </button>
      </div>

      {/* ================= TABLE ================= */}
      <div className="bg-[#1f1f1f] p-6 rounded-2xl border-t-4 border-blue-600">
        <table className="min-w-full border border-gray-700">
          <thead>
            <tr className="bg-gray-800 text-blue-400">
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4">Description</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {gallery.map((item) => (
              <tr key={item._id} className="border-b border-gray-700">
                <td className="py-3 px-4">
                  <img
                    src={`${API}/uploads/gallery/${item.image}`}
                    alt="gallery"
                    className="w-32 h-20 object-cover rounded"
                  />
                </td>

                <td className="py-3 px-4 text-gray-300">
                  {item.description}
                </td>

                <td className="py-3 px-4 text-center space-x-2">
                  <button
                    onClick={() => openModal(item)}
                    className="bg-yellow-500 px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(item._id)}
                    className="bg-red-600 px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= Upload Modal ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#1f1f1f] p-6 rounded-2xl w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-5 text-blue-500">
              {editingId ? "Update Image" : "Upload Image"}
            </h2>

            <form onSubmit={handleSubmit}>
              <input
                type="file"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="w-full mb-4"
              />

              <textarea
                placeholder="Write description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full mb-4 p-3 rounded bg-gray-800 text-white"
              />

              <div className="flex justify-between">
                <button
                  type="submit"
                  className="bg-blue-600 px-6 py-2 rounded-lg"
                >
                  {loading ? "Processing..." : "Save"}
                </button>

                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-600 px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= DELETE CONFIRM MODAL ================= */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-[#1f1f1f] p-6 rounded-2xl w-full max-w-md text-center">
            <h2 className="text-xl font-bold mb-4 text-red-500">
              Confirm Delete
            </h2>
            <p className="text-gray-300 mb-6">
              Are you sure you want to delete this image?
            </p>

            <div className="flex justify-center space-x-4">
              <button
                onClick={confirmDelete}
                className="bg-red-600 px-6 py-2 rounded-lg"
              >
                Yes, Delete
              </button>

              <button
                onClick={() => setDeleteId(null)}
                className="bg-gray-600 px-6 py-2 rounded-lg"
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

export default AdminGalleryUploads;