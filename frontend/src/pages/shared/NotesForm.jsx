import React, { useState, useEffect } from "react";

const NotesForm = ({ initialData = {}, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    doctorName: "",
    service: "",
    treatment: "",
    medicines: "",
    report: "",
  });

  useEffect(() => {
    if (initialData) setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Simple validation
    if (!formData.doctorName.trim() || !formData.treatment.trim()) {
      alert("Doctor name and treatment are required!");
      return;
    }

    onSave(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mt-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        📝 {initialData ? "Edit Note" : "Add Patient Note"}
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Doctor Name */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Doctor Name</label>
          <input
            type="text"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleChange}
            placeholder="Enter doctor's name"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Service */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Service</label>
          <input
            type="text"
            name="service"
            value={formData.service}
            onChange={handleChange}
            placeholder="Enter service provided"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Treatment */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Treatment</label>
          <input
            type="text"
            name="treatment"
            value={formData.treatment}
            onChange={handleChange}
            placeholder="Enter treatment details"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Medicines */}
        <div className="flex flex-col">
          <label className="font-medium text-gray-700 mb-1">Medicines</label>
          <input
            type="text"
            name="medicines"
            value={formData.medicines}
            onChange={handleChange}
            placeholder="Enter prescribed medicines"
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Report / Observation */}
        <div className="flex flex-col md:col-span-2">
          <label className="font-medium text-gray-700 mb-1">Report / Observation</label>
          <textarea
            name="report"
            value={formData.report}
            onChange={handleChange}
            placeholder="Write additional notes, patient progress, or report summary..."
            className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 h-28 resize-none"
          />
        </div>

        {/* Buttons */}
        <div className="md:col-span-2 flex justify-end space-x-3 mt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-md transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
          >
            Save Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default NotesForm;
