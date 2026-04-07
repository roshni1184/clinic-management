import React, { useState, useEffect, useRef } from "react";

import blogimg1 from "../images/blogimg1.png";
import API from "../api/api";

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const elementsRef = useRef([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get(`/admin/blogs`);
        setBlogs(res.data);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Scroll animation using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      { threshold: 0.2 }
    );

    elementsRef.current.forEach((el) => el && observer.observe(el));
  }, [blogs]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-500 text-lg">
        Loading blogs...
      </div>
    );
  }

  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {blogs.map((blog, index) => (
          <div
            key={blog._id || index}
            ref={(el) => (elementsRef.current[index] = el)}
            className={`blog-card opacity-0 flex flex-col md:flex-row items-center gap-12 my-16 
            ${index % 2 === 1 ? "md:flex-row-reverse" : ""}`}
          >
            {/* IMAGE SECTION */}
            <div className="md:w-1/2 hover-float">
              <div className="image-wrapper">
                <img
                  src={
                    blog.image
                      ? `${import.meta.env.VITE_API_URL}/${blog.image}`
                      : blogimg1
                  }
                  alt={blog.title}
                  className="blog-image"
                />
              </div>
            </div>

            {/* TEXT SECTION */}
            <div className="md:w-1/2">
              <h2 className="text-4xl font-extrabold text-[#2FC1FF] mb-4 tracking-wide animate-title">
                {blog.title}
              </h2>

              <p className="text-gray-700 text-lg mb-4 leading-relaxed">
                {blog.content?.length > 350
                  ? blog.content.substring(0, 350) + "..."
                  : blog.content}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                <span className="italic">{blog.author || "Admin"}</span>
                <span className="font-medium">
                  {new Date(blog.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* CSS STYLES */}
        <style>
          {`
          /* FADE + SLIDE + SCALE ANIMATION */
          .blog-card {
            transform: translateY(40px) scale(0.95);
            transition: all 1.2s cubic-bezier(0.22, 1, 0.36, 1);
          }
          .blog-card.show {
            opacity: 1;
            transform: translateY(0px) scale(1);
          }

          /* FLOAT HOVER EFFECT */
          .hover-float {
            transition: transform 0.7s ease, box-shadow 0.7s ease;
          }
          .hover-float:hover {
            transform: translateY(-12px);
            box-shadow: 0 25px 60px rgba(0,0,0,0.15);
          }

          /* IMAGE WRAPPER WITH GLOW BORDER */
          .image-wrapper {
            border-radius: 20px;
            overflow: hidden;
            position: relative;
            box-shadow: 0px 5px 25px rgba(0,0,0,0.15);
          }
          .image-wrapper::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: 20px;
            padding: 2px;
            background: linear-gradient(135deg, #2FC1FF, #18A4E0, #B2EBFF);
            mask: linear-gradient(white 0 0) content-box, linear-gradient(white 0 0);
            mask-composite: exclude;
            opacity: 0.3;
            transition: opacity .4s ease;
          }
          .image-wrapper:hover::after {
            opacity: 0.9;
          }

          /* IMAGE PARALLAX HOVER */
          .blog-image {
            width: 100%;
            height: 360px;
            object-fit: cover;
            transition: transform 0.8s ease;
          }
          .image-wrapper:hover .blog-image {
            transform: scale(1.08) translateY(-6px);
          }

          /* TITLE ANIMATION */
          .animate-title {
            animation: titleFade 1.2s ease forwards;
            opacity: 0;
          }
          @keyframes titleFade {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `}
        </style>

      </div>

    </section>
  );
};

export default Blog;


