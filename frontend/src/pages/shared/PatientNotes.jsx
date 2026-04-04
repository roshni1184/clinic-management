
import React, { useEffect, useState } from "react";

import NotesForm from "../../../components/NotesForm.jsx";
import API from "../../api/api"; 


const PatientNotes = ({ userId }) => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const token =
    localStorage.getItem("adminToken") || localStorage.getItem("token");

  const fetchNotes = async () => {
    try {
      const res = await API.get(
        `/patient-notes/by-user/${userId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load patient notes");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) fetchNotes();
  }, [userId]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await API.delete(
        `/patient-notes/remove/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes(notes.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete note");
    }
  };

  const handleSave = async (formData) => {
    try {
      if (selectedNote) {
        await API.put(
          `/patient-notes/update/${selectedNote._id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await API.post(
          `/patient-notes/create`,
          { ...formData, userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setShowForm(false);
      setSelectedNote(null);
      fetchNotes();
    } catch (err) {
      console.error(err);
      alert("Failed to save note");
    }
  };

  if (loading) return <div>Loading notes...</div>;

  return (
    <div className="mt-6 bg-white shadow-md rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">🩺 Patient Notes</h2>
        <button
          onClick={() => {
            setSelectedNote(null);
            setShowForm(!showForm);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          {showForm ? "Close" : "Add Note"}
        </button>
      </div>

      {showForm && (
        <NotesForm
          initialData={selectedNote}
          onSave={handleSave}
          onCancel={() => setShowForm(false)}
        />
      )}

      {notes.length ? (
        <table className="min-w-full border mt-4">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th>Doctor</th>
              <th>Treatment</th>
              <th>Medicines</th>
              <th>Report</th>
              <th>Date</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr key={note._id} className="border-b hover:bg-gray-50">
                <td>{note.doctorName}</td>
                <td>{note.treatment}</td>
                <td>{note.medicines}</td>
                <td>{note.report}</td>
                <td>{new Date(note.createdAt).toLocaleDateString()}</td>
                <td className="text-center space-x-2">
                  <button
                    onClick={() => {
                      setSelectedNote(note);
                      setShowForm(true);
                    }}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500 mt-4">No notes found for this patient.</p>
      )}
    </div>
  );
};

export default PatientNotes;
