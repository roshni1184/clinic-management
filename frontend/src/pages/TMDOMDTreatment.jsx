import React from "react";
import { Link } from "react-router-dom";

// Import images (replace with your own TMD & OMD images)
import TMD10 from "../images/TMD10.png";
import TMD2 from "../images/TMD2.png";
import TMD3 from "../images/TMD3.png";
import TMD4 from "../images/TMD4.png";
import TMD5 from "../images/TMD5.png";
import TMD6 from "../images/TMD6.png";
import TMD7 from "../images/TMD7.png";
import TMD8 from "../images/TMD8.png";
import TMD9 from "../images/TMD9.png";
import TMD1 from "../images/TMD1.png";

export default function TMDOMDTreatment({ onBook = () => {} }) {
  const headingColor = "#2FC1FF";

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-12">
      {/* Header */}
      <header className="mb-10">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-6 md:p-10 shadow-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            TMDs & OMDs Treatment
          </h1>
          <p className="mt-3 text-sm sm:text-base md:text-lg opacity-90">
            Comprehensive treatment for Temporomandibular Disorders (TMDs) and
            Oral-Mandibular Disorders (OMDs) to relieve pain, improve jaw
            function, and restore oral health.
          </p>
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <Link
              to="/book-appointment"
              className="rounded-full bg-white text-blue-700 font-semibold px-5 py-2 shadow hover:shadow-md transition text-center"
            >
              Book Appointment
            </Link>
            <a
              href="#treatments"
              className="rounded-full border border-white/40 text-white px-5 py-2 font-medium hover:bg-white/10 transition text-center"
            >
              See Treatments
            </a>
          </div>
        </div>
      </header>

      {/* Quick facts */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <article className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
            Purpose
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Relieve jaw pain, restore proper bite alignment, and improve oral
            function.
          </p>
        </article>
        <article className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
            Causes
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Jaw injuries, teeth grinding (bruxism), misaligned bite, stress, or
            arthritis.
          </p>
        </article>
        <article className="bg-white p-5 rounded-lg shadow">
          <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
            Treatment Duration
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Varies from a few weeks to several months depending on severity.
          </p>
        </article>
      </section>

      {/* When Needed */}
      <section id="causes" className="mb-12">
        <h2
          className="text-xl sm:text-2xl font-bold mb-4"
          style={{ color: headingColor }}
        >
          When Do You Need TMDs & OMDs Treatment?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
          <li>Jaw pain, stiffness, or clicking.</li>
          <li>Difficulty opening or closing the mouth.</li>
          <li>Headaches or ear pain related to jaw tension.</li>
          <li>Teeth grinding or worn teeth due to bruxism.</li>
          <li>Misaligned bite affecting chewing or speaking.</li>
        </ul>
      </section>

      {/* Image grid after Causes */}
      <section className="mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[TMD10, TMD2, TMD3, TMD4, TMD5].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`TMD ${i + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-36 sm:h-44"
            />
          ))}
        </div>
      </section>

      {/* Treatments */}
      <section id="treatments" className="mb-12">
        <h2
          className="text-xl sm:text-2xl font-bold mb-6"
          style={{ color: headingColor }}
        >
          Treatment Process
        </h2>
        <div className="space-y-6">
          {[
            {
              title: "Diagnosis & Examination",
              desc: "Detailed evaluation of jaw joints, muscles, teeth, and bite alignment.",
            },
            {
              title: "Personalized Treatment Plan",
              desc: "Custom plan including jaw exercises, splints, medications, or laser therapy as needed.",
            },
            {
              title: "Therapy & Intervention",
              desc: "May involve physiotherapy, splint therapy, occlusal adjustments, or minimally invasive procedures.",
            },
            {
              title: "Follow-up & Maintenance",
              desc: "Monitor progress and adjust treatment plan for optimal jaw function.",
            },
          ].map((step, i) => (
            <div key={i} className="bg-white p-5 rounded-lg shadow">
              <h3
                className="font-semibold text-lg"
                style={{ color: headingColor }}
              >
                {i + 1}. {step.title}
              </h3>
              <p className="mt-2 text-gray-600 text-sm sm:text-base">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Image grid after Treatments */}
      <section className="mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[TMD6, TMD7, TMD8, TMD9, TMD1].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`TMD ${i + 6}`}
              className="rounded-lg shadow-md object-cover w-full h-36 sm:h-44"
            />
          ))}
        </div>
      </section>

      {/* What to Expect & Aftercare */}
      <section className="my-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: headingColor }}
            >
              What to Expect
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
              <li>Relief from jaw pain and discomfort.</li>
              <li>Improved range of motion for jaw movement.</li>
              <li>Reduction of headaches or ear pain associated with TMD/OMD.</li>
              <li>Custom guidance on jaw exercises and oral habits.</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: headingColor }}
            >
              Aftercare & Maintenance
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
              <li>Follow prescribed jaw exercises and therapy routines.</li>
              <li>Wear any recommended splints or night guards as instructed.</li>
              <li>
                Regular dental visits to monitor jaw health and bite alignment.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-12">
        <h2
          className="text-xl sm:text-2xl font-bold mb-4"
          style={{ color: headingColor }}
        >
          FAQ
        </h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer">
              Is TMD/OMD treatment painful?
            </summary>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Most treatments are non-invasive and pain is minimal. Discomfort,
              if any, is temporary.
            </p>
          </details>
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer">
              How long does the treatment take?
            </summary>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Treatment duration varies from a few weeks to several months based
              on severity and intervention.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="mt-8 bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg" style={{ color: headingColor }}>
            Need TMDs & OMDs Treatment?
          </h3>
          <p className="text-sm text-gray-600">
            Restore your jaw health and comfort. Book your appointment today.
          </p>
        </div>
        <div>
          <Link
            to="/book-appointment"
            className="rounded-full bg-[#2FC1FF] text-white px-8 py-3 font-semibold shadow hover:opacity-95 transition"
          >
            Book Appointment
          </Link>
        </div>
      </footer>
    </div>
  );
}
