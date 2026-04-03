import React from "react";
import { Link } from "react-router-dom";

// Import images
import Impactedtooth1 from "../images/Impactedtooth1.png";
import Impactedtooth2 from "../images/Impactedtooth2.png";
import Impactedtooth3 from "../images/Impactedtooth3.png";
import Impactedtooth4 from "../images/Impactedtooth4.png";

export default function Impactooth({ onBook = () => {} }) {
  const headingColor = "#2FC1FF";

  const steps = [
    {
      title: "Examination & X-ray",
      desc: `A thorough examination of the impacted tooth is performed.
            X-rays are taken to assess the position and angle of the tooth.
            This ensures safe and accurate planning for removal.`,
      img:Impactedtooth1,
    },
    {
      title: "Local Anesthesia",
      desc: `Local anesthesia is applied to numb the treatment area.
            This ensures the procedure is painless and comfortable.
         You may feel slight pressure but no sharp pain.`,
      img: Impactedtooth2,
    },
    {
      title: "Tooth Removal",
      desc: `The impacted tooth is carefully extracted using dental instruments.
Surrounding tissue is preserved to minimize trauma.
The procedure is performed gently to reduce discomfort.
This promotes faster healing and reduces complications.`,
      img: Impactedtooth3,
    },
    {
      title: "Cleaning & Aftercare",
      desc: `The extraction site is thoroughly cleaned after removal.
Gauze is applied to control bleeding and protect the area.
Post-removal care instructions are provided for quick recovery.
Patients are advised on diet, oral hygiene, and follow-up visits.`,
      img: Impactedtooth4,
    },
  ];

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="max-w-9xl mx-auto p-6 lg:p-12">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1
            className="text-4xl md:text-6xl font-extrabold"
            style={{ color: headingColor }}
          >
            Impacted Tooth Removal
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-6">
            Safe and painless removal of impacted teeth with expert care.
            Modern techniques ensure minimal discomfort and fast recovery.
          </p>

          <Link
            to="/book-appointment"
            className="mt-2 rounded-full text-white px-6 py-3 font-semibold shadow hover:opacity-95 transition text-lg"
            style={{ backgroundColor: "#2FC1FF" }} >
            Book Appointment
          </Link>
        </header>

        {/* Detailed Section (6–8 lines) */}

        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text */}
            <div className="md:w-1/2">
              <p className="text-lg md:text-xl">
                Impacted tooth removal is performed when teeth fail to erupt properly.
                This is commonly seen with wisdom teeth or crowded teeth.
                X-rays and examinations are done to determine the best approach.
                Local anesthesia ensures the procedure is painless.
                Gentle surgical techniques minimize tissue trauma.
                Post-removal care instructions help with healing and comfort.
                Early removal prevents pain, infection, and damage to adjacent teeth.
              </p>
            </div>

            {/* Image */}
            <div className="md:w-1/2">
              <img
                src={Impactedtooth3} 
                alt="Impacted Tooth"
                className="rounded-xl shadow-lg object-cover w-full h-80"
              />
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="space-y-20">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? "" : "md:flex-row-reverse"
              }`}
            >
              {/* Text */}
              <div className="md:w-1/2">
                <h2
                  className="text-3xl md:text-4xl font-bold mb-4"
                  style={{ color: headingColor }}
                >
                  {step.title}
                </h2>
                <p className="text-lg md:text-xl">{step.desc}</p>
              </div>

              {/* Image */}
              <div className="md:w-1/2">
                <img
                  src={step.img}
                  alt={step.title}
                  className="rounded-xl shadow-lg object-cover w-full h-64 md:h-80"
                />
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
