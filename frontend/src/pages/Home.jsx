
import React, { useState, useEffect } from "react";
import axios from "axios";
import API from "../utils/api";  
import TestimonialForm from "../components/TestimonialForm";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* ---- HERO + ABOUT IMAGES ---- */
import heroImage from "../images/home-img2.png";
import doctorImg from "../images/aboutdoctorimg.png";
import smileImg from "../images/home-img1.png";
import serviceImg from "../images/home-img3.png";
import clinic4 from "../images/clinic4.png";
import clinic1 from "../images/clinic1.png";
import logo from "../images/navbarimg.png";

/* ---- SERVICE IMAGES ---- */
import loose1 from "../images/loose1.png";
import root7 from "../images/root7.png";
import extraction3 from "../images/extraction3.png";
import Impactedtooth4 from "../images/Impactedtooth4.png";
import Alignment1 from "../images/Alignment1.png";
import Cleaning3 from "../images/Cleaning3.png";
import Laser8 from "../images/Laser8.png";
import TMD9 from "../images/TMD9.png";
import Child9 from "../images/Child9.png";
import Child5 from "../images/Child5.png";
import Bleach9 from "../images/Bleach9.png";
import Ulcer10 from "../images/Ulcer10.png";

/* ---- SERVICES ARRAY ---- */
const services = [
  { name: "Treatment of Loose Teeth", link: "/looseteeth", image: loose1 },
  { name: "Root Canal Therapy (RCT)", link: "/rootcanal", image: root7 },
  { name: "Tooth Extraction", link: "/Toothextraction", image: extraction3 },
  { name: "Impacted Tooth Removal", link: "/Impactooth", image: Impactedtooth4 },
  { name: "Artificial Teeth (Dentures)", link: "/Artificialteeth", image: Child5 },
  { name: "Teeth Alignment", link: "/Teethalignment", image: Alignment1 },
  { name: "Ultrasonic Teeth Cleaning", link: "/Ultrasonic_cleaning", image: Cleaning3 },
  { name: "Laser Tooth Fillings", link: "/LaserFilling", image: Laser8 },
  { name: "TMDs & OMDs Treatment", link: "/TMDOMDTreatment", image: TMD9 },
  { name: "Child Dental Treatment", link: "/Childtreatment", image: Child9 },
  { name: "Dental Bleaching", link: "/DentalBleach", image: Bleach9 },
  { name: "Mouth Ulcer Treatment", link: "/MouthulcerTeat", image: Ulcer10 },
];

