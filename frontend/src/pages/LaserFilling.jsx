import React from "react";
import { Link } from "react-router-dom";

import Laser1 from "../images/Laser1.png";
import Laser2 from "../images/Laser2.png";
import Laser3 from "../images/Laser3.png";
import Laser4 from "../images/Laser4.png";
import Laser5 from "../images/Laser5.png";
import Laser6 from "../images/Laser6.png";
import Laser7 from "../images/Laser7.png";
import Laser8 from "../images/Laser8.png";
import Laser9 from "../images/Laser9.png";
import Laser10 from "../images/Laser10.png";

export default function LaserFilling({ onBook = () => {} }) {
  const headingColor = "#2FC1FF";

  const quickFacts = [
    { title: "Purpose", desc: "Treat cavities effectively while minimizing pain, discomfort, and damage to healthy tooth tissue." },
    { title: "Procedure", desc: "Laser precisely removes decayed material and prepares the tooth for filling without traditional drills." },
    { title: "Duration", desc: "Typically 20–40 minutes per cavity depending on size and location." },
  ];

  const treatments = [
    { title: "1. Initial Examination", desc: "Dentist evaluates tooth decay and decides if laser filling is appropriate." },
    { title: "2. Laser Cavity Removal", desc: "Laser removes decayed tooth tissue precisely and painlessly." },
    { title: "3. Tooth Preparation & Filling", desc: "Tooth is cleaned, prepared, and filled with composite resin or other filling material." },
    { title: "4. Polishing & Final Check", desc: "Filling is polished for smoothness, bite checked, and patient advised on care." },
  ];

  const images1 = [Laser1, Laser2, Laser3, Laser4, Laser5];
  const images2 = [Laser6, Laser7, Laser8, Laser9, Laser10];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-12">

      {/* Header */}
      <header className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            Laser Tooth Fillings
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg opacity-90 max-w-3xl">
            Laser tooth fillings provide a precise, less painful method to treat cavities and restore tooth health.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Link
              to="/book-appointment"
              className="rounded-full bg-white text-blue-700 font-semibold px-5 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3 shadow hover:shadow-md transition text-center text-sm sm:text-base md:text-lg"
            >
              Book Appointment
            </Link>
            <a
              href="#treatments"
              className="rounded-full border border-white/30 text-white px-5 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3 font-medium hover:bg-white/10 transition text-center text-sm sm:text-base md:text-lg"
            >
              See Treatments
            </a>
          </div>
        </div>
      </header>

      {/* Quick Facts */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {quickFacts.map((fact, i) => (
          <article key={i} className="bg-white p-5 rounded-lg shadow">
            <h3 className="font-semibold text-lg" style={{ color: headingColor }}>{fact.title}</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">{fact.desc}</p>
          </article>
        ))}
      </section>

      {/* When Needed */}
      <section id="causes" className="mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3" style={{ color: headingColor }}>
          When Do You Need Laser Fillings?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700">
          <li>Dental cavities or tooth decay.</li>
          <li>Minor cracks in teeth requiring restoration.</li>
          <li>Patients sensitive to traditional drilling methods.</li>
          <li>Wanting faster, less invasive treatment.</li>
        </ul>
      </section>

      {/* Image Grid */}
      <section className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {images1.map((img, i) => (
            <img key={i} src={img} alt={`Laser ${i+1}`} className="rounded-lg shadow-md object-cover w-full h-32 sm:h-36 md:h-40" />
          ))}
        </div>
      </section>

      {/* Treatments */}
      <section id="treatments" className="mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3" style={{ color: headingColor }}>Treatment Process</h2>
        <div className="space-y-6">
          {treatments.map((step, i) => (
            <div key={i} className="bg-white p-5 rounded-lg shadow">
              <h3 className="font-semibold text-lg" style={{ color: headingColor }}>{step.title}</h3>
              <p className="mt-2 text-sm sm:text-base text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image Grid after Treatments */}
      <section className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {images2.map((img, i) => (
            <img key={i} src={img} alt={`Laser ${i+6}`} className="rounded-lg shadow-md object-cover w-full h-32 sm:h-36 md:h-40" />
          ))}
        </div>
      </section>

      {/* What to Expect & Aftercare */}
      <section className="my-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ color: headingColor }}>What to Expect</h2>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg text-gray-700">
            <li>Minimal discomfort compared to traditional drilling.</li>
            <li>Quick, precise cavity removal.</li>
            <li>Effective restoration with durable fillings.</li>
            <li>Short procedure time per tooth.</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ color: headingColor }}>Aftercare & Maintenance</h2>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg text-gray-700">
            <li>Avoid hard foods for a few hours after procedure.</li>
            <li>Maintain good oral hygiene to prevent future decay.</li>
            <li>Regular dental checkups to monitor fillings.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3" style={{ color: headingColor }}>FAQ</h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer text-sm sm:text-base">Is laser filling safe?</summary>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Yes, it is precise, minimally invasive, and safe for most patients.</p>
          </details>
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer text-sm sm:text-base">Does it hurt?</summary>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Patients experience less discomfort than traditional drilling.</p>
          </details>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="mt-6 bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div className="text-center md:text-left">
          <h3 className="font-bold text-base sm:text-lg md:text-xl" style={{ color: headingColor }}>Need Laser Tooth Fillings?</h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">Restore your teeth quickly, comfortably, and safely. Book your appointment today.</p>
        </div>
        <div>
          <Link
            to="/book-appointment"
            className="rounded-full bg-[#2FC1FF] text-white px-5 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3 font-semibold shadow hover:opacity-95 transition text-sm sm:text-base md:text-lg"
          >
            Book Appointment
          </Link>
        </div>
      </footer>
    </div>
  );
}
