import Testimonial from "../models/Testimonial.js";

// Submit testimonial (Public)
export const createTestimonial = async (req, res) => {
  try {
    const { name, message, rating } = req.body;

    const testimonial = await Testimonial.create({
      name,
      message,
      rating,
    });

    res.status(201).json({
      message: "Testimonial submitted successfully. Awaiting approval.",
      testimonial,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to submit testimonial" });
  }
};

// Get approved testimonials (Public)
export const getApprovedTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ status: "Approved" }).sort({ createdAt: -1 });

    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch testimonials" });
  }
};

// Admin approve testimonial
export const approveTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { status: "Approved" },
      { new: true }
    );

    res.status(200).json(testimonial);
  } catch (error) {
    res.status(500).json({ message: "Failed to approve testimonial" });
  }
};

// Admin get all testimonials
export const getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });

    res.status(200).json(testimonials);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch testimonials" });
  }
};

export const deleteTestimonial = async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};