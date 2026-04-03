import React from "react";
import { Link } from "react-router-dom";

// Import images
import extraction1 from "../images/extraction1.png";
import extraction2 from "../images/extraction2.png";
import extraction3 from "../images/extraction3.png";
import extraction4 from "../images/extraction4.png";

export default function ToothExtraction({ onBook = () => {} }) {
  const headingColor = "#2FC1FF";

  const steps = [
    {
  title: "Examination & X-ray",
  desc: `A thorough examination of the tooth and gums is performed.
X-rays are taken to evaluate the tooth's position and root structure.
This ensures the extraction is planned safely and accurately.`,
  img: extraction1,
},

   {
  title: "Local Anesthesia",
  desc: `Local anesthesia is applied to numb the treatment area.
This ensures the procedure is completely painless.
You may feel slight pressure but no sharp pain during extraction.`,
  img: extraction2,
},

    {
  title: "Tooth Removal",
  desc: `The tooth is carefully removed using precise dental instruments.
Dentists ensure surrounding tissue is preserved.
The procedure is gentle and minimally invasive.
This helps reduce discomfort and promotes faster healing.`,
  img: extraction3,
},

   {
  title: "Cleaning & Aftercare",
  desc: `After the tooth is removed, the extraction site is thoroughly cleaned.
Gauze is placed to control bleeding and protect the area.
Detailed post-extraction care instructions are provided for faster healing and comfort.`,
  img: extraction2,
},

  ];

  return (
    <div className="bg-white min-h-screen text-black">
      <div className="max-w-9xl mx-auto p-6 lg:p-12">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1
            className="text-4xl md:text-6xl font-extrabold mb-4"
            style={{ color: headingColor }}
          >
            Tooth Extraction
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-6">
            Safe and painless tooth extraction for healthy teeth and gums.
            Expert dentists ensure comfort and quick recovery.
          </p>

          <Link
            to="/book-appointment"
            className="mt-2 rounded-full text-white px-6 py-3 font-semibold shadow hover:opacity-95 transition text-lg"
            style={{ backgroundColor: "#2FC1FF" }}>
            Book Appointment
          </Link>

        </header>

        {/* Detailed Section (short 3–4 lines) */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Text */}
            <div className="md:w-1/2">
              <p className="text-lg md:text-xl">
                Tooth extraction removes damaged or problematic teeth safely and painlessly. 
                Proper examination and X-rays ensure minimal risks. 
                Modern anesthesia and expert dentists make the procedure stress-free. 
                Post-extraction care promotes quick healing and overall oral health.
              </p>
            </div>

            {/* Image */}
            <div className="md:w-1/2">
              <img
                src={extraction4} // unique image
                alt="Tooth Extraction"
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
