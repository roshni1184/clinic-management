import React, { useState } from "react";

import API from "../api/api"; 

const TestimonialForm = ({ onClose, onSuccess }) => {
  const [form, setForm] = useState({
    name: "",
    message: "",
    rating: 5,
  });

  const [loading, setLoading] = useState(false);

  const wordCount = form.message
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  const handleMessageChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/).filter(Boolean);

    if (words.length <= 50) {
      setForm({ ...form, message: text });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (wordCount > 50) return;

    try {
      setLoading(true);

      await API.post(
        `/testimonials`,
        form
      );

      setForm({ name: "", message: "", rating: 5 });

      if (onSuccess) onSuccess();

      setTimeout(() => {
        if (onClose) onClose();
      }, 1000);

    } catch (error) {
      console.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6">
      <h2 className="text-xl font-bold mb-4 text-red-600 text-center">
        Leave a Review
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          className="w-full p-3 border rounded-lg"
          required
        />

        <textarea
          placeholder="Write your message (Max 50 words)"
          value={form.message}
          onChange={handleMessageChange}
          rows="4"
          className="w-full p-3 border rounded-lg resize-none"
          required
        />

        <p className="text-sm text-gray-500">
          {wordCount} / 50 words
        </p>

        <select
          value={form.rating}
          onChange={(e) =>
            setForm({ ...form, rating: Number(e.target.value) })
          }
          className="w-full p-3 border rounded-lg"
        >
          <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
          <option value={4}>⭐⭐⭐⭐ (4)</option>
          <option value={3}>⭐⭐⭐ (3)</option>
          <option value={2}>⭐⭐ (2)</option>
          <option value={1}>⭐ (1)</option>
        </select>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 rounded-lg text-white bg-red-600 hover:bg-red-700"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default TestimonialForm;