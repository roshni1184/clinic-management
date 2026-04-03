// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// export default function BookAppointment() {
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState("");
//   const [selectedService, setSelectedService] = useState("");
//   const [fee, setFee] = useState("");
//   const [date, setDate] = useState("");
//   const [hour, setHour] = useState("");
//   const [minute, setMinute] = useState("");
//   const [ampm, setAmpm] = useState("AM");
//   const [reason, setReason] = useState("");

//   const [patientName, setPatientName] = useState("");
//   const [patientEmail, setPatientEmail] = useState("");
//   const [patientPhone, setPatientPhone] = useState("");

//   // ✅ Fetch doctors
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await axios.get("${API}/api/doctors");
//         setDoctors(res.data.doctors || []);
//       } catch (err) {
//         console.error("Error fetching doctors:", err);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   // ✅ Prefill patient details if logged in
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       setPatientName(user.name || "");
//       setPatientEmail(user.email || "");
//       setPatientPhone(user.phone || "");
//     }
//   }, []);

//   const services = [
//     "Treatment of Loose Teeth",
//     "Root Canal Therapy (RCT)",
//     "Tooth Extraction",
//     "Impacted Tooth Removal",
//     "Artificial Teeth (Dentures)",
//     "Teeth Alignment",
//     "Ultrasonic Teeth Cleaning",
//     "Laser Tooth Fillings",
//     "Child Dental Treatment",
//     "Dental Bleaching",
//     "Dental X-Ray",
//     "Chest X-Ray",
//     "Skull X-Ray",
//     "Abdominal X-Ray",
//     "Abdominal Ultrasound",
//     "Pelvic Ultrasound",
//     "Pregnancy Ultrasound",
//     "Cardiac Ultrasound (Echo)",
//     "Thyroid Ultrasound",
//     "3D/4D Baby Ultrasound",
//   ];

//   // ✅ Auto Fee Logic
//   const handleServiceChange = (e) => {
//     const service = e.target.value;
//     setSelectedService(service);
//     if (service.toLowerCase().includes("x-ray")) setFee("800");
//     else if (service.toLowerCase().includes("ultrasound")) setFee("1000");
//     else setFee("500");
//   };

//   // ✅ Reset form after successful payment
//   const resetForm = () => {
//     setSelectedDoctor("");
//     setSelectedService("");
//     setFee("");
//     setDate("");
//     setHour("");
//     setMinute("");
//     setAmpm("AM");
//     setReason("");

//     const user = JSON.parse(localStorage.getItem("user"));
//     setPatientName(user?.name || "");
//     setPatientEmail(user?.email || "");
//     setPatientPhone(user?.phone || "");
//   };

