import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../../utils/api";
import axios from "axios";

const AdminLabUserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLabUser = async () => {
      if (!id) return;
      try {
        const res = await axios.get(
          `${API}/api/admin/lab-user/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching lab user:", err);
        setError("Failed to load lab user details");
      } finally {
        setLoading(false);
      }
    };

    fetchLabUser();
  }, [id, token]);

  if (loading)
    return <p className="text-center mt-20 text-gray-300">Loading lab user details...</p>;
  if (error)
    return <p className="text-center mt-20 text-red-500">{error}</p>;
  if (!user)
    return <p className="text-center mt-20 text-gray-400">Lab user not found</p>;

  return (
    <div className="min-h-screen p-6 bg-black flex justify-center">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6">
        <h2 className="text-3xl font-bold mb-6 text-red-600 text-center">
          Lab User Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 rounded-xl border border-red-600">
          <div className="space-y-3">
            <p>
              <strong className="text-red-600">ID:</strong> {user._id}
            </p>
            <p>
              <strong className="text-red-600">Name:</strong> {user.name}
            </p>
            <p>
              <strong className="text-red-600">Email:</strong> {user.email}
            </p>
            <p>
              <strong className="text-red-600">Phone:</strong> {user.phone || "N/A"}
            </p>
          </div>

          <div className="space-y-3">
            <p>
              <strong className="text-red-600">Role:</strong> {user.role}
            </p>
            <p>
              <strong className="text-red-600">Created At:</strong>{" "}
              {new Date(user.createdAt).toLocaleString()}
            </p>
            <p>
              <strong className="text-red-600">Updated At:</strong>{" "}
              {new Date(user.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/admin/lab/users"
            className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition"
          >
            ← Back to Lab Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLabUserDetail;
