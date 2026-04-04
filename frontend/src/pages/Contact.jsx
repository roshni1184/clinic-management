
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import contactimg from "../images/contactimg.png";
// import Certificationsimg from "../images/Certificationsimg.png";

// const Contact = () => {

//   /* ⭐ Testimonials State */
//   const [testimonials, setTestimonials] = useState([]);

//   /* ⭐ Slider Settings */
//   const sliderSettings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//     responsive: [
//       {
//         breakpoint: 1024,
//         settings: { slidesToShow: 2 },
//       },
//       {
//         breakpoint: 640,
//         settings: { slidesToShow: 1 },
//       },
//     ],
//   };

//   /* ⭐ Fetch Testimonials */
//   const fetchTestimonials = async () => {
//     try {
//       const res = await axios.get("${API}/api/testimonials");
//       setTestimonials(res.data);
//     } catch (error) {
//       console.log("Error fetching testimonials");
//     }
//   };

//   useEffect(() => {
//     fetchTestimonials();
//   }, []);

//   return (
//     <section
//       className="relative w-full min-h-screen"
//       style={{
//         backgroundImage: `url(${contactimg})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >

//       {/* Overlay */}
//       <div className="absolute inset-0 bg-black/40"></div>

//       <div className="relative z-10">

//         {/* HERO */}
//         <div className="w-full h-[20vh] flex items-center justify-center text-center">
//           <h1 className="text-white text-4xl md:text-5xl font-bold">
//             Contact Us
//           </h1>
//         </div>

//         {/* CONTACT FORM + INFO */}
//         <section className="py-16 px-6 md:px-10">
//           <div className="grid md:grid-cols-2 gap-10 items-start bg-white p-8 rounded-2xl shadow-lg min-h-[500px]">

//             {/* LEFT FORM */}
//             <div>
//               <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#2FC1FF]">
//                 Get in Touch
//               </h2>

//               <form
//                 action="https://api.web3forms.com/submit"
//                 method="POST"
//                 className="space-y-4"
//               >

//                 <input
//                   type="hidden"
//                   name="access_key"
//                   value="16170fdd-6746-4e77-9d61-cf7b28cd5eb6"
//                 />

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <input
//                     type="text"
//                     name="name"
//                     placeholder="Your Name"
//                     className="w-full p-3 border rounded-lg"
//                     required
//                   />

//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Your Email"
//                     className="w-full p-3 border rounded-lg"
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <input
//                     type="tel"
//                     name="phone"
//                     placeholder="Your Phone"
//                     className="w-full p-3 border rounded-lg"
//                     required
//                   />

//                   <input
//                     type="date"
//                     name="dob"
//                     className="w-full p-3 border rounded-lg"
//                     required
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

//                   <select
//                     name="service"
//                     className="w-full p-3 border rounded-lg"
//                     required
//                   >
//                     <option value="">Select Service</option>
//                     <option>Root Canal Therapy</option>
//                     <option>Tooth Extraction</option>
//                     <option>Teeth Alignment</option>
//                     <option>Dental Bleaching</option>
//                   </select>

//                   <select
//                     name="referral"
//                     className="w-full p-3 border rounded-lg"
//                     required
//                   >
//                     <option value="">How did you hear about us?</option>
//                     <option>Google</option>
//                     <option>Facebook</option>
//                     <option>Friend</option>
//                   </select>

//                 </div>

//                 <textarea
//                   name="message"
//                   rows="5"
//                   placeholder="Your Message"
//                   className="w-full p-3 border rounded-lg"
//                   required
//                 ></textarea>

//                 <button
//                   type="submit"
//                   className="w-full bg-[#2FC1FF] text-white py-3 rounded-lg font-semibold hover:bg-[#1ba7e0]"
//                 >
//                   SUBMIT
//                 </button>

//               </form>
//             </div>

//             {/* RIGHT INFO */}
//             <div>

//               <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#2FC1FF]">
//                 Clinic Address
//               </h2>

//               <p className="mb-4 text-lg">
//                 🏥 Palamu Dental Care, Daltonganj
//               </p>

//               <p className="mb-2 text-gray-800">
//                 📞 +91 xxxxxxxxxx
//               </p>

//               <p className="mb-6 text-gray-800">
//                 📧 xyz@gmail.com
//               </p>

//               <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">

//                 <iframe
//                   title="Google Map"
//                   src="https://www.google.com/maps?q=Daltonganj&output=embed"
//                   width="100%"
//                   height="100%"
//                   style={{ border: 0 }}
//                   loading="lazy"
//                 ></iframe>

//               </div>

//             </div>
//           </div>
//         </section>



