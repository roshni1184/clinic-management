import React from "react";
import { Link } from "react-router-dom";

import Bleach1 from "../images/Bleach1.png";
import Bleach2 from "../images/Bleach2.png";
import Bleach3 from "../images/Bleach3.png";
import Bleach4 from "../images/Bleach4.png";
import Bleach5 from "../images/Bleach5.png";
import Bleach6 from "../images/Bleach6.png";
import Bleach7 from "../images/Bleach7.png";
import Bleach8 from "../images/Bleach8.png";
import Bleach9 from "../images/Bleach9.png";
import Bleach10 from "../images/Bleach10.png";

export default function DentalBleach({ onBook = () => {} }) {
  const headingColor = "#2FC1FF";

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 lg:p-12">
      {/* Header */}
      <header className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-6 md:p-10 shadow-lg text-center md:text-left">
          <h1 className="text-2xl md:text-4xl font-extrabold">
            Dental Bleaching (Teeth Whitening)
          </h1>
          <p className="mt-2 text-sm md:text-base opacity-90 max-w-3xl mx-auto md:mx-0">
            Brighten your smile with safe and effective bleaching treatments
            that remove stains and discoloration from teeth.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
            <Link
              to="/BookAppointment"
              className="rounded-full bg-white text-blue-700 font-semibold px-4 py-2 shadow hover:shadow-md transition text-center"
            >
              Book Appointment
            </Link>
            <a
              href="#treatments"
              className="rounded-full border border-white/30 text-white px-4 py-2 font-medium hover:bg-white/10 transition text-center"
            >
              See Treatments
            </a>
          </div>
        </div>
      </header>

      {/* Quick facts */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <article className="bg-white p-6 rounded-lg shadow text-center md:text-left">
          <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
            Purpose
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Lighten tooth color and remove stains caused by food, drinks, and
            habits like smoking.
          </p>
        </article>
        <article className="bg-white p-6 rounded-lg shadow text-center md:text-left">
          <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
            Common Issues
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Yellowing teeth, surface stains, dull smile, and uneven coloration.
          </p>
        </article>
        <article className="bg-white p-6 rounded-lg shadow text-center md:text-left">
          <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
            Treatment Time
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Quick sessions of 30–60 minutes depending on the whitening method.
          </p>
        </article>
      </section>

      {/* When Needed */}
      <section id="causes" className="mb-12">
        <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: headingColor }}>
          When Do You Need Dental Bleaching?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
          <li>Stained teeth due to tea, coffee, wine, or smoking.</li>
          <li>Yellowing caused by age or poor oral hygiene.</li>
          <li>Before special occasions like weddings or interviews.</li>
          <li>To boost self-confidence with a whiter smile.</li>
        </ul>
      </section>

      {/* Image grid after Causes */}
      <section className="mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[Bleach1, Bleach2, Bleach3, Bleach4, Bleach5].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Teeth Whitening Example ${i + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-40 md:h-48"
            />
          ))}
        </div>
      </section>

      {/* Treatments */}
      <section id="treatments" className="mb-12">
        <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: headingColor }}>
          Treatment Process
        </h2>
        <div className="space-y-6">
          {[
            {
              title: "1. Initial Consultation",
              desc: "Assessment of tooth color, stains, and suitability for bleaching.",
            },
            {
              title: "2. Professional Cleaning",
              desc: "Plaque and tartar removal to prepare teeth for whitening.",
            },
            {
              title: "3. Bleaching Procedure",
              desc: "Application of safe whitening agents with or without laser/UV light activation.",
            },
            {
              title: "4. Results & Follow-up",
              desc: "Noticeable whitening after one session; follow-ups may be suggested for long-term results.",
            },
          ].map((step, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
                {step.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm md:text-base">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image grid after Treatments */}
      <section className="mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[Bleach6, Bleach7, Bleach8, Bleach9, Bleach10].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Teeth Whitening Example ${i + 6}`}
              className="rounded-lg shadow-md object-cover w-full h-40 md:h-48"
            />
          ))}
        </div>
      </section>

      {/* What to Expect & Aftercare */}
      <section className="my-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: headingColor }}>
              What to Expect
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
              <li>Noticeable whitening after the first session.</li>
              <li>Safe and effective professional bleaching agents.</li>
              <li>Minimal sensitivity for most patients.</li>
              <li>Quick procedure with lasting effects.</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: headingColor }}>
              Aftercare & Maintenance
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm md:text-base">
              <li>Avoid tea, coffee, red wine, and smoking after treatment.</li>
              <li>Use dentist-recommended whitening toothpaste.</li>
              <li>Maintain good oral hygiene habits daily.</li>
              <li>Schedule touch-up treatments as advised.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-12">
        <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: headingColor }}>
          FAQ
        </h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer">Is dental bleaching safe?</summary>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Yes, when performed by a professional dentist, it is safe and
              effective with minimal side effects.
            </p>
          </details>
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer">How long do whitening results last?</summary>
            <p className="mt-2 text-gray-600 text-sm md:text-base">
              Results usually last 6 months to 2 years depending on diet,
              habits, and oral care.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="mt-12 bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg md:text-xl" style={{ color: headingColor }}>
            Want a Brighter Smile?
          </h3>
          <p className="text-sm text-gray-600">
            Restore your confidence with professional dental bleaching. Book
            your appointment today.
          </p>
        </div>
        <Link
          to="/BookAppointment"
          className="rounded-full bg-[#2FC1FF] text-white px-8 py-3 font-semibold shadow hover:opacity-95 transition text-center"
        >
          Book Appointment
        </Link>
      </footer>
    </div>
  );
}