//   // ✅ Main Submit with Payment
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formattedTime = `${hour}:${minute} ${ampm}`;

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         Swal.fire({
//           title: "Login Required!",
//           text: "Please login before booking an appointment.",
//           icon: "warning",
//           confirmButtonColor: "#2FC1FF",
//         });
//         return;
//       }

//       if (
//         !selectedDoctor ||
//         !selectedService ||
//         !date ||
//         !hour ||
//         !minute ||
//         !patientName ||
//         !patientEmail ||
//         !patientPhone
//       ) {
//         Swal.fire({
//           title: "Missing Fields",
//           text: "Please fill all required fields before submitting.",
//           icon: "warning",
//           confirmButtonColor: "#2FC1FF",
//         });
//         return;
//       }

//       // ✅ Step 1: Create Appointment (Pending)
//       const res = await axios.post(
//         "${API}/api/appointments",
//         {
//           doctor: selectedDoctor,
//           service: selectedService,
//           fee,
//           date,
//           time: formattedTime,
//           reason,
//           patientName,
//           patientEmail,
//           patientPhone,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (!res.data.success) {
//         Swal.fire("Error", "Failed to create appointment", "error");
//         return;
//       }

//       const appointment = res.data.appointment;

//       // ✅ Step 2: Create Razorpay Order
//       const orderRes = await axios.post(
//         "${API}/api/payment/create-order",
//         { amount: fee },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       const { order } = orderRes.data;
//       const key = import.meta.env.VITE_RAZORPAY_KEY_ID;

//       if (!key) {
//         Swal.fire(
//           "Error",
//           "Razorpay key missing in frontend .env file!",
//           "error"
//         );
//         return;
//       }

//       // ✅ Step 3: Open Razorpay Payment Window
//       const options = {
//         key,
//         amount: order.amount,
//         currency: "INR",
//         name: "Doctor Appointment",
//         description: selectedService,
//         order_id: order.id,
//         handler: async function (response) {
//           try {
//             // ✅ Step 4: Verify Payment
//             const verifyRes = await axios.post(
//               "${API}/api/payment/verify-payment",
//               {
//                 appointmentId: appointment._id,
//                 razorpay_order_id: response.razorpay_order_id,
//                 razorpay_payment_id: response.razorpay_payment_id,
//                 razorpay_signature: response.razorpay_signature,
//               },
//               { headers: { Authorization: `Bearer ${token}` } }
//             );

//             if (verifyRes.data.success) {
//               Swal.fire({
//                 icon: "success",
//                 title: "Payment Successful!",
//                 text: "Your appointment has been confirmed.",
//               });

//               resetForm(); // ✅ Reset form after successful payment
//             } else {
//               Swal.fire({
//                 icon: "error",
//                 title: "Payment Failed!",
//                 text: "Please try again.",
//               });
//             }
//           } catch (err) {
//             console.error("Payment verify error:", err);
//             Swal.fire("Error", "Payment verification failed", "error");
//           }
//         },
//         prefill: {
//           name: patientName,
//           email: patientEmail,
//           contact: patientPhone,
//         },
//         theme: { color: "#2FC1FF" },
//       };

//       const rzp = new window.Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Booking error:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Payment Failed!",
//         text:
//           error.response?.data?.message ||
//           "Something went wrong. Please try again.",
//       });
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 lg:p-12">
//       <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-6 md:p-10 shadow-lg text-center mb-8">
//         <h1 className="text-3xl md:text-4xl font-extrabold text-[#2FC1FF]">
//           Book Appointment
//         </h1>
//         <p className="mt-2 text-sm md:text-base opacity-90">
//           Fill patient details, choose doctor, date & time.
//         </p>
//       </div>

//       <form
//         onSubmit={handleSubmit}
//         className="bg-white p-6 rounded-2xl shadow-lg space-y-6"
//       >
//         {/* --- Patient Details --- */}
//         <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
//           <div className="flex-1">
//             <label className="block font-medium mb-2 text-[#2FC1FF]">Name</label>
//             <input
//               type="text"
//               value={patientName}
//               onChange={(e) => setPatientName(e.target.value)}
//               placeholder="Enter your name"
//               className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
//               required
//             />
//           </div>
//           <div className="flex-1">
//             <label className="block font-medium mb-2 text-[#2FC1FF]">Email</label>
//             <input
//               type="email"
//               value={patientEmail}
//               onChange={(e) => setPatientEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
//               required
//             />
//           </div>
//           <div className="flex-1">
//             <label className="block font-medium mb-2 text-[#2FC1FF]">Phone</label>
//             <input
//               type="text"
//               value={patientPhone}
//               onChange={(e) => setPatientPhone(e.target.value)}
//               placeholder="Enter your phone number"
//               className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
//               required
//             />
//           </div>
//         </div>

//         {/* --- Doctor --- */}
//         <div>
//           <label className="block font-medium mb-2 text-[#2FC1FF]">
//             Select Doctor
//           </label>
//           <select
//             value={selectedDoctor}
//             onChange={(e) => setSelectedDoctor(e.target.value)}
//             required
//             className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
//           >
//             <option value="">-- Choose a Doctor --</option>
//             {doctors.map((doc) => (
//               <option key={doc._id} value={doc._id}>
//                 {doc.name} — {doc.specialization}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* --- Service --- */}
//         <div>
//           <label className="block font-medium mb-2 text-[#2FC1FF]">Select Service</label>
//           <select
//             value={selectedService}
//             onChange={handleServiceChange}
//             required
//             className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
//           >
//             <option value="">-- Choose a Service --</option>
//             {services.map((service, index) => (
//               <option key={index} value={service}>
//                 {service}
//               </option>
//             ))}
//           </select>
//         </div>

//         {/* --- Fee --- */}
//         <div>
//           <label className="block font-medium mb-2 text-[#2FC1FF]">Fees</label>
//           <input
//             type="number"
//             value={fee}
//             onChange={(e) => setFee(e.target.value)}
//             placeholder="Enter fee"
//             className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
//           />
//         </div>

//         {/* --- Date & Time --- */}
//         <div>
//           <label className="block font-medium mb-2 text-[#2FC1FF]">Date</label>
//           <input
//             type="date"
//             value={date}
//             onChange={(e) => setDate(e.target.value)}
//             required
//             className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-2 text-[#2FC1FF]">Time</label>
//           <div className="flex space-x-2">
//             <select
//               value={hour}
//               onChange={(e) => setHour(e.target.value)}
//               required
//               className="border rounded-lg p-3 w-1/3 focus:ring-2 focus:ring-cyan-400 outline-none"
//             >
//               <option value="">HH</option>
//               {[...Array(12)].map((_, i) => (
//                 <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
//                   {String(i + 1).padStart(2, "0")}
//                 </option>
//               ))}
//             </select>
//             <select
//               value={minute}
//               onChange={(e) => setMinute(e.target.value)}
//               required
//               className="border rounded-lg p-3 w-1/3 focus:ring-2 focus:ring-cyan-400 outline-none"
//             >
//               <option value="">MM</option>
//               {["00", "15", "30", "45"].map((m) => (
//                 <option key={m} value={m}>
//                   {m}
//                 </option>
//               ))}
//             </select>
//             <select
//               value={ampm}
//               onChange={(e) => setAmpm(e.target.value)}
//               className="border rounded-lg p-3 w-1/3 focus:ring-2 focus:ring-cyan-400 outline-none"
//             >
//               <option value="AM">AM</option>
//               <option value="PM">PM</option>
//             </select>
//           </div>
//         </div>

//         {/* --- Reason --- */}
//         <div>
//           <label className="block font-medium mb-2 text-[#2FC1FF]">
//             Reason / Message
//           </label>
//           <textarea
//             rows="4"
//             value={reason}
//             onChange={(e) => setReason(e.target.value)}
//             placeholder="Describe your problem..."
//             className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
//           ></textarea>
//         </div>

//         {/* --- Submit --- */}
//         <div className="text-center">
//           <button
//             type="submit"
//             className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold shadow hover:opacity-95 transition"
//           >
//             Book & Pay
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }










import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom"; // ✅ ADDED

export default function BookAppointment() {

  const navigate = useNavigate(); // ✅ ADDED

  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [fee, setFee] = useState("");
  const [date, setDate] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [ampm, setAmpm] = useState("AM");
  const [reason, setReason] = useState("");

  const [patientName, setPatientName] = useState("");
  const [patientEmail, setPatientEmail] = useState("");
  const [patientPhone, setPatientPhone] = useState("");

  // ✅ Fetch doctors
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await axios.get("${API}/api/doctors");
        setDoctors(res.data.doctors || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
    fetchDoctors();
  }, []);

  // ✅ Prefill patient details if logged in
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setPatientName(user.name || "");
      setPatientEmail(user.email || "");
      setPatientPhone(user.phone || "");
    }
  }, []);

  const services = [
    "Treatment of Loose Teeth",
    "Root Canal Therapy (RCT)",
    "Tooth Extraction",
    "Impacted Tooth Removal",
    "Artificial Teeth (Dentures)",
    "Teeth Alignment",
    "Ultrasonic Teeth Cleaning",
    "Laser Tooth Fillings",
    "Child Dental Treatment",
    "Dental Bleaching",
    "Dental X-Ray",
    "Chest X-Ray",
    "Skull X-Ray",
    "Abdominal X-Ray",
    "Abdominal Ultrasound",
    "Pelvic Ultrasound",
    "Pregnancy Ultrasound",
    "Cardiac Ultrasound (Echo)",
    "Thyroid Ultrasound",
    "3D/4D Baby Ultrasound",
  ];

  const handleServiceChange = (e) => {
    const service = e.target.value;
    setSelectedService(service);
    if (service.toLowerCase().includes("x-ray")) setFee("800");
    else if (service.toLowerCase().includes("ultrasound")) setFee("1000");
    else setFee("500");
  };

  const resetForm = () => {
    setSelectedDoctor("");
    setSelectedService("");
    setFee("");
    setDate("");
    setHour("");
    setMinute("");
    setAmpm("AM");
    setReason("");

    const user = JSON.parse(localStorage.getItem("user"));
    setPatientName(user?.name || "");
    setPatientEmail(user?.email || "");
    setPatientPhone(user?.phone || "");
  };

  // ✅ Main Submit with Payment
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedTime = `${hour}:${minute} ${ampm}`;

    try {
      const token = localStorage.getItem("token");

      // 🔥 ONLY CHANGE HERE
      if (!token) {
        Swal.fire({
          title: "Login Required!",
          text: "Please login before booking an appointment.",
          icon: "warning",
          confirmButtonColor: "#2FC1FF",
        }).then(() => {
          navigate("/login", { state: { from: "/book-appointment" } });
        });
        return;
      }

      if (
        !selectedDoctor ||
        !selectedService ||
        !date ||
        !hour ||
        !minute ||
        !patientName ||
        !patientEmail ||
        !patientPhone
      ) {
        Swal.fire({
          title: "Missing Fields",
          text: "Please fill all required fields before submitting.",
          icon: "warning",
          confirmButtonColor: "#2FC1FF",
        });
        return;
      }

      // ✅ Step 1: Create Appointment (Pending)
      const res = await axios.post(
        "${API}/api/appointments",
        {
          doctor: selectedDoctor,
          service: selectedService,
          fee,
          date,
          time: formattedTime,
          reason,
          patientName,
          patientEmail,
          patientPhone,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (!res.data.success) {
        Swal.fire("Error", "Failed to create appointment", "error");
        return;
      }

      const appointment = res.data.appointment;

      // ✅ Step 2: Create Razorpay Order
      const orderRes = await axios.post(
        "${API}/api/payment/create-order",
        { amount: fee },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { order } = orderRes.data;
      const key = import.meta.env.VITE_RAZORPAY_KEY_ID;

      if (!key) {
        Swal.fire(
          "Error",
          "Razorpay key missing in frontend .env file!",
          "error"
        );
        return;
      }

      // ✅ Step 3: Open Razorpay Payment Window
      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Doctor Appointment",
        description: selectedService,
        order_id: order.id,
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              "${API}/api/payment/verify-payment",
              {
                appointmentId: appointment._id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            if (verifyRes.data.success) {
              Swal.fire({
                icon: "success",
                title: "Payment Successful!",
                text: "Your appointment has been confirmed.",
              });
              resetForm();
            } else {
              Swal.fire({
                icon: "error",
                title: "Payment Failed!",
                text: "Please try again.",
              });
            }
          } catch (err) {
            Swal.fire("Error", "Payment verification failed", "error");
          }
        },
        prefill: {
          name: patientName,
          email: patientEmail,
          contact: patientPhone,
        },
        theme: { color: "#2FC1FF" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Payment Failed!",
        text:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 lg:p-12">
      <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-6 md:p-10 shadow-lg text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-[#2FC1FF]">
          Book Appointment
        </h1>
        <p className="mt-2 text-sm md:text-base opacity-90">
          Fill patient details, choose doctor, date & time.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-2xl shadow-lg space-y-6"
      >
        {/* --- Patient Details --- */}
        <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
          <div className="flex-1">
            <label className="block font-medium mb-2 text-[#2FC1FF]">Name</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Enter your name"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-2 text-[#2FC1FF]">Email</label>
            <input
              type="email"
              value={patientEmail}
              onChange={(e) => setPatientEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block font-medium mb-2 text-[#2FC1FF]">Phone</label>
            <input
              type="text"
              value={patientPhone}
              onChange={(e) => setPatientPhone(e.target.value)}
              placeholder="Enter your phone number"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
              required
            />
          </div>
        </div>

        {/* --- Doctor --- */}
        <div>
          <label className="block font-medium mb-2 text-[#2FC1FF]">
            Select Doctor
          </label>
          <select
            value={selectedDoctor}
            onChange={(e) => setSelectedDoctor(e.target.value)}
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
          >
            <option value="">-- Choose a Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name} — {doc.specialization}
              </option>
            ))}
          </select>
        </div>

        {/* --- Service --- */}
        <div>
          <label className="block font-medium mb-2 text-[#2FC1FF]">Select Service</label>
          <select
            value={selectedService}
            onChange={handleServiceChange}
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
          >
            <option value="">-- Choose a Service --</option>
            {services.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        {/* --- Fee --- */}
        <div>
          <label className="block font-medium mb-2 text-[#2FC1FF]">Fees</label>
          <input
            type="number"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            placeholder="Enter fee"
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
        </div>

        {/* --- Date & Time --- */}
        <div>
          <label className="block font-medium mb-2 text-[#2FC1FF]">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
          />
        </div>

        <div>
          <label className="block font-medium mb-2 text-[#2FC1FF]">Time</label>
          <div className="flex space-x-2">
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              required
              className="border rounded-lg p-3 w-1/3 focus:ring-2 focus:ring-cyan-400 outline-none"
            >
              <option value="">HH</option>
              {[...Array(12)].map((_, i) => (
                <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                  {String(i + 1).padStart(2, "0")}
                </option>
              ))}
            </select>
            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              required
              className="border rounded-lg p-3 w-1/3 focus:ring-2 focus:ring-cyan-400 outline-none"
            >
              <option value="">MM</option>
              {["00", "15", "30", "45"].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              value={ampm}
              onChange={(e) => setAmpm(e.target.value)}
              className="border rounded-lg p-3 w-1/3 focus:ring-2 focus:ring-cyan-400 outline-none"
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </div>

        {/* --- Reason --- */}
        <div>
          <label className="block font-medium mb-2 text-[#2FC1FF]">
            Reason / Message
          </label>
          <textarea
            rows="4"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Describe your problem..."
            className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-cyan-400 outline-none"
          ></textarea>
        </div>

        {/* --- Submit --- */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold shadow hover:opacity-95 transition"
          >
            Book & Pay
          </button>
        </div>
      </form>
    </div>
    // 🔵 YOUR COMPLETE ORIGINAL FORM JSX SAME AS BEFORE
    // 🔵 No changes made to UI
  );
}



// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// export default function BookAppointment() {
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState("");
//   const [selectedService, setSelectedService] = useState("");
//   const [fee, setFee] = useState("");
//   const [date, setDate] = useState("");
//   const [hour, setHour] = useState("");
//   const [minute, setMinute] = useState("");
//   const [ampm, setAmpm] = useState("AM");
//   const [reason, setReason] = useState("");

//   // Patient details
//   const [patientName, setPatientName] = useState("");
//   const [patientEmail, setPatientEmail] = useState("");
//   const [patientPhone, setPatientPhone] = useState("");

//   // Fetch doctors
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const res = await axios.get("${API}/api/doctors");
//         setDoctors(res.data.doctors || []);
//       } catch (err) {
//         console.error("Error fetching doctors:", err);
//       }
//     };
//     fetchDoctors();
//   }, []);

//   const services = [
//     "Treatment of Loose Teeth",
//     "Root Canal Therapy (RCT)",
//     "Tooth Extraction",
//     "Impacted Tooth Removal",
//     "Artificial Teeth (Dentures)",
//     "Teeth Alignment",
//     "Ultrasonic Teeth Cleaning",
//     "Laser Tooth Fillings",
//     "Child Dental Treatment",
//     "Dental Bleaching",
//     "Dental X-Ray",
//     "Chest X-Ray",
//     "Skull X-Ray",
//     "Abdominal X-Ray",
//     "Abdominal Ultrasound",
//     "Pelvic Ultrasound",
//     "Pregnancy Ultrasound",
//     "Cardiac Ultrasound (Echo)",
//     "Thyroid Ultrasound",
//     "3D/4D Baby Ultrasound",
//   ];

//   // Fee logic
//   const handleServiceChange = (e) => {
//     const service = e.target.value;
//     setSelectedService(service);
//     if (service.toLowerCase().includes("x-ray")) setFee("800");
//     else if (service.toLowerCase().includes("ultrasound")) setFee("1000");
//     else setFee("500");
//   };

//   // Razorpay Checkout
//   const handlePayment = async (appointmentId, amount) => {
//   try {
//     const res = await axios.post(
//       "${API}/api/appointments/create-order",
//       { amount },
//       { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//     );

//     const { order } = res.data;

//     const options = {
//       key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//       amount: order.amount,
//       currency: order.currency,
//       name: "Dental Clinic",
//       description: "Appointment Payment",
//       order_id: order.id,
//       handler: async function (response) {
//         await axios.post(
//           "${API}/api/appointments/verify-payment",
//           {
//             appointmentId, // pass the booked appointment id
//             razorpay_order_id: response.razorpay_order_id,
//             razorpay_payment_id: response.razorpay_payment_id,
//             razorpay_signature: response.razorpay_signature,
//           },
//           { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
//         );
//         Swal.fire("Payment Successful", "Appointment booked & confirmed!", "success");
//       },
//       prefill: {
//         name: patientName,
//         email: patientEmail,
//         contact: patientPhone,
//       },
//       theme: { color: "#2FC1FF" },
//     };

//     const rzp = new window.Razorpay(options);
//     rzp.open();
//   } catch (err) {
//     console.error(err);
//     Swal.fire("Error", "Failed to initiate payment", "error");
//   }
// };


//   // Form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formattedTime = `${hour}:${minute} ${ampm}`;

//     try {
//       const token = localStorage.getItem("token");
//       if (!token) {
//         Swal.fire("Login Required", "Please login to book appointment", "warning");
//         return;
//       }

//       if (
//         !selectedDoctor ||
//         !selectedService ||
//         !date ||
//         !hour ||
//         !minute ||
//         !patientName ||
//         !patientEmail ||
//         !patientPhone
//       ) {
//         Swal.fire("Missing Fields", "Please fill all required fields", "warning");
//         return;
//       }

//       // 1️⃣ Book appointment (status pending)
//       const res = await axios.post(
//         "${API}/api/appointments",
//         {
//           doctor: selectedDoctor,
//           service: selectedService,
//           fee,
//           date,
//           time: formattedTime,
//           reason,
//           patientName,
//           patientEmail,
//           patientPhone,
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       if (res.data.success) {
//         // 2️⃣ Trigger Razorpay payment
//         handlePayment(res.data.appointment._id, fee);
//       }
//     } catch (err) {
//       console.error(err);
//       Swal.fire("Error", "Failed to book appointment", "error");
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6 lg:p-12">
//       <h1 className="text-3xl font-bold text-center text-[#2FC1FF] mb-8">
//         Book Appointment
//       </h1>

//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg space-y-6">
//         {/* Patient & Appointment Fields (same as your previous code) */}
//         {/* ... add all the input fields here as you already have ... */}
//         <div className="text-center">
//           <button
//             type="submit"
//             className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold shadow hover:opacity-95 transition"
//           >
//             Book Appointment & Pay
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

