// import React from "react";
// import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaTwitter } from "react-icons/fa";
// import { FaLocationDot } from "react-icons/fa6";
// import { IoCall } from "react-icons/io5";
// import { MdEmail } from "react-icons/md";

// const Footer = () => {
//   return (
//     <footer className="bg-black text-white py-12">
      
//       <div
//         className="max-w-7xl mx-auto px-6 
//         grid md:grid-cols-4 sm:grid-cols-2 gap-10 
//         text-center md:text-left"
//       >

//         {/* Clinic Info */}
//         <div>
//           <h2 className="text-2xl font-bold text-[#2FC1FF] mb-4">Palamu Dental Care</h2>
//           <p className="text-sl leading-relaxed">
//             Dr. Pankaj Kumar Dental Clinic in Noida provides advanced dental
//             treatments and smile care for all ages. We ensure a healthy,
//             confident smile with modern, painless procedures.
//           </p>

//           {/* Social Icons */}
//           <div className="flex gap-3 mt-4 justify-center md:justify-start">
//             <a
//               href="https://www.facebook.com/yourpage"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-[#2FC1FF] p-2 rounded-full hover:bg-white hover:text-[#2FC1FF] transition"
//             >
//               <FaFacebookF size={18} />
//             </a>

//             <a
//               href="https://www.instagram.com/yourprofile"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-[#2FC1FF] p-2 rounded-full hover:bg-white hover:text-[#2FC1FF] transition"
//             >
//               <FaInstagram size={18} />
//             </a>

//             <a
//               href="https://www.youtube.com/yourchannel"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-[#2FC1FF] p-2 rounded-full hover:bg-white hover:text-[#2FC1FF] transition"
//             >
//               <FaYoutube size={18} />
//             </a>

//             <a
//               href="https://www.linkedin.com/in/yourprofile"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-[#2FC1FF] p-2 rounded-full hover:bg-white hover:text-[#2FC1FF] transition"
//             >
//               <FaLinkedinIn size={18} />
//             </a>

//             <a
//               href="https://twitter.com/yourprofile"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="bg-[#2FC1FF] p-2 rounded-full hover:bg-white hover:text-[#2FC1FF] transition"
//             >
//               <FaTwitter size={18} />
//             </a>
//           </div>
//         </div>

//         {/* Site Links */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Site Links</h3>
//           <ul className="space-y-2 text-sl">
//             <li><a href="/" className="hover:text-[#2FC1FF]">Home</a></li>
//             <li><a href="/about" className="hover:text-[#2FC1FF]">About Us</a></li>
//             <li><a href="/gallery" className="hover:text-[#2FC1FF]"> Gallery</a></li>
//             <li><a href="/contact" className="hover:text-[#2FC1FF]">Contact Us</a></li>
//             <li><a href="/Procedure" className="hover:text-[#2FC1FF]">Procedures</a></li>
//             <li><a href="/Blog" className="hover:text-[#2FC1FF]">Blogs</a></li>
//             <li><a href="/Ultrasound" className="hover:text-[#2FC1FF]">Ultrasound</a></li>
//             <li><a href="/XRay" className="hover:text-[#2FC1FF]">X-Ray</a></li>
//           </ul>
//         </div>

//         {/* All Services */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">All Services</h3>
//           <ul className="space-y-2 text-sl">
//             <li><a href="/Rootcanal" className="hover:text-[#2FC1FF]">Root Canal Therapy</a></li>
//             <li><a href="/ToothExtraction" className="hover:text-[#2FC1FF]">Tooth Extraction</a></li>
//             <li><a href="/Artificialteeth" className="hover:text-[#2FC1FF]">Artificial Teeth (Dentures)</a></li>
//             <li><a href="/Teethalignment" className="hover:text-[#2FC1FF]">Teeth Alignment</a></li>
//             <li><a href="/Ultrasonic_cleaning" className="hover:text-[#2FC1FF]">Ultrasonic Cleaning</a></li>
//             <li><a href="/LaserFilling" className="hover:text-[#2FC1FF]">Laser Tooth Fillings</a></li>
//             <li><a href="/Childtreatment" className="hover:text-[#2FC1FF]">Child Dental Treatment</a></li>
//           </ul>
//         </div>

//         {/* Contact Info */}
//         <div>
//           <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Contact Us</h3>

//           <p className="flex items-start gap-2 text-sl mb-3 justify-center md:justify-start">
//             <FaLocationDot className="text-[#2FC1FF] mt-1" />
//             Noida
//           </p>

