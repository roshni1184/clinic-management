// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AdminBlog = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [form, setForm] = useState({
//     title: "",
//     content: "",
//     author: "",
//     image: "",
//     tags: "",
//   });
//   const [editingBlogId, setEditingBlogId] = useState(null);
//   const token = localStorage.getItem("token");

//   // Fetch all blogs
//   const fetchBlogs = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/blogs");
//       setBlogs(res.data);
//     } catch (err) {
//       console.error("Failed to fetch blogs:", err);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//     const adminName = localStorage.getItem("userName") || "Dr. Admin";
//     setForm((prev) => ({ ...prev, author: adminName }));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//       setForm((prev) => ({ ...prev, image: reader.result }));
//     };
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!form.title || !form.content || !form.author) {
//       alert("Title, Content, and Author are required!");
//       return;
//     }

//     const payload = {
//       title: form.title,
//       content: form.content,
//       author: form.author,
//       image: form.image,
//       tags: form.tags ? form.tags.split(",").map((t) => t.trim()) : [],
//     };

//     try {
//       if (editingBlogId) {
//         const res = await axios.put(
//           `http://localhost:5000/api/admin/update-blog/${editingBlogId}`,
//           payload,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         alert(res.data.message || "Blog updated successfully!");
//       } else {
//         const res = await axios.post(
//           "http://localhost:5000/api/admin/createblog",
//           payload,
//           { headers: { Authorization: `Bearer ${token}` } }
//         );
//         alert(res.data.message || "Blog created successfully!");
//       }

//       setForm({
//         title: "",
//         content: "",
//         author: form.author,
//         image: "",
//         tags: "",
//       });
//       setEditingBlogId(null);
//       fetchBlogs();
//     } catch (err) {
//       console.error(err);
//       alert(err.response?.data?.message || "Error saving blog");
//     }
//   };

//   const handleEdit = (blog) => {
//     setForm({
//       title: blog.title,
//       content: blog.content,
//       author: blog.author,
//       image: blog.image || "",
//       tags: blog.tags ? blog.tags.join(", ") : "",
//     });
//     setEditingBlogId(blog._id);
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   const handleDelete = async (id) => {
//     if (!window.confirm("Are you sure you want to delete this blog?")) return;
//     try {
//       await axios.delete(`http://localhost:5000/api/admin/delete-blog/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchBlogs();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to delete blog");
//     }
//   };

//   return (
//     <div className="p-6 bg-white min-h-screen text-white">
//       <h1 className="text-3xl font-bold text-red-600 mb-6 text-center tracking-wider">
//         🦷 Dental Blog Management
//       </h1>

//       {/* Blog Form */}
//       <form
//         onSubmit={handleSubmit}
//         className="bg-[#1f1f1f] shadow-lg p-6 rounded-2xl mb-10 border-t-4 border-red-600"
//       >
//         <h2 className="text-2xl font-bold mb-5 text-red-500">
//           {editingBlogId ? "✏️ Edit Dental Blog" : "🪥 Add New Dental Blog"}
//         </h2>

//         <div className="mb-4">
//           <label className="block mb-1 font-medium text-gray-200">Blog Title</label>
//           <input
//             type="text"
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             placeholder="How to Keep Your Smile Bright & Healthy"
//             className="w-full border border-gray-600 bg-[#222] text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-red-500"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block mb-1 font-medium text-gray-200">Blog Content</label>
//           <textarea
//             name="content"
//             value={form.content}
//             onChange={handleChange}
//             rows="6"
//             placeholder="Write your dental health article content here..."
//             className="w-full border border-gray-600 bg-[#222] text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-red-500"
//             required
//           />
//         </div>

//         <div className="mb-4 grid md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1 font-medium text-gray-200">Tags (comma separated)</label>
//             <input
//               type="text"
//               name="tags"
//               value={form.tags}
//               onChange={handleChange}
//               placeholder="dental care, root canal, oral hygiene"
//               className="w-full border border-gray-600 bg-[#222] text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-red-500"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium text-gray-200">Author Name</label>
//             <input
//               type="text"
//               name="author"
//               value={form.author}
//               onChange={handleChange}
//               placeholder="Dr. Priya Sharma"
//               className="w-full border border-gray-600 bg-[#222] text-white px-3 py-2 rounded-md focus:ring-2 focus:ring-red-500"
//               required
//             />
//           </div>
//         </div>

//         <div className="mb-6">
//           <label className="block mb-1 font-medium text-gray-200">Upload Blog Image</label>
//           <input type="file" accept="image/*" onChange={handleImageUpload} />
//           {form.image && (
//             <img
//               src={form.image}
//               alt="Preview"
//               className="mt-3 w-64 h-40 object-cover rounded-lg border-2 border-red-600 shadow-md"
//             />
//           )}
//         </div>

//         <div className="flex items-center">
//           <button
//             type="submit"
//             className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow"
//           >
//             {editingBlogId ? "Update Blog" : "Create Blog"}
//           </button>

//           {editingBlogId && (
//             <button
//               type="button"
//               onClick={() => {
//                 setEditingBlogId(null);
//                 setForm({ title: "", content: "", author: form.author, image: "", tags: "" });
//               }}
//               className="ml-4 bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>

//       {/* Blog List */}
//       <div className="bg-[#1f1f1f] shadow-lg rounded-2xl p-6 border-t-4 border-red-600">
//         <h2 className="text-xl font-bold mb-4 text-red-500">🧾 Published Dental Blogs</h2>
//         <table className="min-w-full border border-gray-700">
//           <thead>
//             <tr className="bg-gray-800 text-left text-red-400">
//               <th className="py-3 px-4 border-b">Title</th>
//               <th className="py-3 px-4 border-b">Content</th>
//               <th className="py-3 px-4 border-b">Author</th>
//               <th className="py-3 px-4 border-b">Image</th>
//               <th className="py-3 px-4 border-b text-center">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {blogs.length === 0 ? (
//               <tr>
//                 <td colSpan="5" className="text-center py-6 text-gray-400">
//                   No dental blogs available yet.
//                 </td>
//               </tr>
//             ) : (
//               blogs.map((blog) => (
//                 <tr key={blog._id} className="hover:bg-gray-900 border-b border-gray-700 transition">
//                   <td className="py-3 px-4 font-semibold text-gray-200">{blog.title}</td>
//                   <td className="py-3 px-4 text-gray-300">{blog.content.substring(0, 80)}...</td>
//                   <td className="py-3 px-4 text-gray-200">{blog.author}</td>
//                   <td className="py-3 px-4">
//                     {blog.image ? (
//                       <img
//                         src={blog.image}
//                         alt={blog.title}
//                         className="w-24 h-16 object-cover rounded-lg border border-red-600"
//                       />
//                     ) : (
//                       "N/A"
//                     )}
//                   </td>
//                   <td className="py-3 px-4 text-center space-x-2">
//                     <button
//                       onClick={() => handleEdit(blog)}
//                       className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(blog._id)}
//                       className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-md text-sm"
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

// export default AdminBlog;




// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const AdminBlog = () => {

//   const [blogs, setBlogs] = useState([]);

//   const [form, setForm] = useState({
//     title: "",
//     content: "",
//     author: "",
//     image: "",
//     tags: "",
//   });

//   const [editingBlogId, setEditingBlogId] = useState(null);
//   const [deleteId, setDeleteId] = useState(null);

//   const token = localStorage.getItem("token");

//   const fetchBlogs = async () => {
//     try {
//       const res = await axios.get("http://localhost:5000/api/admin/blogs");
//       setBlogs(res.data);
//     } catch (err) {
//       console.error("Failed to fetch blogs:", err);
//     }
//   };

//   useEffect(() => {

//     fetchBlogs();

//     const adminName = localStorage.getItem("userName") || "Dr. Admin";

//     setForm((prev) => ({
//       ...prev,
//       author: adminName,
//     }));

//   }, []);

//   const handleChange = (e) => {

//     const { name, value } = e.target;

//     setForm((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//   };

//  const handleImageUpload = (e) => {
//   const file = e.target.files[0];
//   if (!file) return;

//   setForm((prev) => ({
//     ...prev,
//     image: file, // 👈 direct file store
//   }));
// };

//  const handleSubmit = async (e) => {
//   e.preventDefault();

//   if (!form.title || !form.content || !form.author) {
//     alert("Title, Content, and Author are required!");
//     return;
//   }

//   // ✅ FormData use karo
//   const formData = new FormData();

//   formData.append("title", form.title);
//   formData.append("content", form.content);
//   formData.append("author", form.author);
//   formData.append(
//     "tags",
//     form.tags ? form.tags.split(",").map((t) => t.trim()) : []
//   );

//   if (form.image) {
//     formData.append("image", form.image); // 👈 IMPORTANT
//   }

//   try {
//     if (editingBlogId) {
//       const res = await axios.put(
//         `http://localhost:5000/api/admin/update-blog/${editingBlogId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       alert(res.data.message || "Blog updated successfully!");
//     } else {
//       const res = await axios.post(
//         "http://localhost:5000/api/admin/createblog",
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       alert(res.data.message || "Blog created successfully!");
//     }

//     setForm({
//       title: "",
//       content: "",
//       author: form.author,
//       image: "",
//       tags: "",
//     });

//     setEditingBlogId(null);
//     fetchBlogs();
//   } catch (err) {
//     console.error(err);
//     alert(err.response?.data?.message || "Error saving blog");
//   }
// };

//   const handleEdit = (blog) => {

//     setForm({
//       title: blog.title,
//       content: blog.content,
//       author: blog.author,
//       image: blog.image || "",
//       tags: blog.tags ? blog.tags.join(", ") : "",
//     });

//     setEditingBlogId(blog._id);

//     window.scrollTo({
//       top: 0,
//       behavior: "smooth",
//     });

//   };

//   const confirmDelete = async () => {

//     try {

//       await axios.delete(
//         `http://localhost:5000/api/admin/delete-blog/${deleteId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setDeleteId(null);

//       fetchBlogs();

//     } catch (err) {

//       console.error(err);
//       alert("Failed to delete blog");

//     }

//   };

//   return (

//     <div className="p-6 bg-white min-h-screen text-white">

//       <h1 className="text-3xl font-bold text-red-600 mb-6 text-center tracking-wider">
//         🦷 Dental Blog Management
//       </h1>

//       {/* FORM */}

//       <form
//         onSubmit={handleSubmit}
//         className="bg-[#1f1f1f] shadow-lg p-6 rounded-2xl mb-10 border-t-4 border-red-600"
//       >

//         <h2 className="text-2xl font-bold mb-5 text-red-500">
//           {editingBlogId ? "✏️ Edit Dental Blog" : "🪥 Add New Dental Blog"}
//         </h2>

//         <div className="mb-4">

//           <label className="block mb-1 text-gray-200">
//             Blog Title
//           </label>

//           <input
//             type="text"
//             name="title"
//             value={form.title}
//             onChange={handleChange}
//             className="w-full border border-gray-600 bg-[#222] text-white px-3 py-2 rounded-md"
//             required
//           />

//         </div>

//         <div className="mb-4">

//           <label className="block mb-1 text-gray-200">
//             Blog Content
//           </label>

//           <textarea
//             name="content"
//             value={form.content}
//             onChange={handleChange}
//             rows="6"
//             className="w-full border border-gray-600 bg-[#222] text-white px-3 py-2 rounded-md"
//             required
//           />

//         </div>

//         <div className="mb-4 grid md:grid-cols-2 gap-4">

//           <input
//             type="text"
//             name="tags"
//             value={form.tags}
//             onChange={handleChange}
//             placeholder="tags"
//             className="border border-gray-600 bg-[#222] text-white px-3 py-2 rounded-md"
//           />

//           <input
//             type="text"
//             name="author"
//             value={form.author}
//             onChange={handleChange}
//             className="border border-gray-600 bg-[#222] text-white px-3 py-2 rounded-md"
//           />

//         </div>

//         <div className="mb-6">

//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageUpload}
//           />

//           {form.image && (
//             <img
//               src={form.image}
//               alt="Preview"
//               className="mt-3 w-64 h-40 object-cover rounded-lg border"
//             />
//           )}

//         </div>

//         <button
//           type="submit"
//           className="bg-red-600 px-6 py-2 rounded-lg"
//         >
//           {editingBlogId ? "Update Blog" : "Create Blog"}
//         </button>

//       </form>

//       {/* BLOG TABLE */}

//       <div className="bg-[#1f1f1f] shadow-lg rounded-2xl p-6 border-t-4 border-red-600">

//         <h2 className="text-xl font-bold mb-4 text-red-500">
//           Published Blogs
//         </h2>

//         <table className="min-w-full border border-gray-700">

//           <thead>
//             <tr className="bg-gray-800 text-red-400">
//               <th className="py-3 px-4">Title</th>
//               <th className="py-3 px-4">Content</th>
//               <th className="py-3 px-4">Author</th>
//               <th className="py-3 px-4">Image</th>
//               <th className="py-3 px-4 text-center">Actions</th>
//             </tr>
//           </thead>

//           <tbody>

//             {blogs.map((blog) => (

//               <tr key={blog._id} className="border-b border-gray-700">

//                 <td className="py-3 px-4">{blog.title}</td>

//                 <td className="py-3 px-4">
//                   {blog.content.substring(0, 80)}...
//                 </td>

//                 <td className="py-3 px-4">{blog.author}</td>

//                 <td className="py-3 px-4">

//                   {blog.image ? (
//                     <img
//                       src={blog.image}
//                       alt=""
//                       className="w-24 h-16 object-cover"
//                     />
//                   ) : "N/A"}

//                 </td>

//                 <td className="py-3 px-4 text-center space-x-2">

//                   <button
//                     onClick={() => handleEdit(blog)}
//                     className="bg-yellow-500 px-3 py-1 rounded"
//                   >
//                     Edit
//                   </button>

//                   <button
//                     onClick={() => setDeleteId(blog._id)}
//                     className="bg-red-600 px-3 py-1 rounded"
//                   >
//                     Delete
//                   </button>

//                 </td>

//               </tr>

//             ))}

//           </tbody>

//         </table>

//       </div>

//       {/* DELETE POPUP */}

//       {deleteId && (

//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

//           <div className="bg-white text-black p-6 rounded-xl w-[350px] text-center">

//             <h2 className="text-xl font-bold text-red-600 mb-3">
//               Confirm Delete
//             </h2>

//             <p className="mb-6">
//               Are you sure you want to delete this blog?
//             </p>

//             <div className="flex justify-center gap-4">

//               <button
//                 onClick={confirmDelete}
//                 className="bg-red-600 text-white px-4 py-2 rounded"
//               >
//                 Yes Delete
//               </button>

//               <button
//                 onClick={() => setDeleteId(null)}
//                 className="bg-gray-600 text-white px-4 py-2 rounded"
//               >
//                 Cancel
//               </button>

//             </div>

//           </div>

//         </div>

//       )}

//     </div>

//   );

// };

// export default AdminBlog;


import React, { useState, useEffect } from "react";
import axios from "axios";

const AdminBlog = () => {

  const [blogs, setBlogs] = useState([]);

  const [form, setForm] = useState({
    title: "",
    content: "",
    author: "",
    image: "",
    tags: "",
  });

  const [editingBlogId, setEditingBlogId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchBlogs = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
    }
  };

  useEffect(() => {

    fetchBlogs();

    const adminName = localStorage.getItem("userName") || "Dr. Admin";

    setForm((prev) => ({
      ...prev,
      author: adminName,
    }));

  }, []);

  const handleChange = (e) => {

    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.author) {
      alert("Title, Content, and Author are required!");
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("author", form.author);
    formData.append(
      "tags",
      form.tags ? form.tags.split(",").map((t) => t.trim()) : []
    );

    if (form.image) {
      formData.append("image", form.image);
    }

    try {
      if (editingBlogId) {
        const res = await axios.put(
          `http://localhost:5000/api/admin/update-blog/${editingBlogId}`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert(res.data.message || "Blog updated successfully!");
      } else {
        const res = await axios.post(
          "http://localhost:5000/api/admin/createblog",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert(res.data.message || "Blog created successfully!");
      }

      setForm({
        title: "",
        content: "",
        author: form.author,
        image: "",
        tags: "",
      });

      setEditingBlogId(null);
      fetchBlogs();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error saving blog");
    }
  };

  const handleEdit = (blog) => {

    setForm({
      title: blog.title,
      content: blog.content,
      author: blog.author,
      image: blog.image || "",
      tags: blog.tags ? blog.tags.join(", ") : "",
    });

    setEditingBlogId(blog._id);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

  };

  const confirmDelete = async () => {

    try {

      await axios.delete(
        `http://localhost:5000/api/admin/delete-blog/${deleteId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setDeleteId(null);

      fetchBlogs();

    } catch (err) {

      console.error(err);
      alert("Failed to delete blog");

    }

  };

  return (

    <div className="p-6 bg-white min-h-screen text-white">

      <h1 className="text-3xl font-bold text-red-600 mb-6 text-center tracking-wider">
        🦷 Dental Blog Management
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-[#1f1f1f] shadow-lg p-6 rounded-2xl mb-10 border-t-4 border-red-600"
      >

        <h2 className="text-2xl font-bold mb-5 text-red-500">
          {editingBlogId ? "✏️ Edit Dental Blog" : "🪥 Add New Dental Blog"}
        </h2>

        <div className="mb-4">

          <label className="block mb-1 text-gray-200">
            Blog Title
          </label>

          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-gray-600 bg-[#222] text-white px-3 py-2 rounded-md"
            required
          />

        </div>

        <div className="mb-4">

          <label className="block mb-1 text-gray-200">
            Blog Content
          </label>

          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows="6"
            className="w-full border border-gray-600 bg-[#222] text-white px-3 py-2 rounded-md"
            required
          />

        </div>

        <div className="mb-4 grid md:grid-cols-2 gap-4">

          <input
            type="text"
            name="tags"
            value={form.tags}
            onChange={handleChange}
            placeholder="tags"
            className="border border-gray-600 bg-[#222] text-white px-3 py-2 rounded-md"
          />

          <input
            type="text"
            name="author"
            value={form.author}
            onChange={handleChange}
            className="border border-gray-600 bg-[#222] text-white px-3 py-2 rounded-md"
          />

        </div>

        <div className="mb-6">

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />

          {/* ✅ FIXED PREVIEW */}
          {form.image && (
            <img
              src={
                typeof form.image === "string"
                  ? form.image
                  : URL.createObjectURL(form.image)
              }
              alt="Preview"
              className="mt-3 w-64 h-40 object-cover rounded-lg border"
            />
          )}

        </div>

        <button
          type="submit"
          className="bg-red-600 px-6 py-2 rounded-lg"
        >
          {editingBlogId ? "Update Blog" : "Create Blog"}
        </button>

      </form>

      <div className="bg-[#1f1f1f] shadow-lg rounded-2xl p-6 border-t-4 border-red-600">

        <h2 className="text-xl font-bold mb-4 text-red-500">
          Published Blogs
        </h2>

        <table className="min-w-full border border-gray-700">

          <thead>
            <tr className="bg-gray-800 text-red-400">
              <th className="py-3 px-4">Title</th>
              <th className="py-3 px-4">Content</th>
              <th className="py-3 px-4">Author</th>
              <th className="py-3 px-4">Image</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>

            {blogs.map((blog) => (

              <tr key={blog._id} className="border-b border-gray-700">

                <td className="py-3 px-4">{blog.title}</td>

                <td className="py-3 px-4">
                  {blog.content.substring(0, 80)}...
                </td>

                <td className="py-3 px-4">{blog.author}</td>

                <td className="py-3 px-4">

                  {/* ✅ FIXED IMAGE PATH */}
                  {blog.image ? (
                    <img
                      src={`http://localhost:5000/${blog.image}`}
                      alt=""
                      className="w-24 h-16 object-cover"
                    />
                  ) : "N/A"}

                </td>

                <td className="py-3 px-4 text-center space-x-2">

                  <button
                    onClick={() => handleEdit(blog)}
                    className="bg-yellow-500 px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => setDeleteId(blog._id)}
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

      {deleteId && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">

          <div className="bg-white text-black p-6 rounded-xl w-[350px] text-center">

            <h2 className="text-xl font-bold text-red-600 mb-3">
              Confirm Delete
            </h2>

            <p className="mb-6">
              Are you sure you want to delete this blog?
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

export default AdminBlog;


