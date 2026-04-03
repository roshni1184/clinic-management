


// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Phone, Mail, Menu, X, ChevronDown } from "lucide-react";
// import navbarimage from "../images/navbarimg.png";

// const Navbar = () => {

//   const [isOpen, setIsOpen] = useState(false);
//   const [servicesOpen, setServicesOpen] = useState(false);
//   const [accountOpen, setAccountOpen] = useState(false);
//   const [user, setUser] = useState(null);

//   /* Get user from localStorage */
//   useEffect(() => {
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser) {
//       setUser(storedUser);
//     }
//   }, []);

//   const firstLetter = user?.name?.charAt(0).toUpperCase();

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     setUser(null);
//   };

//   return (
//     <header className="w-full bg-black shadow relative z-50">

//       {/* Top Bar */}
//       <div className="flex items-center justify-between px-6 py-3 text-[#2FC1FF]">

//         {/* Logo */}
//         <img
//           src={navbarimage}
//           alt="Clinic Logo"
//           className="h-[60px] w-[180px] md:h-[80px] md:w-[230px]"
//         />

//         {/* Clinic Name */}
//         <h1 className="hidden md:block text-lg font-bold text-white">
//           DR. **********
//         </h1>

//         {/* Contact Info */}
//         <div className="hidden md:flex items-center space-x-6">
//           <a href="tel:+918340275770" className="flex items-center space-x-2 hover:text-white">
//             <Phone className="h-5 w-5" />
//             <span>+91 xxxxxxxxxx</span>
//           </a>

//           <a href="mailto:xyz@gmail.com" className="flex items-center space-x-2 hover:text-white">
//             <Mail className="h-5 w-5" />
//             <span>xyz@gmail.com</span>
//           </a>
//         </div>

//         {/* Desktop Buttons */}
//         <div className="hidden md:flex items-center space-x-4">

//           {user ? (

//             /* Profile Avatar */
//             <div className="relative">

//               <button
//                 onClick={() => setAccountOpen(!accountOpen)}
//                 className="h-10 w-10 rounded-full bg-[#2FC1FF] text-black font-bold flex items-center justify-center"
//               >
//                 {firstLetter}
//               </button>

//               {accountOpen && (
//                 <ul className="absolute right-0 mt-2 bg-black border border-gray-700 rounded-md shadow-lg text-[#2FC1FF] w-40">

//                   <li>
//                     <Link
//                       to="/profile"
//                       className="block px-4 py-2 hover:text-white"
//                       onClick={() => setAccountOpen(false)}
//                     >
//                       My Profile
//                     </Link>
//                   </li>

//                   <li>
//                     <button
//                       onClick={handleLogout}
//                       className="block px-4 py-2 hover:text-white w-full text-left"
//                     >
//                       Logout
//                     </button>
//                   </li>

//                 </ul>
//               )}

//             </div>

//           ) : (

//             /* SignUp Login Dropdown */
//             <div className="relative">

//               <button
//                 onClick={() => setAccountOpen(!accountOpen)}
//                 className="text-white border border-white px-3 py-1 rounded-md font-semibold hover:bg-white hover:text-black transition flex items-center gap-1"
//               >
//                 SignUp / Login

//                 <ChevronDown
//                   className={`h-4 w-4 transition-transform ${
//                     accountOpen ? "rotate-180" : ""
//                   }`}
//                 />

//               </button>

//               {accountOpen && (
//                 <ul className="absolute right-0 mt-2 bg-black border border-gray-700 rounded-md shadow-lg text-[#2FC1FF] w-40">

//                   <li>
//                     <Link
//                       to="/signup"
//                       className="block px-4 py-2 hover:text-white"
//                     >
//                       Sign Up
//                     </Link>
//                   </li>

//                   <li>
//                     <Link
//                       to="/login"
//                       className="block px-4 py-2 hover:text-white"
//                     >
//                       Login
//                     </Link>
//                   </li>

//                 </ul>
//               )}

//             </div>

//           )}

//           {/* Book Appointment */}
//           <Link
//             to="/book-appointment"
//             className="bg-[#2FC1FF] text-black px-4 py-2 rounded-md font-semibold hover:bg-white hover:text-black transition"
//           >
//             Book Appointment
//           </Link>

//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           className="md:hidden text-white"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>

//       </div>

//       {/* Desktop Navigation */}
//       <nav className="hidden md:block bg-black border-t border-white text-white">

//         <ul className="flex justify-center space-x-10 py-4 text-lg font-semibold">

//           <li><Link to="/" className="text-[#2FC1FF] hover:text-white">Home</Link></li>
//           <li><Link to="/about" className="text-[#2FC1FF] hover:text-white">About Us</Link></li>
//           <li><Link to="/gallery" className="text-[#2FC1FF] hover:text-white">Gallery</Link></li>
//           <li><Link to="/blog" className="text-[#2FC1FF] hover:text-white">Blog</Link></li>
//           <li><Link to="/contact" className="text-[#2FC1FF] hover:text-white">Contact Us</Link></li>
//           <li><Link to="/Ultrasound" className="text-[#2FC1FF] hover:text-white">Ultrasound</Link></li>
//           <li><Link to="/XRay" className="text-[#2FC1FF] hover:text-white">X-Ray</Link></li>

//           {/* Services Dropdown */}
//           <li className="relative group">

//             <span className="cursor-pointer text-[#2FC1FF] hover:text-white">
//               Services ▾
//             </span>

//             <ul className="absolute left-0 top-full hidden group-hover:block bg-black text-[#2FC1FF] shadow-lg rounded-md w-64">

//               <li><Link to="/looseteeth" className="block px-4 py-2 text-sm hover:text-white">Treatment of Loose Teeth</Link></li>
//               <li><Link to="/rootcanal" className="block px-4 py-2 text-sm hover:text-white">Root Canal Therapy (RCT)</Link></li>
//               <li><Link to="/Toothextraction" className="block px-4 py-2 text-sm hover:text-white">Tooth Extraction</Link></li>
//               <li><Link to="/Impactooth" className="block px-4 py-2 text-sm hover:text-white">Impacted Tooth Removal</Link></li>
//               <li><Link to="/Artificialteeth" className="block px-4 py-2 text-sm hover:text-white">Artificial Teeth (Dentures)</Link></li>
//               <li><Link to="/Teethalignment" className="block px-4 py-2 text-sm hover:text-white">Teeth Alignment</Link></li>
//               <li><Link to="/Ultrasonic_cleaning" className="block px-4 py-2 text-sm hover:text-white">Ultrasonic Teeth Cleaning</Link></li>
//               <li><Link to="/LaserFilling" className="block px-4 py-2 text-sm hover:text-white">Laser Tooth Fillings</Link></li>
//               <li><Link to="/TMDOMDTreatment" className="block px-4 py-2 text-sm hover:text-white">TMDs & OMDs Treatment</Link></li>
//               <li><Link to="/Childtreatment" className="block px-4 py-2 text-sm hover:text-white">Child Dental Treatment</Link></li>
//               <li><Link to="/DentalBleach" className="block px-4 py-2 text-sm hover:text-white">Dental Bleaching</Link></li>
//               <li><Link to="/MouthulcerTeat" className="block px-4 py-2 text-sm hover:text-white">Mouth Ulcer Treatment</Link></li>

//             </ul>

//           </li>

//         </ul>

//       </nav>

//     </header>
//   );
// };

// export default Navbar;




import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Phone, Mail, Menu, X, ChevronDown } from "lucide-react";
import navbarimage from "../images/navbarimg.png";

