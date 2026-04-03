import React from "react";
import { Link } from "react-router-dom";

import Alignment1 from "../images/Alignment1.png";
import Alignment2 from "../images/Alignment2.png";
import Alignment3 from "../images/Alignment3.png";
import Alignment4 from "../images/Alignment4.png";
import Alignment5 from "../images/Alignment5.png";
import Alignment6 from "../images/Alignment6.png";
import Alignment7 from "../images/Alignment7.png";
import Alignment8 from "../images/Alignment8.png";
import Alignment9 from "../images/Alignment9.png";
import Alignment10 from "../images/Alignment10.png";

export default function Teethalignment({ onBook = () => {} }) {
  const headingColor = "#2FC1FF";

  const quickFacts = [
    { title: "Purpose", desc: "Correct misaligned teeth for better function, aesthetics, and oral health." },
    { title: "Options", desc: "Braces, clear aligners (Invisalign), retainers, and surgical options." },
    { title: "Treatment Time", desc: "Most alignment treatments take 6 months – 2 years depending on complexity." }
  ];

  const treatments = [
    { title: "1. Consultation & Diagnosis", desc: "Dentist examines your teeth, takes X-rays, and discusses the best alignment option for you." },
    { title: "2. Treatment Planning", desc: "Customized plan designed based on dental impressions, scans, and bite analysis." },
    { title: "3. Braces / Aligners Placement", desc: "Braces or clear aligners are fitted to gradually move your teeth into the correct position." },
    { title: "4. Regular Adjustments", desc: "Periodic dental visits for adjustments and progress checks." },
    { title: "5. Retention Phase", desc: "After alignment, retainers are used to maintain the corrected position of teeth." }
  ];

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-12">

      {/* Header */}
      <header className="mb-8">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-6 sm:p-8 md:p-10 shadow-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
            Teeth Alignment
          </h1>
          <p className="mt-2 text-sm sm:text-base md:text-lg lg:text-xl opacity-90 max-w-3xl">
            Learn about teeth alignment options, benefits, procedure, and aftercare to achieve a confident and healthy smile.
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

      {/* Causes */}
      <section id="causes" className="mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3" style={{ color: headingColor }}>
          When Do You Need Teeth Alignment?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-gray-700">
          <li>Crooked or crowded teeth.</li>
          <li>Overbite, underbite, or crossbite issues.</li>
          <li>Speech difficulties caused by misaligned teeth.</li>
          <li>Jaw pain or discomfort due to uneven bite.</li>
          <li>Improved aesthetics and confident smile.</li>
        </ul>
      </section>

      {/* Image grid after Causes */}
      <section className="mb-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[Alignment1, Alignment2, Alignment3, Alignment4, Alignment5].map((img, i) => (
            <img key={i} src={img} alt={`Alignment ${i+1}`} className="rounded-lg shadow-md object-cover w-full h-32 sm:h-36 md:h-40" />
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
          {[Alignment6, Alignment7, Alignment8, Alignment9, Alignment10].map((img, i) => (
            <img key={i} src={img} alt={`Alignment ${i+6}`} className="rounded-lg shadow-md object-cover w-full h-32 sm:h-36 md:h-40" />
          ))}
        </div>
      </section>

      {/* What to Expect & Aftercare */}
      <section className="my-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ color: headingColor }}>
              What to Expect with Teeth Alignment
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg text-gray-700">
              <li>Mild soreness during initial days of treatment.</li>
              <li>Improved smile and confidence as teeth shift gradually.</li>
              <li>Regular dental visits for monitoring.</li>
              <li>Better oral health and jaw comfort after correction.</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4" style={{ color: headingColor }}>
              Aftercare & Maintenance
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base md:text-lg text-gray-700">
              <li>Maintain good oral hygiene during treatment.</li>
              <li>Avoid sticky and hard foods that may damage braces/aligners.</li>
              <li>Wear retainers as advised to maintain results.</li>
              <li>Attend follow-up appointments regularly.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-8">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold mb-3" style={{ color: headingColor }}>FAQ</h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer text-sm sm:text-base">Is teeth alignment painful?</summary>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Some discomfort is normal in the beginning, but it becomes manageable as you get used to braces or aligners.
            </p>
          </details>
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer text-sm sm:text-base">How long does the treatment take?</summary>
            <p className="mt-2 text-sm sm:text-base text-gray-600">
              Treatment usually lasts between 6 months to 2 years, depending on individual cases.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="mt-6 bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
        <div className="text-center md:text-left">
          <h3 className="font-bold text-base sm:text-lg md:text-xl" style={{ color: headingColor }}>Need Teeth Alignment?</h3>
          <p className="text-xs sm:text-sm md:text-base text-gray-600">
            Correct your smile with braces or aligners for long-lasting oral health and confidence. Book your appointment today.
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
