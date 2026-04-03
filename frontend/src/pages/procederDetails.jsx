import React from "react";
import { useParams, Link } from "react-router-dom";
import proceduresData from "../Data/proceduresData";

const ProcedureDetail = () => {
  const { name } = useParams();
  const procedure = proceduresData.find(
    (proc) => proc.name === decodeURIComponent(name)
  );

  if (!procedure) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center p-8">
        <h1 className="text-3xl font-bold text-red-500">
          Procedure not found
        </h1>
        <Link
          to="/"
          className="mt-4 inline-block bg-[#2FC1FF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1ba7e0] transition"
        >
          Back to Procedures
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      {/* Procedure Title */}
      <h1 className="text-5xl font-bold text-[#2FC1FF] mb-6 text-center">
        {procedure.name}
      </h1>

      {/* Main Image */}
      {procedure.image && (
        <img
          src={procedure.image}
          alt={procedure.name}
          className="mb-8 w-full max-w-4xl rounded-lg shadow-lg"
        />
      )}

      {/* Overview */}
      {procedure.overview && (
        <section className="mb-8 max-w-4xl">
          <h2 className="text-3xl font-semibold text-[#2FC1FF] mb-4">Overview</h2>
          <p className="text-lg text-gray-700">{procedure.overview}</p>
        </section>
      )}

      {/* Benefits */}
      {procedure.benefits && procedure.benefits.length > 0 && (
        <section className="mb-8 max-w-4xl">
          <h2 className="text-3xl font-semibold text-[#2FC1FF] mb-4">Benefits</h2>
          <ul className="list-disc list-inside text-gray-700 text-lg">
            {procedure.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Procedure Steps */}
      {procedure.steps && procedure.steps.length > 0 && (
        <section className="mb-8 max-w-4xl">
          <h2 className="text-3xl font-semibold text-[#2FC1FF] mb-4">Procedure Steps</h2>
          <ol className="list-decimal list-inside text-gray-700 text-lg space-y-2">
            {procedure.steps.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </section>
      )}

      {/* Before & After Care */}
      {procedure.care && (
        <section className="mb-8 max-w-4xl">
          <h2 className="text-3xl font-semibold text-[#2FC1FF] mb-4">Before & After Care</h2>
          <p className="text-lg text-gray-700">{procedure.care}</p>
        </section>
      )}

      {/* Gallery */}
      {procedure.gallery && procedure.gallery.length > 0 && (
        <section className="mb-8 max-w-4xl">
          <h2 className="text-3xl font-semibold text-[#2FC1FF] mb-4">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {procedure.gallery.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${procedure.name} ${index + 1}`}
                className="rounded-lg shadow-md w-full"
              />
            ))}
          </div>
        </section>
      )}

      {/* FAQs */}
      {procedure.faqs && procedure.faqs.length > 0 && (
        <section className="mb-8 max-w-4xl">
          <h2 className="text-3xl font-semibold text-[#2FC1FF] mb-4">FAQs</h2>
          {procedure.faqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-semibold text-gray-800">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </section>
      )}

      {/* Back Button */}
      <Link
        to="/"
        className="mt-6 bg-[#2FC1FF] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#1ba7e0] transition"
      >
        Back to Procedures
      </Link>
    </div>
  );
};

export default ProcedureDetail;
