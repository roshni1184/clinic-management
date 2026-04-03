import React from "react";
import { Link } from "react-router-dom";

// Images
import xray from "../images/xray.png";
import xray1 from "../images/xray1.png";
import xray_sinus from "../images/xray_sinus.png";
import xray_opg from "../images/xray_opg.png";
import xray_ceph from "../images/xray_ceph.png";
import xray_spine from "../images/xray_spine.png";
import xray_extremities from "../images/xray_extremities.png";

export default function XRay() {
  const headingColor = "#2FC1FF";

  const services = [
    {
      id: 1,
      title: "Dental X-Ray",
      description:
        "Accurate dental X-Rays to detect cavities, root issues, and jawbone conditions. Helps dentists plan treatments effectively.",
      img: xray,
    },
    {
      id: 2,
      title: "Chest X-Ray",
      description:
        "Quick imaging for lungs, heart, and chest cavity. Useful for detecting infections, blockages, and respiratory issues.",
      img: xray1,
    },
    {
      id: 3,
      title: "Sinus X-Ray",
      description:
        "Detect sinus infections, blockages, and bone abnormalities. Provides clear imaging for quick and effective diagnosis.",
      img: xray_sinus,
    },
    {
      id: 4,
      title: "OPG (Panoramic X-Ray)",
      description:
        "Covers full mouth in one image. Helps diagnose wisdom teeth, jaw alignment, and overall oral health conditions.",
      img: xray_opg,
    },
    {
      id: 5,
      title: "Cephalometric X-Ray",
      description:
        "Used for orthodontic planning and jaw growth studies. Provides side-view of skull and teeth positioning clearly.",
      img: xray_ceph,
    },
    {
      id: 6,
      title: "Spine X-Ray",
      description:
        "Helps detect fractures, scoliosis, or spine misalignment. Provides detailed view of vertebrae and spinal health.",
      img: xray_spine,
    },
    {
      id: 7,
      title: "Extremities X-Ray",
      description:
        "X-Rays of arms, legs, hands, or feet. Detects fractures, joint problems, and bone deformities with precision.",
      img: xray_extremities,
    },
  ];

  return (
    <div className="max-w-8xl mx-auto p-8 text-xl font-mono"> 
      {/* Header */}
      <header className="mb-12 text-center font-sans">
        <h1 className="text-4xl font-bold text-[#2FC1FF] mb-4">X-Ray Services</h1>
        <p className="text-lg text-gray-600">
          Comprehensive digital X-Ray services for accurate diagnosis.
        </p>
      </header>

      {/* Services Sections */}
      {services.map((service, index) => (
        <section
          key={service.id}
          className={`flex flex-col md:flex-row items-center gap-10 mb-12 ${
            index % 2 !== 0 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="md:w-1/2 flex justify-center">
            <img
              src={service.img}
              alt={service.title}
              className="rounded-2xl shadow-lg h-72 object-contain"
            />
          </div>
          <div className="md:w-1/2">
            <h2 className="text-3xl font-bold mb-4" style={{ color: headingColor }}>
              {service.title}
            </h2>
            <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
            <Link
              to="/book-appointment"
              className="inline-block bg-[#2FC1FF] text-white px-6 py-3 rounded-lg shadow hover:opacity-90 transition"
            >
              Book Appointment
            </Link>
          </div>
        </section>
      ))}
    </div>
  );
}
