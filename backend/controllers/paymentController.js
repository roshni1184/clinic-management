import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import dotenv from "dotenv";
import Appointment from "../models/Appointment.js";

dotenv.config();
const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Step 1: Create payment order for appointment

router.post("/create-appointment-payment", async (req, res) => {
  try {
    const { amount, appointmentId } = req.body;

    if (!amount || !appointmentId) {
      return res.status(400).json({ success: false, message: "Missing amount or appointmentId" });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `appointment_${appointmentId}`,
    };

    const order = await razorpay.orders.create(options);

    // Save order info to appointment (optional)
    await Appointment.findByIdAndUpdate(appointmentId, {
      razorpayOrderId: order.id,
      paymentStatus: "Pending",
    });

    res.status(200).json({
      success: true,
      razorpayOrder: order,
    });
  } catch (error) {
    console.error("Error creating Razorpay appointment order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create payment order for appointment",
    });
  }
});

// ✅ Step 2: Verify payment after success
router.post("/verify-appointment-payment", async (req, res) => {
  try {
    const {
      appointmentId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    if (expectedSignature === razorpay_signature) {
      await Appointment.findByIdAndUpdate(appointmentId, {
        paymentStatus: "Paid",
        razorpayPaymentId: razorpay_payment_id,
      });

      res.json({ success: true, message: "Appointment payment verified successfully" });
    } else {
      res.status(400).json({ success: false, message: "Invalid signature" });
    }
  } catch (error) {
    console.error("Verify appointment payment error:", error);
    res.status(500).json({ success: false, message: "Payment verification failed" });
  }
});

export default router;
