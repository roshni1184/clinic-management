import React, { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import API from "../../api/api"; 


const ViewEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await API.get(
          `/employee/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setEmployee(res.data.employee);
      } catch (err) {
        setError("Failed to load employee details");
      }
      setLoading(false);
    };

    fetchEmployee();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-white py-10 text-lg">Loading details...</p>
    );

  if (error)
    return (
      <p className="text-red-500 bg-red-100 p-4 rounded text-center mt-4">
        {error}
      </p>
    );

  return (
    <div className="p-6 bg-black min-h-screen text-white">
      <h2 className="text-3xl font-bold mb-4 text-red-500 border-b border-red-700 pb-2">
        Employee Details
      </h2>

      <div className="bg-gray-900 p-6 rounded shadow-xl border border-red-500">
        <p className="text-lg mb-2"><strong>Name:</strong> {employee.name}</p>
        <p className="text-lg mb-2"><strong>Custom ID:</strong> {employee.customId}</p>
        <p className="text-lg mb-2"><strong>Email:</strong> {employee.email}</p>
        <p className="text-lg mb-2"><strong>Phone:</strong> {employee.phone || "-"}</p>
        <p className="text-lg mb-2"><strong>Role:</strong> {employee.role}</p>
        <p className="text-lg mb-2"><strong>Department:</strong> {employee.department || "-"}</p>
      </div>

      <button
        onClick={() => navigate(-1)}
        className="mt-6 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Back
      </button>
    </div>
  );
};

export default ViewEmployee;
