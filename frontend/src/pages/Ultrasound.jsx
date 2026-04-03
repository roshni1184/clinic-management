import React from "react";
import { Link } from "react-router-dom";

// Images
import abdomen from "../images/abdomen.png";
import pelvis from "../images/pelvis.png";
import pregnancy from "../images/pregnancy.png";
import cardiac from "../images/cardiac.png";
import thyroid from "../images/thyroid.png";
import doppler from "../images/doppler.png";
import ultrasound from "../images/ultrasound.png";

export default function Ultrasound() {
  const headingColor = "#2FC1FF";

  const services = [
    {
      id: 1,
      title: "Abdominal Ultrasound",
      description:
        "Non-invasive scan of liver, kidneys, gallbladder, and digestive organs. Helps detect stones, tumors, and other conditions.",
      img: abdomen,
    },
    {
      id: 2,
      title: "Pelvic Ultrasound",
      description:
        "Detailed imaging of uterus, ovaries, bladder, and prostate. Used for reproductive health and urinary evaluations.",
      img: pelvis,
    },
    {
      id: 3,
      title: "Pregnancy Ultrasound",
      description:
        "Safe fetal imaging to monitor growth, heartbeat, and development. Essential for pregnancy check-ups and care.",
      img: pregnancy,
    },
    {
      id: 4,
      title: "Cardiac Ultrasound (Echo)",
      description:
        "Assesses heart chambers, valves, and blood flow. Useful for detecting structural or functional heart conditions.",
      img: cardiac,
    },
    {
      id: 5,
      title: "Thyroid Ultrasound",
      description:
        "Detects thyroid nodules, cysts, or gland enlargement. Provides accurate results without radiation exposure.",
      img: thyroid,
    },
    {
      id: 6,
      title: "Doppler Ultrasound",
      description:
        "Evaluates blood circulation in veins and arteries. Detects blockages, clots, and abnormal blood flow patterns.",
      img: doppler,
    },
    {
      id: 7,
      title: "3D/4D Baby Ultrasound",
      description:
        "Advanced 3D/4D imaging of the baby inside the womb. Provides detailed view for parents and medical assessment.",
      img: ultrasound,
    },
  ];

  return (
    <div className="max-w-8xl mx-auto p-8 text-xl Arial"> 
      {/* Header */}
      <header className="mb-15 text-center font-sans-serif font-x1">
        <h1 className="text-3xl font-bold text-[#2FC1FF] mb-8">Ultrasound Services</h1>
        <p className="text-xl text-gray-600">
          Comprehensive ultrasound services for accurate diagnosis and monitoring.
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
              className="inline-block bg-[#2FC1FF] text-white px-10 py-4 rounded-lg shadow hover:opacity-90 transition"
            >
              Book Appointment
            </Link>
          </div>
        </section>
      ))}
      
    </div>
  );
}