//         {/* CERTIFICATIONS */}
//         <section className="py-16 px-6 md:px-20 bg-white">

//           <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">

//             <div>
//               <img
//                 src={Certificationsimg}
//                 alt="Recognitions"
//                 className="w-full rounded-2xl shadow-lg"
//               />
//             </div>

//             <div>

//               <h2 className="text-2xl md:text-3xl font-bold text-[#2FC1FF] mb-6">
//                 Recognitions & Certifications
//               </h2>

//               <ul className="list-disc list-inside space-y-3 text-gray-800 text-lg">
//                 <li>ISO 9001:2015 Certified Dental Clinic</li>
//                 <li>Member of Indian Dental Association</li>
//                 <li>Best Dental Care Award 2023</li>
//                 <li>Certified in Cosmetic Dentistry</li>
//                 <li>Continuing Dental Education Programs</li>
//               </ul>

//             </div>

//           </div>

//         </section>

//       </div>

//     </section>
//   );
// };

// export default Contact;



import React, { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick";
import { motion } from "framer-motion";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import contactimg from "../images/contactimg.png";
import Certificationsimg from "../images/Certificationsimg.png";
import API from "../../utils/api";

const Contact = () => {

  const [testimonials, setTestimonials] = useState([]);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${API}/api/testimonials`);
      setTestimonials(res.data);
    } catch (error) {
      console.log("Error fetching testimonials");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return (
    <section
      className="relative w-full min-h-screen"
      style={{
        backgroundImage: `url(${contactimg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10">

        <div className="w-full h-[20vh] flex items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-4xl md:text-5xl font-bold"
          >
            Contact Us
          </motion.h1>
        </div>

        <section className="py-16 px-6 md:px-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-10 items-start bg-white p-8 rounded-2xl shadow-lg min-h-[500px]"
          >

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#2FC1FF]">
                Get in Touch
              </h2>

              <form
                action="https://api.web3forms.com/submit"
                method="POST"
                className="space-y-4"
              >
                <input type="hidden" name="access_key" value="16170fdd-6746-4e77-9d61-cf7b28cd5eb6" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="text" name="name" placeholder="Your Name" className="w-full p-3 border rounded-lg" required />
                  <input type="email" name="email" placeholder="Your Email" className="w-full p-3 border rounded-lg" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input type="tel" name="phone" placeholder="Your Phone" className="w-full p-3 border rounded-lg" required />
                  <input type="date" name="dob" className="w-full p-3 border rounded-lg" required />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select name="service" className="w-full p-3 border rounded-lg" required>
                    <option value="">Select Service</option>
                    <option>Root Canal Therapy</option>
                    <option>Tooth Extraction</option>
                    <option>Teeth Alignment</option>
                    <option>Dental Bleaching</option>
                  </select>

                  <select name="referral" className="w-full p-3 border rounded-lg" required>
                    <option value="">How did you hear about us?</option>
                    <option>Google</option>
                    <option>Facebook</option>
                    <option>Friend</option>
                  </select>
                </div>

                <textarea name="message" rows="5" placeholder="Your Message" className="w-full p-3 border rounded-lg" required></textarea>

                <button type="submit" className="w-full bg-[#2FC1FF] text-white py-3 rounded-lg font-semibold hover:bg-[#1ba7e0]">
                  SUBMIT
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-[#2FC1FF]">
                Clinic Address
              </h2>

              <p className="mb-4 text-lg">🏥 Palamu Dental Care, Daltonganj</p>
              <p className="mb-2 text-gray-800">📞 +91 xxxxxxxxxx</p>
              <p className="mb-6 text-gray-800">📧 xyz@gmail.com</p>

              <div className="w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-lg">
                <iframe
                  title="Google Map"
                  src="https://www.google.com/maps?q=Daltonganj&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              </div>
            </motion.div>

          </motion.div>
        </section>

        <section className="py-16 px-6 md:px-20 bg-white">

          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center"
          >

            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img src={Certificationsimg} className="w-full rounded-2xl shadow-lg" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-[#2FC1FF] mb-6">
                Recognitions & Certifications
              </h2>

              <ul className="list-disc list-inside space-y-3 text-gray-800 text-lg">
                <li>ISO 9001:2015 Certified Dental Clinic</li>
                <li>Member of Indian Dental Association</li>
                <li>Best Dental Care Award 2023</li>
                <li>Certified in Cosmetic Dentistry</li>
                <li>Continuing Dental Education Programs</li>
              </ul>
            </motion.div>

          </motion.div>

        </section>

      </div>

    </section>
  );
};

export default Contact;
