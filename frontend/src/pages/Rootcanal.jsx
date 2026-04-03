import React from "react";
import { Link } from "react-router-dom";

import root1 from "../images/root1.png";
import root2 from "../images/root2.png";
import root3 from "../images/root3.png";
import root4 from "../images/root4.png";
import root5 from "../images/root5.png";
import root6 from "../images/root6.png";
import root7 from "../images/root7.png";
import root8 from "../images/root8.png";
import root9 from "../images/root9.png";
import root10 from "../images/root10.png";

export default function Rootcanal({ onBook = () => {} }) {
  const headingColor = "#2FC1FF";

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-12">

      {/* Header */}
      <header className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
            Root Canal Therapy (RCT)
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl opacity-90 max-w-3xl">
            Learn about root canal treatment, causes, procedures, and aftercare to save your natural tooth.
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

      {/* Quick facts */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {[
          { title: "Purpose", desc: "Remove infected pulp tissue and save the natural tooth." },
          { title: "Duration", desc: "Usually completed in 1–3 visits depending on the tooth and infection." },
          { title: "Success rate", desc: "RCT has a high success rate if properly done with good oral hygiene afterward." }
        ].map((fact, i) => (
          <article key={i} className="bg-white p-5 rounded-lg shadow">
            <h3 className="font-semibold text-lg" style={{ color: headingColor }}>{fact.title}</h3>
            <p className="mt-2 text-sm sm:text-base text-gray-600">{fact.desc}</p>
          </article>
        ))}
      </section>

      {/* Causes */}
      <section id="causes" className="mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3" style={{ color: headingColor }}>
          Causes for Root Canal
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700">
          <li>Deep tooth decay reaching the pulp.</li>
          <li>Cracked or fractured tooth exposing nerves.</li>
          <li>Repeated dental procedures on the same tooth.</li>
          <li>Severe trauma or injury to a tooth.</li>
          <li>Infection leading to abscess formation.</li>
        </ul>
      </section>

      {/* Images after Causes */}
      <section className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[root1, root2, root3, root4, root5].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Root Canal ${i + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-32 sm:h-36 md:h-40"
            />
          ))}
        </div>
      </section>

      {/* Treatment Steps */}
      <section id="treatments" className="mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3" style={{ color: headingColor }}>
          Treatment Steps
        </h2>
        <div className="space-y-6">
          {[
            { title: "1. Diagnosis & X-ray", desc: "Check the tooth and surrounding tissue with clinical exam and X-rays to determine infection extent." },
            { title: "2. Local anesthesia", desc: "Numbs the area so the procedure is painless." },
            { title: "3. Removal of pulp", desc: "Infected pulp tissue is removed and root canals are cleaned." },
            { title: "4. Filling & sealing", desc: "Canals are filled with biocompatible material and sealed to prevent further infection." },
            { title: "5. Crown placement", desc: "To restore strength and function, a crown is placed on the treated tooth." }
          ].map((step, i) => (
            <div key={i} className="bg-white p-5 rounded-lg shadow">
              <h3 className="font-semibold text-lg" style={{ color: headingColor }}>{step.title}</h3>
              <p className="mt-2 text-sm sm:text-base text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Images after Treatment */}
      <section className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[root6, root7, root8, root9, root10].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Treatment ${i + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-32 sm:h-36 md:h-40"
            />
          ))}
        </div>
      </section>

      {/* What to Expect & Aftercare */}
      <section className="my-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ color: headingColor }}>
              What to Expect During RCT
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg text-gray-700">
              <li>Initial examination and diagnosis.</li>
              <li>Local anesthesia to numb the tooth.</li>
              <li>Pulp removal and canal cleaning.</li>
              <li>Filling, sealing, and temporary restoration.</li>
              <li>Crown placement for long-term protection.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ color: headingColor }}>
              Aftercare & Prevention
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg text-gray-700">
              <li>Maintain oral hygiene with brushing and flossing.</li>
              <li>Avoid chewing hard foods on the treated tooth until crown placement.</li>
              <li>Attend follow-up appointments regularly.</li>
              <li>Watch for pain, swelling, or infection signs and contact dentist.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3" style={{ color: headingColor }}>
          FAQ
        </h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer text-sm sm:text-base">
              Is Root Canal Painful?
            </summary>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              With modern anesthesia, the procedure is mostly painless. Mild discomfort may occur afterward.
            </p>
          </details>

          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer text-sm sm:text-base">
              How long does RCT last?
            </summary>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              With proper care and crown placement, treated teeth can last a lifetime.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="mt-6 bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div className="text-center md:text-left">
          <h3 className="font-bold text-base sm:text-lg md:text-xl" style={{ color: headingColor }}>
            Need Root Canal Treatment?
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Early care saves your natural tooth. Book an appointment today.
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
