import React, { useState } from "react";

import API from "../../api/api"; 


const LabRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const res = await API.post(
        `/admin/register-lab`,
        form,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("Lab User Registered Successfully!");

        setForm({
          name: "",
          email: "",
          phone: "",
          password: "",
        });
      }
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-black shadow-lg p-8 rounded-xl border border-red-600">
      <h2 className="text-3xl font-bold text-center mb-6 text-red-500">
        Register Lab User
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5 text-white">

        <div>
          <label className="font-semibold">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-red-500 text-white rounded p-2 mt-1 focus:ring-red-600 focus:border-red-600"
            placeholder="Enter Lab Staff Name"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-red-500 text-white rounded p-2 mt-1 focus:ring-red-600 focus:border-red-600"
            placeholder="Enter Email"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Phone</label>
          <input
            type="text"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-red-500 text-white rounded p-2 mt-1 focus:ring-red-600 focus:border-red-600"
            placeholder="Enter Phone Number"
            required
          />
        </div>

        <div>
          <label className="font-semibold">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full bg-gray-900 border border-red-500 text-white rounded p-2 mt-1 focus:ring-red-600 focus:border-red-600"
            placeholder="Enter Password"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 text-white py-2 rounded-lg mt-4 hover:bg-red-700 transition"
        >
          Register Lab User
        </button>

      </form>
    </div>
  );
};

export default LabRegister;