const Home = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  /* 🔥 Slider Settings */
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
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3},
      },
      {
        breakpoint: 720,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  /* 🔥 Fetch Testimonials */
  const fetchTestimonials = async () => {
    try {
      const res = await axios.get(`${API}/api/testimonials`);
      setTestimonials(res.data);
    } catch (error) {
      console.error("Error fetching testimonials");
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  /* 🔥 Auto close success popup */
  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <div className="w-full bg-white text-gray-800 overflow-x-hidden">

      {/* HERO */}
      <section className="relative h-[90vh] flex items-center px-6 md:px-12">
        <img src={heroImage} alt="Dental Clinic" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        <div className="relative z-10 text-white max-w-2xl">
          <h1 className="text-3xl md:text-6xl font-bold mb-6">
            Brighten Your Smile at <span className="text-[#2FC1FF]">Palamu Dental Care</span>
          </h1>
          <p className="text-lg text-gray-100">
            Experience painless and modern dental treatment using advanced technology and expert care.
          </p>
        </div>
      </section>


         

      {/* 👨‍⚕️ ABOUT SECTION */}
      <section className="py-20 px-4 md:px-12 bg-white">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16">

          {/* LEFT IMAGES */}
          <div className="grid grid-cols-2 gap-6">
            <img src={doctorImg} className="h-[300px] rounded-xl shadow-xl object-cover" />
            <img src={clinic4} className="h-[220px] rounded-xl shadow-xl object-cover" />
            <img src={clinic1} className="h-[220px] rounded-xl shadow-xl object-cover" />
            <img src={smileImg} className="h-[300px] rounded-xl shadow-xl object-cover -mt-20" />
          </div>

          {/* RIGHT CONTENT */}
          <div>
            <h2 className="text-4xl font-extrabold text-[#2FC1FF] mb-6">
              Meet Your Dentist – Skilled, Caring & Experienced
            </h2>

            <p className="text-gray-600 text-lg mb-6">
              Dr. Pankaj Kumar (BDS, MIDA, FAGE) is a trusted and experienced Dentist known for his gentle approach, patient-friendly attitude, and use of modern dental techniques. With a strong commitment to delivering high-quality oral healthcare, he specializes in preventive, restorative, and cosmetic dentistry.

Dr. Kumar believes in creating a comfortable and stress-free environment for his patients, ensuring that every treatment is explained clearly and performed with precision. He stays updated with the latest advancements in dental technology and follows strict hygiene and sterilization protocols to provide safe and effective treatment.
            </p>

            <p className="text-gray-600 text-lg mb-6">
              Specializing in painless RCT, smile designing, laser treatments, and cosmetic dentistry.
            </p>

            <a href="/about" className="bg-[#2FC1FF] text-white px-7 py-3 text-lg rounded-full shadow-lg hover:bg-[#008dc5]">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* 🔷 WHY CHOOSE US (Flip Cards) */}
      <section className="relative py-5 px-4 md:px-10">
        <div className="relative max-w-7xl mx-auto text-center">

          <h2 className="text-4xl font-bold text-[#2FC1FF] mb-4">Why Choose Palamu Dental Care?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-16 text-lg">
           We ensure the safest and most comfortable dental care using advanced technology and expert hands.
Your smile and oral health are always our top priority.
          </p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-14">

            {/* CARD TEMPLATE */}
            {[
              { icon: "🦷", title: "Advanced Equipment", text: "Modern, precise & painless tools." },
              { icon: "👨‍⚕️", title: "Experienced Dentist", text: "Gentle, skilled & trusted care." },
              { icon: "💙", title: "Patient-Centered Care", text: "Comfort-first experience." }
            ].map((item, i) => (
              <div key={i} className="group h-80 [perspective:1200px]">
                <div className="relative h-full w-full rounded-2xl shadow-xl transition-all 
                    duration-[900ms] [transform-style:preserve-3d] group-hover:-translate-y-2 
                    group-hover:[transform:rotateY(180deg)]">

                  {/* FRONT */}
                  <div className="absolute inset-0 bg-gradient-to-b from-[#2FC1FF] to-[#11a7e6] 
                      text-white rounded-2xl flex flex-col items-center justify-center gap-3 p-7 
                      shadow-xl backface-hidden">
                    <div className="text-6xl">{item.icon}</div>
                    <h3 className="text-2xl font-semibold">{item.title}</h3>
                    <p className="text-sm opacity-90">{item.text}</p>
                  </div>

                  {/* BACK */}
                  <div className="absolute inset-0 bg-white text-gray-700 rounded-2xl p-6 text-center 
                      shadow-xl [transform:rotateY(180deg)] backface-hidden flex items-center justify-center">
                    <p className="text-sm leading-relaxed">
                      We use modern techniques & provide highly comfortable and safe treatments.
                    </p>
                  </div>

                </div>
              </div>
            ))}

          </div>
        </div>
      </section>


      

      {/* SERVICES */}
      <section
        className="py-20 px-4 md:px-10 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${serviceImg})` }}
      >
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[1px]"></div>
        <div className="relative max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#00A8FF] mb-14">
            Our Dental Services
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10">
            {services.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl hover:-translate-y-2 transition-all"
              >
                <div className="w-full h-40 mb-5 overflow-hidden rounded-xl">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-[#008fd6]">
                  {service.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 💬 TESTIMONIALS WITH SLIDER */}
      <section className="py-20 px-4 md:px-10 bg-[#f8fbff] relative">
  <div className="max-w-6xl mx-auto text-center">

    <h2 className="text-3xl md:text-4xl font-bold text-[#2FC1FF] mb-12">
      What Our Patients Say
    </h2>

    <div className="mb-12">
      {testimonials.length > 0 ? (
        <Slider
          dots={true}
          infinite={true}
          autoplay={true}
          autoplaySpeed={3000}
          speed={600}
          slidesToShow={2}
          slidesToScroll={1}
          responsive={[
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 2,
              },
            },
          ]}
        >
          {testimonials.map((review) => (
            <div key={review._id} className="px-2">
              <div className="bg-white border p-4  md:p-8 rounded-2xl shadow-lg text-center w-full">

                <p className="italic text-gray-800  mb-4">
                  “{review.message}”
                </p>

                <div className="text-yellow-400 text-lg mb-2">
                  {"⭐".repeat(review.rating)}
                </div>

                <h4 className="text-[#00a8ff] font-semibold">
                  — {review.name}
                </h4>

              </div>
            </div>
          ))}
        </Slider>
      ) : (
        <p className="text-gray-500 text-center">
          No testimonials available yet.
        </p>
      )}
    </div>

    <button
      onClick={() => setShowForm(true)}
      className="bg-[#2FC1FF] text-white px-8 py-3 rounded-full shadow-lg hover:bg-[#008dc5] transition"
    >
      Write a Review
    </button>
  </div>

  {/* Drawer */}
  <div
    className={`fixed top-0 right-0 h-full w-full md:w-[400px] bg-white shadow-2xl transform transition-transform duration-500 z-50 ${
      showForm ? "translate-x-0" : "translate-x-full"
    }`}
  >
    <div className="p-4 flex justify-between border-b">
      <h3 className="font-semibold">Submit Review</h3>
      <button onClick={() => setShowForm(false)}>×</button>
    </div>

    <TestimonialForm
      onSuccess={() => {
        setShowSuccess(true);
        fetchTestimonials();
      }}
      onClose={() => setShowForm(false)}
    />
  </div>

  {showForm && (
    <div
      className="fixed inset-0 bg-black/40 z-40"
      onClick={() => setShowForm(false)}
    ></div>
  )}

  {showSuccess && (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[60]">
      <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
        <div className="text-green-500 text-5xl mb-4">✔</div>
        <h3 className="text-xl font-bold mb-2">Thank You!</h3>
        <p className="text-gray-600">
          Your testimonial is under review.
        </p>
      </div>
    </div>
  )}
</section>
      {/* CTA */}
      <section className="bg-[#2FC1FF] text-black py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="flex items-center gap-4">
            <img src={logo} alt="Clinic Logo" className="h-24 w-24 rounded-full" />
            <div>
              <h2 className="text-3xl font-semibold">
                Ready to Transform Your Smile?
              </h2>
              <p>Book an appointment today!</p>
            </div>
          </div>
          <Link
            to="/book-appointment"
            className="bg-white text-[#017cad] px-8 py-3 rounded-full shadow-lg"
          >
            Book Now
          </Link>
        </div>
      </section>

    </div>
  );
};

export default Home;