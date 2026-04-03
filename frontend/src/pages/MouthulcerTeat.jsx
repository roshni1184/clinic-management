import React from "react";
import { Link } from "react-router-dom";

import Ulcer1 from "../images/Ulcer1.png";
import Ulcer2 from "../images/Ulcer2.png";
import Ulcer3 from "../images/Ulcer3.png";
import Ulcer4 from "../images/Ulcer4.png";
import Ulcer5 from "../images/Ulcer5.png";
import Ulcer6 from "../images/Ulcer6.png";
import Ulcer7 from "../images/Ulcer7.png";
import Ulcer8 from "../images/Ulcer8.png";
import Ulcer9 from "../images/Ulcer9.png";
import Ulcer10 from "../images/Ulcer10.png";

export default function MouthulcerTeat({ onBook = () => {} }) {
  const headingColor = "#2FC1FF";

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-12">
      {/* Header */}
      <header className="mb-10">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-6 sm:p-8 md:p-10 lg:p-12 shadow-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
            Mouth Ulcer Treatment
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl opacity-90 max-w-3xl">
            Effective treatment for painful mouth ulcers to relieve discomfort
            and promote faster healing.
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
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-8 mx-[2px]">
        <article className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
            Purpose
          </h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Relieve pain, reduce recurrence, and promote quick healing of mouth
            ulcers.
          </p>
        </article>
        <article className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
            Common Causes
          </h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Stress, vitamin deficiencies, sharp teeth edges, spicy foods, or
            underlying conditions.
          </p>
        </article>
        <article className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
            Healing Time
          </h3>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Most ulcers heal in 1–2 weeks with proper treatment and care.
          </p>
        </article>
      </section>

      {/* When Needed */}
      <section id="causes" className="mb-8 mx-[2px]">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3" style={{ color: headingColor }}>
          When Do You Need Treatment for Mouth Ulcers?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700">
          <li>Frequent or recurring ulcers.</li>
          <li>Large or very painful ulcers.</li>
          <li>Ulcers lasting more than 2 weeks.</li>
          <li>Difficulty eating, drinking, or speaking due to pain.</li>
          <li>Ulcers accompanied by fever or swollen lymph nodes.</li>
        </ul>
      </section>

      {/* Image grid after Causes */}
      <section className="mb-8 mx-[2px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[Ulcer1, Ulcer2, Ulcer3, Ulcer4, Ulcer5].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Ulcer ${i + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-40 sm:h-44 md:h-48"
            />
          ))}
        </div>
      </section>

      {/* Treatments */}
      <section id="treatments" className="mb-8 mx-[2px]">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3" style={{ color: headingColor }}>
          Treatment Process
        </h2>
        <div className="space-y-6">
          {[
            {
              title: "1. Diagnosis & Identification",
              desc: "Identifying cause of ulcers—trauma, deficiency, infection, or systemic condition.",
            },
            {
              title: "2. Pain Relief",
              desc: "Prescribing numbing gels, antiseptic mouthwashes, or topical corticosteroids to reduce pain.",
            },
            {
              title: "3. Healing Support",
              desc: "Vitamin B12, folic acid, and iron supplements if deficiencies are the cause.",
            },
            {
              title: "4. Preventive Guidance",
              desc: "Advising on diet, stress management, and avoiding spicy/acidic foods to prevent recurrence.",
            },
          ].map((step, i) => (
            <div key={i} className="bg-white p-5 rounded-lg shadow">
              <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
                {step.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image grid after Treatments */}
      <section className="mb-8 mx-[2px]">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[Ulcer6, Ulcer7, Ulcer8, Ulcer9, Ulcer10].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Ulcer ${i + 6}`}
              className="rounded-lg shadow-md object-cover w-full h-40 sm:h-44 md:h-48"
            />
          ))}
        </div>
      </section>

      {/* What to Expect & Aftercare */}
      <section className="my-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ color: headingColor }}>
              What to Expect
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg text-gray-700">
              <li>Relief from pain and irritation within a few days.</li>
              <li>Smaller ulcers heal faster with medication.</li>
              <li>Comfortable eating and drinking after treatment.</li>
              <li>Guidance on reducing recurrence of ulcers.</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ color: headingColor }}>
              Aftercare & Maintenance
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg text-gray-700">
              <li>Avoid spicy, acidic, or hot foods.</li>
              <li>Maintain good oral hygiene and gentle brushing.</li>
              <li>Stay hydrated and eat a balanced diet.</li>
              <li>Use prescribed gels/mouthwashes as directed.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-8 mx-[2px]">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3" style={{ color: headingColor }}>
          FAQ
        </h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer text-sm sm:text-base">
              What causes mouth ulcers most commonly?
            </summary>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Stress, vitamin deficiencies, sharp dental appliances, and certain foods are common triggers.
            </p>
          </details>
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer text-sm sm:text-base">
              Are mouth ulcers contagious?
            </summary>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              No, most common mouth ulcers are not contagious, unlike cold sores.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="mt-6 bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0 mx-[2px]">
        <div className="text-center md:text-left">
          <h3 className="font-bold text-base sm:text-lg md:text-xl" style={{ color: headingColor }}>
            Struggling with Painful Mouth Ulcers?
          </h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Get quick relief and professional care. Book your appointment today.
          </p>
        </div>
        <div>
          <Link
            to="/book-appointment"
            className="rounded-full bg-[#2FC1FF] text-white px-8 py-3 sm:px-6 sm:py-2 md:px-8 md:py-3 font-semibold shadow hover:opacity-95 transition text-sm sm:text-base md:text-lg"
          >
            Book Appointment
          </Link>
        </div>
      </footer>
    </div>
  );
}
