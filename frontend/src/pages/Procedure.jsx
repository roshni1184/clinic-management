import React from "react";
import { Link } from "react-router-dom";
import proceder from "../images/proceder.png";

const procedures = [
  "Smile Makeover",
  "Veneers",
  "Teeth Whitening",
  "Dental Bonding",
  "Dental Implants",
  "Digital X-rays",
  "Invisible Braces",
  "Diastema Closure",
  "Root Canal Therapy",
  "Tooth Extraction",
  "Dental Crowns",
  "Gum Disease Treatment"
];

const Procedures = () => {
  return (
    <section
      className="py-16 px-6 md:px-5 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${proceder})` }}
    >
      <h1 className="text-4xl font-bold text-center mb-12 text-[#2FC1FF]">
        Dental Procedures
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {procedures.map((proc, index) => (
          <div
            key={index}
            className="bg-white/80 rounded-2xl shadow-lg p-6 flex flex-col justify-between items-center text-center hover:shadow-2xl transition"
            style={{ height: "220px" }}
          >
            <h3 className="text-xl font-semibold mb-4 text-gray-800">{proc}</h3>
           <Link
  to={`/procedure/${encodeURIComponent(proc)}`}
  className="bg-[#2FC1FF] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#1ba7e0] transition"
>
  Know More
</Link>

          </div>
        ))}
      </div>
    </section>
  );
};

export default Procedures;