const Navbar = () => {

  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const [user, setUser] = useState(null);

  /* user fetch from localStorage */
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const firstLetter = user?.name?.charAt(0).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  const goToDashboard = () => {

    if (user?.role === "admin") {
      navigate("/admin/dashboard");
    }

    else if (user?.role === "doctor") {
      navigate("/doctor/dashboard");
    }

    else if (user?.role === "labuser") {
      navigate("/lab/dashboard");
    }
    else {
      navigate("/user/dashboard");
    }

    setAccountOpen(false);
  };

  return (
    <header className="w-full bg-black shadow relative z-50">

      {/* Top Bar */}
      <div className="flex items-center justify-between px-6 py-3 text-[#2FC1FF]">

        {/* Logo */}
        <img
          src={navbarimage}
          alt="Clinic Logo"
          className="h-[60px] w-[180px] md:h-[80px] md:w-[230px]"
        />

        {/* Clinic Name */}
        <h1 className="hidden md:block text-lg font-bold text-white">
          DR. **********
        </h1>

        {/* Contact Info */}
        <div className="hidden md:flex items-center space-x-6">

          <a
            href="tel:+918340275770"
            className="flex items-center space-x-2 hover:text-white"
          >
            <Phone className="h-5 w-5" />
            <span>+91 xxxxxxxxxx</span>
          </a>

          <a
            href="mailto:xyz@gmail.com"
            className="flex items-center space-x-2 hover:text-white"
          >
            <Mail className="h-5 w-5" />
            <span>xyz@gmail.com</span>
          </a>

        </div>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-4">

          {user ? (

            /* PROFILE AVATAR */
            <div className="relative">

              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="h-10 w-10 rounded-full bg-[#2FC1FF] text-black font-bold flex items-center justify-center"
              >
                {firstLetter}
              </button>

              {accountOpen && (

                <ul
                  className="absolute right-0 mt-2 bg-black border border-gray-700 rounded-md shadow-lg text-[#2FC1FF] w-40 z-50"
                >

                  <li>
                    <button
                      onClick={goToDashboard}
                      className="block px-4 py-2 hover:text-white w-full text-left"
                    >
                      My Profile
                    </button>
                  </li>

                  <li>
                    <button
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:text-white w-full text-left"
                    >
                      Logout
                    </button>
                  </li>

                </ul>

              )}

            </div>

          ) : (

            /* SIGNUP LOGIN */
            <div className="relative">

              <button
                onClick={() => setAccountOpen(!accountOpen)}
                className="text-white border border-white px-3 py-1 rounded-md font-semibold hover:bg-white hover:text-black transition flex items-center gap-1"
              >
                SignUp / Login

                <ChevronDown
                  className={`h-4 w-4 transition-transform ${
                    accountOpen ? "rotate-180" : ""
                  }`}
                />

              </button>

              {accountOpen && (

                <ul
                  className="absolute right-0 mt-2 bg-black border border-gray-700 rounded-md shadow-lg text-[#2FC1FF] w-40 z-50"
                >

                  <li>
                    <Link
                      to="/signup"
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-2 hover:text-white"
                    >
                      Sign Up
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/login"
                      onClick={() => setAccountOpen(false)}
                      className="block px-4 py-2 hover:text-white"
                    >
                      Login
                    </Link>
                  </li>

                </ul>

              )}

            </div>

          )}

          {/* Book Appointment */}
          <Link
            to="/book-appointment"
            className="bg-[#2FC1FF] text-black px-4 py-2 rounded-md font-semibold hover:bg-white hover:text-black transition"
          >
            Book Appointment
          </Link>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

      </div>

      {/* Desktop Nav Links */}
      <nav className="hidden md:block bg-black border-t border-white text-white">

        <ul className="flex justify-center space-x-10 py-4 text-lg font-semibold">

          <li><Link to="/" className="text-[#2FC1FF] hover:text-white">Home</Link></li>
          <li><Link to="/about" className="text-[#2FC1FF] hover:text-white">About Us</Link></li>
          <li><Link to="/gallery" className="text-[#2FC1FF] hover:text-white">Gallery</Link></li>
          <li><Link to="/blog" className="text-[#2FC1FF] hover:text-white">Blog</Link></li>
          <li><Link to="/contact" className="text-[#2FC1FF] hover:text-white">Contact Us</Link></li>
          <li><Link to="/Ultrasound" className="text-[#2FC1FF] hover:text-white">Ultrasound</Link></li>
          <li><Link to="/XRay" className="text-[#2FC1FF] hover:text-white">X-Ray</Link></li>

          {/* Services Dropdown */}
          <li className="relative group">

            <span className="cursor-pointer text-[#2FC1FF] hover:text-white">
              Services ▾
            </span>

            <ul className="absolute left-0 top-full hidden group-hover:block bg-black text-[#2FC1FF] shadow-lg rounded-md w-64 z-50">

              <li><Link to="/looseteeth" className="block px-4 py-2 text-sm hover:text-white">Treatment of Loose Teeth</Link></li>
              <li><Link to="/rootcanal" className="block px-4 py-2 text-sm hover:text-white">Root Canal Therapy (RCT)</Link></li>
              <li><Link to="/Toothextraction" className="block px-4 py-2 text-sm hover:text-white">Tooth Extraction</Link></li>
              <li><Link to="/Impactooth" className="block px-4 py-2 text-sm hover:text-white">Impacted Tooth Removal</Link></li>
              <li><Link to="/Artificialteeth" className="block px-4 py-2 text-sm hover:text-white">Artificial Teeth (Dentures)</Link></li>
              <li><Link to="/Teethalignment" className="block px-4 py-2 text-sm hover:text-white">Teeth Alignment</Link></li>
              <li><Link to="/Ultrasonic_cleaning" className="block px-4 py-2 text-sm hover:text-white">Ultrasonic Teeth Cleaning</Link></li>
              <li><Link to="/LaserFilling" className="block px-4 py-2 text-sm hover:text-white">Laser Tooth Fillings</Link></li>
              <li><Link to="/TMDOMDTreatment" className="block px-4 py-2 text-sm hover:text-white">TMDs & OMDs Treatment</Link></li>
              <li><Link to="/Childtreatment" className="block px-4 py-2 text-sm hover:text-white">Child Dental Treatment</Link></li>
              <li><Link to="/DentalBleach" className="block px-4 py-2 text-sm hover:text-white">Dental Bleaching</Link></li>
              <li><Link to="/MouthulcerTeat" className="block px-4 py-2 text-sm hover:text-white">Mouth Ulcer Treatment</Link></li>

            </ul>

          </li>

        </ul>

      </nav>

      {/* Mobile Menu */}
    {isOpen && (
  <nav className="md:hidden bg-black text-white border-t border-white">
    <ul className="flex flex-col space-y-4 p-4 text-lg font-semibold">

      <li><Link to="/" onClick={() => setIsOpen(false)}>Home</Link></li>
      <li><Link to="/about" onClick={() => setIsOpen(false)}>About Us</Link></li>
      <li><Link to="/gallery" onClick={() => setIsOpen(false)}>Gallery</Link></li>
      <li><Link to="/blog" onClick={() => setIsOpen(false)}>Blog</Link></li>
      <li><Link to="/contact" onClick={() => setIsOpen(false)}>Contact Us</Link></li>
      <li><Link to="/Ultrasound" onClick={() => setIsOpen(false)}>Ultrasound</Link></li>
      <li><Link to="/XRay" onClick={() => setIsOpen(false)}>X-Ray</Link></li>

      {/* Services Dropdown */}
      <li>

        <button
          onClick={() => setServicesOpen(!servicesOpen)}
          className="flex justify-between w-full"
        >
          Services
          <ChevronDown
            className={`h-5 w-5 transition-transform ${
              servicesOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {servicesOpen && (
          <ul className="pl-4 mt-2 space-y-2 text-sm text-[#2FC1FF]">

            <li><Link to="/looseteeth" onClick={() => setIsOpen(false)}>Treatment of Loose Teeth</Link></li>
            <li><Link to="/rootcanal" onClick={() => setIsOpen(false)}>Root Canal Therapy</Link></li>
            <li><Link to="/Toothextraction" onClick={() => setIsOpen(false)}>Tooth Extraction</Link></li>
            <li><Link to="/Impactooth" onClick={() => setIsOpen(false)}>Impacted Tooth Removal</Link></li>
            <li><Link to="/Artificialteeth" onClick={() => setIsOpen(false)}>Artificial Teeth</Link></li>
            <li><Link to="/Teethalignment" onClick={() => setIsOpen(false)}>Teeth Alignment</Link></li>
            <li><Link to="/Ultrasonic_cleaning" onClick={() => setIsOpen(false)}>Ultrasonic Teeth Cleaning</Link></li>
            <li><Link to="/LaserFilling" onClick={() => setIsOpen(false)}>Laser Tooth Fillings</Link></li>
            <li><Link to="/TMDOMDTreatment" onClick={() => setIsOpen(false)}>TMDs & OMDs Treatment</Link></li>
            <li><Link to="/Childtreatment" onClick={() => setIsOpen(false)}>Child Dental Treatment</Link></li>
            <li><Link to="/DentalBleach" onClick={() => setIsOpen(false)}>Dental Bleaching</Link></li>
            <li><Link to="/MouthulcerTeat" onClick={() => setIsOpen(false)}>Mouth Ulcer Treatment</Link></li>

          </ul>
        )}

      </li>

      {/* LOGIN / PROFILE */}
      {user ? (

        <li className="flex flex-col gap-3 pt-4 border-t border-gray-700">

          <button
            onClick={goToDashboard}
            className="bg-[#2FC1FF] text-black py-2 rounded-md"
          >
            My Profile
          </button>

          <button
            onClick={handleLogout}
            className="border border-white py-2 rounded-md"
          >
            Logout
          </button>

        </li>

      ) : (

        <li className="flex flex-col gap-3 pt-4 border-t border-gray-700">

          <Link
            to="/signup"
            onClick={() => setIsOpen(false)}
            className="border border-white py-2 text-center rounded-md"
          >
            Sign Up
          </Link>

          <Link
            to="/login"
            onClick={() => setIsOpen(false)}
            className="border border-white py-2 text-center rounded-md"
          >
            Login
          </Link>

        </li>

      )}

      {/* Book Appointment */}
      <li className="pt-2">
        <Link
          to="/book-appointment"
          onClick={() => setIsOpen(false)}
          className="block text-center bg-[#2FC1FF] text-black py-2 rounded-md font-semibold"
        >
          Book Appointment
        </Link>
      </li>

    </ul>
  </nav>
)}

    </header>
  );
};

export default Navbar;