
import React, { useState, useEffect } from "react";

import API from "../api/api"
import { Link } from "react-router-dom";

import galleryBg from "../images/gallerybg1.png";
import logo from "../images/navbarimg.png";

const Gallery = () => {
  const [galleryItems, setGalleryItems] = useState([]);

  const fetchGallery = async () => {
    try {
     const res = await API.get(`/gallery`);
      setGalleryItems(res.data);
    } catch (error) {
      console.error("Error fetching gallery", error);
    }
  };

  useEffect(() => {
    fetchGallery();
  }, []);

  return (
    <section className="bg-gray-50 pt-0 mt-0">

      {/* Heading Section */}
      <div
        className="relative w-full h-[220px] flex items-center justify-center text-center"
        style={{
          backgroundImage: `url(${galleryBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h2 className="text-4xl font-bold text-white drop-shadow-lg">
          Gallery
        </h2>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">

        {/* 3 cards per row so cards become wider */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {galleryItems.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300"
            >
              <img
                src={`${API}/uploads/gallery/${item.image}`}
                alt="Gallery"
                className="w-full h-80 object-cover"
              />

              <div className="p-5 text-center">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}

        </div>

      </div>

      {/* CALL TO ACTION */}
      <section className="bg-[#2FC1FF] text-black py-16 px-6">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">

          <div className="flex flex-col sm:flex-row items-center gap-4">
            <img
              src={logo}
              alt="Clinic Logo"
              className="h-24 w-24 object-contain rounded-full border-2 border-white shadow-lg"
            />

            <div>
              <h2 className="text-3xl font-semibold">
                Ready to Transform Your Smile?
              </h2>

              <p className="text-gray-800 mt-1">
                Book your appointment with Palamu Dental Care today!
              </p>
            </div>
          </div>

          <Link
            to="/book-appointment"
            className="bg-white text-[#017cad] font-semibold px-8 py-3 rounded-full shadow-lg 
            hover:bg-[#017cad] hover:text-white transition-all"
          >
            Book Now
          </Link>

        </div>

      </section>

    </section>
  );
};

export default Gallery;
