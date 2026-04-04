import React, { useEffect, useState } from "react";

import API from "../../api/api"; 


const AdminTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [popup, setPopup] = useState(null);

  const token =
    localStorage.getItem("adminToken") ||
    localStorage.getItem("token");

  /* 🔥 Fetch All Testimonials */
  const fetchTestimonials = async () => {
    try {
      setLoading(true);   

      const res = await API.get(
        `/testimonials/all`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setTestimonials(res.data);
    } catch (error) {
      console.error("Error fetching testimonials");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /* ✅ Approve */
  const handleApprove = async (id) => {
    try {
      await API.put(
        `/testimonials/approve/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setPopup("Testimonial Approved ✅");
      fetchTestimonials();
    } catch (error) {
      console.error("Approve failed");
    }
  };

  /* ❌ Delete */
  const handleDelete = async (id) => {
    try {
      await API.delete(
        `/testimonials/delete/${id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPopup("Testimonial Deleted ❌");
      fetchTestimonials();
    } catch (error) {
      console.error("Delete failed");
    }
  };

  /* 🔥 Auto close popup */
  useEffect(() => {
    if (popup) {
      const timer = setTimeout(() => {
        setPopup(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [popup]);

  if (loading)
    return (
      <div className="text-center mt-20 text-xl font-semibold">
        Loading testimonials...
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto relative">
      <h1 className="text-3xl font-bold mb-8 text-red-600 text-center">
        Manage Testimonials
      </h1>

      <div className="overflow-x-auto bg-black text-white rounded-2xl shadow-2xl p-6">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-800 text-left text-sm uppercase tracking-wider">
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Message</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {testimonials.length > 0 ? (
              testimonials.map((t) => (
                <tr
                  key={t._id}
                  className="border-b border-gray-700 hover:bg-gray-900 transition"
                >
                  <td className="py-3 px-4">{t.name}</td>

                  {/* ✅ FULL MESSAGE DISPLAY */}
                  <td className="py-3 px-4 whitespace-pre-wrap break-words">
                    {t.message}
                  </td>

                  <td className="py-3 px-4 text-yellow-400">
                    {"⭐".repeat(t.rating)}
                  </td>

                  <td className="py-3 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        t.status === "Approved"
                          ? "bg-green-600"
                          : "bg-yellow-500 text-black"
                      }`}
                    >
                      {t.status}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center space-x-2">
                    {t.status !== "Approved" && (
                      <button
                        onClick={() => handleApprove(t._id)}
                        className="bg-green-600 hover:bg-green-700 px-3 py-1 rounded text-sm"
                      >
                        Approve
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(t._id)}
                      className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-400">
                  No testimonials found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Success Popup */}
      {popup && (
        <div className="fixed top-6 right-6 bg-white text-black px-6 py-3 rounded-xl shadow-xl animate-bounce z-50">
          {popup}
        </div>
      )}
    </div>
  );
};

export default AdminTestimonials;