//           <p className="flex items-center gap-2 text-sl mb-3 justify-center md:justify-start">
//             <IoCall className="text-[#2FC1FF]" /> +91 xxxxxxxxxx
//           </p>

//           <p className="flex items-center gap-2 text-sl justify-center md:justify-start">
//             <MdEmail className="text-[#2FC1FF]" /> xyz@gmail.com
//           </p>
//         </div>

//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-white-700 mt-10 pt-4 text-center text-sl text-gray-400">
//         © {new Date().getFullYear()} Palamu Dental Care. All Rights Reserved.
//       </div>

//     </footer>
//   );
// };

// export default Footer;



import React from "react";
import { FaFacebookF, FaInstagram, FaYoutube, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { IoCall } from "react-icons/io5";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      
      <div
        className="max-w-7xl mx-auto px-6 
        grid md:grid-cols-4 sm:grid-cols-2 gap-10 
        text-left"
      >

        <div>
          <h2 className="text-2xl font-bold text-[#2FC1FF] mb-4">Palamu Dental Care</h2>
          <p className="text-sl leading-relaxed">
            Dr. Pankaj Kumar Dental Clinic in Noida provides advanced dental
            treatments and smile care for all ages. We ensure a healthy,
            confident smile with modern, painless procedures.
          </p>

          <div className="flex gap-3 mt-4 justify-start">
            <a href="#" className="bg-[#2FC1FF] p-2 rounded-full hover:bg-white hover:text-[#2FC1FF] transition">
              <FaFacebookF size={18} />
            </a>
            <a href="#" className="bg-[#2FC1FF] p-2 rounded-full hover:bg-white hover:text-[#2FC1FF] transition">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="bg-[#2FC1FF] p-2 rounded-full hover:bg-white hover:text-[#2FC1FF] transition">
              <FaYoutube size={18} />
            </a>
            <a href="#" className="bg-[#2FC1FF] p-2 rounded-full hover:bg-white hover:text-[#2FC1FF] transition">
              <FaLinkedinIn size={18} />
            </a>
            <a href="#" className="bg-[#2FC1FF] p-2 rounded-full hover:bg-white hover:text-[#2FC1FF] transition">
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Site Links</h3>
          <ul className="space-y-2 text-sl">
            <li><a href="/" className="hover:text-[#2FC1FF]">Home</a></li>
            <li><a href="/about" className="hover:text-[#2FC1FF]">About Us</a></li>
            <li><a href="/gallery" className="hover:text-[#2FC1FF]">Gallery</a></li>
            <li><a href="/contact" className="hover:text-[#2FC1FF]">Contact Us</a></li>
            <li><a href="/Procedure" className="hover:text-[#2FC1FF]">Procedures</a></li>
            <li><a href="/Blog" className="hover:text-[#2FC1FF]">Blogs</a></li>
            <li><a href="/Ultrasound" className="hover:text-[#2FC1FF]">Ultrasound</a></li>
            <li><a href="/XRay" className="hover:text-[#2FC1FF]">X-Ray</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">All Services</h3>
          <ul className="space-y-2 text-sl">
            <li><a href="/Rootcanal" className="hover:text-[#2FC1FF]">Root Canal Therapy</a></li>
            <li><a href="/ToothExtraction" className="hover:text-[#2FC1FF]">Tooth Extraction</a></li>
            <li><a href="/Artificialteeth" className="hover:text-[#2FC1FF]">Artificial Teeth (Dentures)</a></li>
            <li><a href="/Teethalignment" className="hover:text-[#2FC1FF]">Teeth Alignment</a></li>
            <li><a href="/Ultrasonic_cleaning" className="hover:text-[#2FC1FF]">Ultrasonic Cleaning</a></li>
            <li><a href="/LaserFilling" className="hover:text-[#2FC1FF]">Laser Tooth Fillings</a></li>
            <li><a href="/Childtreatment" className="hover:text-[#2FC1FF]">Child Dental Treatment</a></li>
          </ul>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-4 border-b border-gray-600 pb-2">Contact Us</h3>

          <p className="flex items-start gap-2 text-sl mb-3 justify-start">
            <FaLocationDot className="text-[#2FC1FF] mt-1" />
            Noida
          </p>

          <p className="flex items-center gap-2 text-sl mb-3 justify-start">
            <IoCall className="text-[#2FC1FF]" /> +91 xxxxxxxxxx
          </p>

          <p className="flex items-center gap-2 text-sl justify-start">
            <MdEmail className="text-[#2FC1FF]" /> xyz@gmail.com
          </p>
        </div>

      </div>

      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sl text-gray-400">
        © {new Date().getFullYear()} Palamu Dental Care. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;
