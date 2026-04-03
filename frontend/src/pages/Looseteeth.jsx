import React from "react";
import { Link } from "react-router-dom";

// Import images from src/images folder
import loose1 from "../images/loose1.png";
import loose2 from "../images/loose2.png";
import loose3 from "../images/loose3.png";
import loose4 from "../images/loose4.png";
import loose5 from "../images/loose5.png";
import loose6 from "../images/loose6.png";
import loose7 from "../images/loose7.png";
import loose8 from "../images/loose8.png";
import loose9 from "../images/loose9.png";
import loose10 from "../images/loose10.png";

export default function Looseteeth({ onBook = () => {} }) {
  const headingColor = "#2FC1FF";

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-12">
      {/* Header */}
      <header className="mb-10">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-6 md:p-10 shadow-lg">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold">
            Treatment of Loose Teeth
          </h1>

          <p className="mt-2 text-sm sm:text-base md:text-lg opacity-90 max-w-3xl">
            Causes, clinical options, and easy-to-follow prevention tips to help
            you keep your smile stable.
          </p>

          <div className="mt-4 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/book-appointment"
              className="rounded-full bg-white text-blue-700 font-semibold px-5 py-2 text-sm sm:px-6 sm:py-2 sm:text-base md:px-8 md:py-3 md:text-lg shadow hover:shadow-md transition text-center"
            >
              Book Appointment
            </Link>

            <a
              href="#treatments"
              className="rounded-full border border-white/30 text-white px-5 py-2 text-sm sm:px-6 sm:py-2 sm:text-base md:px-8 md:py-3 md:text-lg font-medium hover:bg-white/10 transition text-center"
            >
              See Treatments
            </a>
          </div>
        </div>
      </header>

      {/* Quick facts */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {[
          {
            title: "Most common cause",
            desc: "Periodontal (gum) disease — infection of the gums and bone.",
          },
          {
            title: "Mild to severe",
            desc: "Loose teeth range from slight mobility to teeth that need extraction.",
          },
          {
            title: "When to see a dentist",
            desc: "If a tooth feels mobile for more than a few days, consult a dentist quickly.",
          },
        ].map((fact, i) => (
          <article
            key={i}
            className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
              {fact.title}
            </h3>
            <p className="mt-2 text-sm text-gray-600">{fact.desc}</p>
          </article>
        ))}
      </section>

      {/* Causes */}
      <section id="causes" className="mb-12">
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold mb-4"
          style={{ color: headingColor }}
        >
          Causes
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
          <li>Periodontal (gum) disease that destroys bone and connective tissue.</li>
          <li>Trauma or injury to the mouth (falls, sports, accidents).</li>
          <li>Bruxism (teeth grinding) or excessive biting forces.</li>
          <li>Systemic conditions: diabetes, osteoporosis, hormonal changes.</li>
          <li>Poor oral hygiene leading to plaque and tartar build-up.</li>
        </ul>
      </section>

      {/* Image grid after Causes */}
      <section className="mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[loose1, loose2, loose3, loose4, loose5].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Loose Teeth ${i + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-32 sm:h-40 md:h-48"
            />
          ))}
        </div>
      </section>

      {/* Treatments */}
      <section id="treatments" className="mb-12">
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold mb-4"
          style={{ color: headingColor }}
        >
          Treatment options
        </h2>
        <div className="space-y-6">
          {[
            {
              title: "1. Deep cleaning (Scaling & Root Planing)",
              desc: "Removes plaque and tartar from below the gum line so the gums can heal and reattach to the tooth root.",
            },
            {
              title: "2. Periodontal surgery & grafting",
              desc: "For advanced gum disease — surgical cleaning, soft tissue grafts, or bone grafts to rebuild lost support.",
            },
            {
              title: "3. Dental splinting",
              desc: "Temporarily binds a loose tooth to neighbouring teeth to stabilize it while healing occurs.",
            },
            {
              title: "4. Address bite & grinding",
              desc: "Night guards and bite adjustments reduce excessive forces that loosen teeth.",
            },
            {
              title: "5. Extraction & replacement",
              desc: "When a tooth cannot be saved — extraction followed by an implant, bridge, or denture.",
            },
          ].map((treatment, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-lg shadow hover:shadow-md transition"
            >
              <h3
                className="font-semibold text-lg"
                style={{ color: headingColor }}
              >
                {treatment.title}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-gray-600">
                {treatment.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Image grid after Treatments */}
      <section className="mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[loose6, loose7, loose8, loose9, loose10].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Treatment ${i + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-32 sm:h-40 md:h-48"
            />
          ))}
        </div>
      </section>

      {/* What to Expect & Prevention Section */}
      <section className="my-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* What to Expect */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: headingColor }}
            >
              What to Expect During Treatment
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
              <li>Initial exam: teeth, gums, X-rays to measure bone loss and mobility.</li>
              <li>Non-surgical phase: scaling/root planing, improved home care.</li>
              <li>Re-evaluation in 4–8 weeks to check healing; decide on surgery if needed.</li>
              <li>Surgical phase (if required): flap surgery/grafts and follow-up care.</li>
              <li>Stabilization: splinting or bite management while tissues heal.</li>
            </ul>
          </div>

          {/* Prevention & Home Care */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2
              className="text-2xl md:text-3xl font-bold mb-4"
              style={{ color: headingColor }}
            >
              Prevention & Home Care
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
              <li>
                Brush twice daily with a fluoride toothpaste and use interdental
                cleaning (floss or interdental brushes).
              </li>
              <li>Attend dental cleanings every 3–6 months as advised by your dentist.</li>
              <li>Use a custom night guard if you grind your teeth.</li>
              <li>Maintain good control of systemic conditions such as diabetes.</li>
              <li>
                Quit smoking — it strongly increases risk of periodontal disease and
                treatment failure.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mb-12">
        <h2
          className="text-xl sm:text-2xl md:text-3xl font-bold mb-4"
          style={{ color: headingColor }}
        >
          FAQ
        </h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer">
              Can a loose tooth become firm again?
            </summary>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Yes — if detected early and treated (deep cleaning, splinting, bite
              correction). Advanced bone loss is harder to reverse.
            </p>
          </details>

          <details className="bg-white p-4 rounded shadow">
            <summary className="font-medium cursor-pointer">
              Will treatment be painful?
            </summary>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Most procedures use local anaesthesia. Mild discomfort after procedures
              is normal and manageable with pain relief advised by your dentist.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="mt-10 bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-center md:text-left">
          <h3 className="font-bold text-lg" style={{ color: headingColor }}>
            Worried about a loose tooth?
          </h3>
          <p className="text-sm text-gray-600">
            Early care improves the chance to save the tooth. Contact your dentist
            today.
          </p>
        </div>
        <Link
          to="/book-appointment"
          className="rounded-full bg-[#2FC1FF] text-white px-6 py-2 sm:px-8 sm:py-3 font-semibold shadow hover:opacity-95 transition inline-block text-center text-sm sm:text-base"
        >
          Book Appointment
        </Link>
      </footer>
    </div>
  );
}
