import React from "react";
import { Link } from "react-router-dom";

import Cleaning1 from "../images/Cleaning1.png";
import Cleaning2 from "../images/Cleaning2.png";
import Cleaning3 from "../images/Cleaning3.png";
import Cleaning4 from "../images/Cleaning4.png";
import Cleaning5 from "../images/Cleaning5.png";
import Cleaning6 from "../images/Cleaning6.png";
import Cleaning7 from "../images/Cleaning7.png";
import Cleaning8 from "../images/Cleaning8.png";
import Cleaning9 from "../images/Cleaning9.png";
import Cleaning10 from "../images/Cleaning10.png";

export default function Ultrasonic_cleaning({ onBook = () => {} }) {
  const headingColor = "#2FC1FF";

  const quickFacts = [
    { title: "Purpose", desc: "Remove plaque, tartar, and bacteria to prevent gum disease and maintain oral health." },
    { title: "Procedure", desc: "Ultrasonic scalers vibrate to remove plaque and tartar gently and effectively." },
    { title: "Duration", desc: "Typically takes 30–60 minutes depending on the amount of buildup." },
  ];

  const treatments = [
    { title: "1. Initial Examination", desc: "Dentist evaluates oral health and identifies areas with plaque or tartar buildup." },
    { title: "2. Ultrasonic Scaling", desc: "Ultrasonic device vibrates to remove plaque, tartar, and stains from teeth surfaces and below the gum line." },
    { title: "3. Polishing", desc: "Teeth are polished to smooth surfaces and reduce plaque buildup." },
    { title: "4. Fluoride Treatment", desc: "Optional fluoride application strengthens enamel and prevents sensitivity." },
  ];

  const images1 = [Cleaning1, Cleaning2, Cleaning3, Cleaning4, Cleaning5];
  const images2 = [Cleaning6, Cleaning7, Cleaning8, Cleaning9, Cleaning10];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-12">

      {/* Header */}
      <header className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
            Ultrasonic Teeth Cleaning
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg opacity-90 max-w-3xl">
            Professional ultrasonic teeth cleaning removes plaque, tartar, and stains for a healthier, brighter smile.
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
          When Do You Need Ultrasonic Cleaning?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700">
          <li>Visible plaque or tartar buildup.</li>
          <li>Bad breath or gum inflammation.</li>
          <li>Routine preventive dental care.</li>
          <li>Before orthodontic treatments or cosmetic procedures.</li>
        </ul>
      </section>

      {/* Image grid after Causes */}
      <section className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {images1.map((img, i) => (
            <img key={i} src={img} alt={`Cleaning ${i + 1}`} className="rounded-lg shadow-md object-cover w-full h-32 sm:h-36 md:h-40" />
          ))}
        </div>
      </section>

      {/* Treatments */}
      <section id="treatments" className="mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3" style={{ color: headingColor }}>
          Treatment Process
        </h2>
        <div className="space-y-6">
          {treatments.map((step, i) => (
            <div key={i} className="bg-white p-5 rounded-lg shadow">
              <h3 className="font-semibold text-lg" style={{ color: headingColor }}>{step.title}</h3>
              <p className="mt-2 text-sm sm:text-base text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image grid after Treatments */}
      <section className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {images2.map((img, i) => (
            <img key={i} src={img} alt={`Cleaning ${i + 6}`} className="rounded-lg shadow-md object-cover w-full h-32 sm:h-36 md:h-40" />
          ))}
        </div>
      </section>

      {/* What to Expect & Aftercare */}
      <section className="my-16 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ color: headingColor }}>
            What to Expect
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg text-gray-700">
            <li>Mild sensitivity in some areas after cleaning.</li>
            <li>Fresh, clean feeling in your mouth.</li>
            <li>Short procedure, usually under an hour.</li>
            <li>Professional advice on maintaining oral hygiene.</li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ color: headingColor }}>
            Aftercare & Maintenance
          </h2>
          <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg text-gray-700">
            <li>Brush and floss regularly to maintain results.</li>
            <li>Limit staining foods for 24–48 hours.</li>
            <li>Visit dentist every 6 months for preventive cleaning.</li>
          </ul>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3" style={{ color: headingColor }}>FAQ</h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer text-sm sm:text-base">Is ultrasonic cleaning painful?</summary>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Most patients feel vibrations but no pain. Sensitivity is mild and temporary.</p>
          </details>
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer text-sm sm:text-base">How often should I get it?</summary>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Typically recommended every 6 months for optimal oral health.</p>
          </details>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="mt-6 bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div className="text-center md:text-left">
          <h3 className="font-bold text-base sm:text-lg md:text-xl" style={{ color: headingColor }}>Need Ultrasonic Teeth Cleaning?</h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Keep your teeth healthy, bright, and plaque-free. Book your appointment today.
          </p>
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
