import React from "react";
import { Link } from "react-router-dom";

import Child1 from "../images/Child1.png";
import Child2 from "../images/Child2.png";
import Child3 from "../images/Child3.png";
import Child4 from "../images/Child4.png";
import Child5 from "../images/Child5.png";
import Child6 from "../images/Child6.png";
import Child7 from "../images/Child7.png";
import Child8 from "../images/Child8.png";
import Child9 from "../images/Child9.png";
import Child10 from "../images/Child10.png";

export default function ChildDentalTreatment({ onBook = () => {} }) {
  const headingColor = "#2FC1FF";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-8">
      {/* Header */}
      <header className="mb-10">
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl p-6 md:p-10 shadow-lg">
          <h1 className="text-2xl md:text-4xl font-extrabold">
            Child Dental Treatment
          </h1>
          <p className="mt-3 text-sm md:text-base opacity-90">
            Specialized dental care for children focusing on prevention, early
            detection, and treatment of dental issues to ensure lifelong oral
            health.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/BookAppointment"
              className="rounded-full bg-white text-blue-700 font-semibold px-5 py-2 shadow hover:shadow-md transition"
            >
              Book Appointment
            </Link>
            <a
              href="#treatments"
              className="rounded-full border border-white/30 text-white px-5 py-2 font-medium hover:bg-white/10 transition"
            >
              See Treatments
            </a>
          </div>
        </div>
      </header>

      {/* Quick facts */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <article className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
            Purpose
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Promote healthy teeth and gums in children while preventing dental
            problems early.
          </p>
        </article>
        <article className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
            Common Issues
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Tooth decay, cavities, thumb sucking, early tooth loss, and
            misaligned teeth.
          </p>
        </article>
        <article className="bg-white p-6 rounded-lg shadow">
          <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
            Treatment Age
          </h3>
          <p className="mt-2 text-sm text-gray-600">
            Dental care recommended from the eruption of the first tooth through
            adolescence.
          </p>
        </article>
      </section>

      {/* When Needed */}
      <section className="mb-12">
        <h2 className="text-xl md:text-2xl font-bold mb-4" style={{ color: headingColor }}>
          When Do Children Need Dental Treatment?
        </h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Toothache, sensitivity, or cavities.</li>
          <li>Visible plaque or white/brown spots on teeth.</li>
          <li>Difficulty chewing food properly.</li>
          <li>Thumb sucking, teeth grinding, or jaw misalignment.</li>
          <li>Regular check-ups every 6 months for healthy growth.</li>
        </ul>
      </section>

      {/* Image grid after Causes */}
      <section className="mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[Child1, Child2, Child3, Child4, Child5].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Child ${i + 1}`}
              className="rounded-lg shadow-md object-cover w-full h-40 sm:h-48 md:h-56"
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
              title: "1. Oral Examination",
              desc: "Thorough dental check-up to detect cavities, gum health, and bite alignment.",
            },
            {
              title: "2. Preventive Care",
              desc: "Fluoride treatments, dental sealants, and oral hygiene education.",
            },
            {
              title: "3. Restorative Treatment",
              desc: "Fillings for cavities, space maintainers, or extraction if necessary.",
            },
            {
              title: "4. Orthodontic Evaluation",
              desc: "Early detection of misalignment and referral for braces if required.",
            },
          ].map((step, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg" style={{ color: headingColor }}>
                {step.title}
              </h3>
              <p className="mt-2 text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Image grid after Treatments */}
      <section className="mb-12">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {[Child6, Child7, Child8, Child9, Child10].map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Child ${i + 6}`}
              className="rounded-lg shadow-md object-cover w-full h-40 sm:h-48 md:h-56"
            />
          ))}
        </div>
      </section>

      {/* What to Expect & Aftercare */}
      <section className="my-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: headingColor }}>
              What to Expect
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Gentle and child-friendly dental care.</li>
              <li>Early detection of cavities or orthodontic issues.</li>
              <li>Guidance on brushing, flossing, and diet.</li>
              <li>Comfortable and positive dental experiences.</li>
            </ul>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-4" style={{ color: headingColor }}>
              Aftercare & Maintenance
            </h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>Brush twice daily with fluoride toothpaste.</li>
              <li>Limit sugary foods and drinks.</li>
              <li>Regular check-ups every 6 months.</li>
              <li>Encourage healthy oral habits from a young age.</li>
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
          <details className="bg-white p-5 rounded shadow">
            <summary className="font-medium cursor-pointer">
              At what age should a child first see a dentist?
            </summary>
            <p className="mt-2 text-gray-600">
              A child should have their first dental visit by their first birthday or within 6 months of the first tooth eruption.
            </p>
          </details>
          <details className="bg-white p-5 rounded shadow">
            <summary className="font-medium cursor-pointer">
              How often should kids visit the dentist?
            </summary>
            <p className="mt-2 text-gray-600">
              Every 6 months for routine check-ups and preventive care.
            </p>
          </details>
        </div>
      </section>

      {/* CTA Footer */}
      <footer className="mt-8 bg-gray-50 p-6 rounded-lg flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="font-bold text-lg" style={{ color: headingColor }}>
            Need Child Dental Treatment?
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Protect your child’s smile with expert dental care. Book your appointment today.
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Link
            to="/BookAppointment"
            className="rounded-full bg-[#2FC1FF] text-white px-8 py-3 font-semibold shadow hover:opacity-95 transition"
          >
            Book Appointment
          </Link>
        </div>
      </footer>
    </div>
  );
}
