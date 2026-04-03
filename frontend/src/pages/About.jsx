import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

import aboutbg from "../images/aboutimg.png";
import aboutdoctorImg from "../images/aboutdoctorimg.png";
import clinic1 from "../images/clinic1.png";
import clinic2 from "../images/clinic2.png";
import clinic3 from "../images/clinic3.png";
import logo from "../images/navbarimage.png";

const About = () => {
  useEffect(() => {
    AOS.init({ duration: 1200, once: true });
  }, []);

  return (
    <section
      className="relative w-full min-h-screen"
      style={{
        backgroundImage: `url(${aboutbg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 pointer-events-none"></div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 px-[20px] py-16 text-white">

        {/* HEADING */}
        <h1
          data-aos="fade-down"
          className="text-4xl md:text-5xl font-bold text-center mb-14 tracking-wide"
        >
          About Palamu Dental Care
        </h1>

        {/* ABOUT SECTION */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div data-aos="fade-right">
            <p className="mb-6 text-lg leading-relaxed">
              Welcome to{" "}
              <span className="font-semibold text-[#2FC1FF]">
                Palamu Dental Care
              </span>
              , where we combine advanced dentistry with personalized care
              to give you the healthiest, brightest smile.
            </p>

            <p className="mb-6 text-lg leading-relaxed">
              Our clinic is proudly led by{" "}
              <span className="font-semibold text-[#2FC1FF]">
                Dr. Pankaj Kumar (BDS, MIDA, FAGE – Dental & Oral Surgeon)
              </span>
              , a highly experienced dentist known for delivering painless,
              precise, and modern dental treatments.
            </p>

            <p className="text-lg leading-relaxed">
              With world-class equipment, strict hygiene standards, and a
              patient-friendly environment, we ensure every visit is smooth,
              stress-free, and comfortable for patients of all ages.
            </p>
          </div>

          <div data-aos="zoom-in" className="flex justify-center">
            <img
              src={aboutdoctorImg}
              alt="Dr. Pankaj Kumar"
              className="rounded-2xl shadow-xl w-full max-w-[600px] hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* MISSION SECTION */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
          <div data-aos="fade-up">
            <h2 className="text-3xl font-semibold mb-4 text-[#2FC1FF]">
              Our Mission
            </h2>

            <p className="text-lg leading-relaxed">
              Our mission is to make quality dental care accessible,
              affordable, and comfortable for everyone. We aim to build
              lifelong trust by providing safe, ethical, and transparent
              treatment.
            </p>
          </div>

          <div data-aos="fade-left" className="flex justify-center">
            <img
              src={clinic1}
              alt="Dental Mission"
              className="rounded-2xl shadow-xl w-full max-w-[600px] h-[280px] object-cover hover:scale-105 transition duration-500"
            />
          </div>
        </div>

        {/* WHY CHOOSE US */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-24">

          <div data-aos="zoom-in" className="order-2 md:order-1 flex justify-center">
            <img
              src={clinic2}
              alt="Why Choose Us"
              className="rounded-2xl shadow-xl w-full max-w-[600px] h-[280px] object-cover hover:scale-105 transition duration-500"
            />
          </div>

          <div data-aos="fade-left" className="order-1 md:order-2">
            <h2 className="text-3xl font-semibold mb-4 text-[#2FC1FF]">
              Why Choose Us?
            </h2>

            <ul className="list-disc list-inside text-lg space-y-4 leading-relaxed">
              <li>Experienced & friendly dental specialist</li>
              <li>Digital X-rays & laser dentistry</li>
              <li>Safe and hygienic clinic environment</li>
              <li>Affordable treatment plans</li>
              <li>All dental services under one roof</li>
              <li>Painless and stress-free treatment</li>
            </ul>
          </div>

        </div>

        {/* SERVICES */}
        <div className="mb-24" data-aos="fade-up">

          <h2 className="text-3xl font-semibold mb-8 text-center text-[#2FC1FF]">
            Our Services
          </h2>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mb-14">

            {[
              "Root Canal Treatment",
              "Tooth Extraction",
              "Dental Implants",
              "Teeth Cleaning",
              "Teeth Whitening",
              "Braces & Alignment",
              "Child Dental Care",
              "Dentures",
              "Laser Fillings",
            ].map((service, i) => (

              <div
                key={i}
                data-aos="zoom-in"
                className="bg-white text-[#015C8F] font-medium p-4 rounded-xl text-center shadow-md hover:scale-105 transition duration-400"
              >
                {service}
              </div>

            ))}

          </div>

          <div data-aos="zoom-in" className="flex justify-center">
            <img
              src={clinic3}
              alt="Dental Services"
              className="rounded-2xl shadow-xl w-full max-w-[1000px] h-[350px] object-cover hover:scale-105 transition duration-500"
            />
          </div>

        </div>
      </div>

      {/* CTA SECTION */}
      <section className="bg-[#2FC1FF] text-black py-16 px-6 relative z-20">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

          <div className="flex flex-col sm:flex-row items-center gap-4">

            <img
              src={logo}
              alt="Clinic Logo"
              className="h-24 w-24 object-contain rounded-full border-2 border-white shadow-lg"
            />

            <div>
              <h2 className="text-3xl font-semibold">
                Ready to Transform Your Smile?
              </h2>

              <p className="text-gray-800 mt-1">
                Book your appointment with Palamu Dental Care today!
              </p>
            </div>

          </div>

          <Link
            to="/book-appointment"
            className="bg-white text-[#017cad] font-semibold px-8 py-3 rounded-full shadow-lg 
            hover:bg-[#017cad] hover:text-white transition-all"
          >
            Book Now
          </Link>

        </div>

      </section>

    </section>
  );
};

export default About;