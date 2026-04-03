import React from "react";
import { Link } from "react-router-dom";

import Artificialteeth1 from "../images/Artificialteeth1.png";
import Artificialteeth2 from "../images/Artificialteeth2.png";
import Artificialteeth3 from "../images/Artificialteeth3.png";
import Artificialteeth4 from "../images/Artificialteeth4.png";
import Artificialteeth5 from "../images/Artificialteeth5.png";
import Artificialteeth6 from "../images/Artificialteeth6.png";
import Artificialteeth7 from "../images/Artificialteeth7.png";
import Artificialteeth8 from "../images/Artificialteeth8.png";
import Artificialteeth9 from "../images/Artificialteeth9.png";
import Artificialteeth10 from "../images/Artificialteeth10.png";

export default function Artificialteeth({ onBook = () => {} }) {
  const headingColor = "#2FC1FF";

  const quickFacts = [
    { title: "Purpose", desc: "Replace missing teeth and restore chewing, speaking, and aesthetics." },
    { title: "Types", desc: "Complete dentures, partial dentures, and implant-supported dentures." },
    { title: "Longevity", desc: "With proper care, dentures can last 5–10 years before replacement." }
  ];

  const treatments = [
    { title: "1. Consultation & Impressions", desc: "The dentist examines your mouth and takes impressions of your gums and remaining teeth." },
    { title: "2. Bite Registration", desc: "Your bite and jaw alignment are recorded to design well-fitting dentures." },
    { title: "3. Try-in Dentures", desc: "A trial set is made for you to check comfort, fit, and appearance before final dentures." },
    { title: "4. Final Denture Placement", desc: "The final dentures are fitted, ensuring proper bite, comfort, and aesthetics." },
    { title: "5. Adjustments & Aftercare", desc: "Follow-up visits ensure adjustments for comfort and instructions on cleaning and maintenance." }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-12">

      {/* Header */}
      <header className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
            Artificial Teeth (Dentures)
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl opacity-90 max-w-3xl">
            Learn about dentures, their types, benefits, procedure, and aftercare to restore your smile and confidence.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row gap-3">
            <Link
              to="/BookAppointment"
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

      {/* Causes */}
      <section id="causes" className="mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3" style={{ color: headingColor }}>
          When Do You Need Dentures?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700">
          <li>Loss of multiple teeth due to decay or gum disease.</li>
          <li>Difficulty chewing food properly.</li>
          <li>Speech problems caused by missing teeth.</li>
          <li>Collapsed facial appearance due to tooth loss.</li>
          <li>Need for a cost-effective tooth replacement solution.</li>
        </ul>
      </section>

      {/* Image grid after Causes */}
      <section className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[Artificialteeth1, Artificialteeth2, Artificialteeth3, Artificialteeth4, Artificialteeth5].map((img, i) => (
            <img key={i} src={img} alt={`Artificial Teeth ${i+1}`} className="rounded-lg shadow-md object-cover w-full h-32 sm:h-36 md:h-40" />
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
          {[Artificialteeth6, Artificialteeth7, Artificialteeth8, Artificialteeth9, Artificialteeth10].map((img, i) => (
            <img key={i} src={img} alt={`Artificial Teeth ${i+6}`} className="rounded-lg shadow-md object-cover w-full h-32 sm:h-36 md:h-40" />
          ))}
        </div>
      </section>

      {/* What to Expect & Aftercare */}
      <section className="my-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ color: headingColor }}>
              What to Expect with Dentures
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg text-gray-700">
              <li>Initial adjustment period with mild discomfort.</li>
              <li>Learning to chew and speak comfortably with new dentures.</li>
              <li>Follow-up visits for fit corrections.</li>
              <li>Improved smile, facial support, and confidence.</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ color: headingColor }}>
              Aftercare & Maintenance
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg text-gray-700">
              <li>Clean dentures daily with a soft brush and denture cleaner.</li>
              <li>Soak dentures in water when not in use to prevent drying.</li>
              <li>Avoid hard or sticky foods that may damage dentures.</li>
              <li>Visit your dentist regularly for check-ups and adjustments.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3" style={{ color: headingColor }}>FAQ</h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer text-sm sm:text-base">Are dentures uncomfortable?</summary>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              There is an adjustment period, but modern dentures are designed for comfort and functionality.
            </p>
          </details>
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer text-sm sm:text-base">Can I eat normally with dentures?</summary>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Yes, after an adjustment period, most patients can enjoy a wide variety of foods.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="mt-6 bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div className="text-center md:text-left">
          <h3 className="font-bold text-base sm:text-lg md:text-xl" style={{ color: headingColor }}>Need Dentures?</h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Restore your smile and confidence with comfortable, natural-looking dentures. Book an appointment today.
          </p>
        </div>
        <div>
          <Link
            to="/BookAppointment"
            className="rounded-full bg-[#2FC1FF] text-white px-5 py-2 sm:px-6 sm:py-2 md:px-8 md:py-3 font-semibold shadow hover:opacity-95 transition text-sm sm:text-base md:text-lg"
          >
            Book Appointment
          </Link>
        </div>
      </footer>
    </div>
  );
}
