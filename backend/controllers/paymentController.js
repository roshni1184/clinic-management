// import express from "express";
// import Razorpay from "razorpay";
// import crypto from "crypto";
// import dotenv from "dotenv";
// import Appointment from "../models/Appointments.js";

// dotenv.config();
// const router = express.Router();

// const razorpay = new Razorpay({
//   key_id: process.env.RAZORPAY_KEY_ID,
//   key_secret: process.env.RAZORPAY_KEY_SECRET,
// });

// // ✅ Step 1: Create payment order for appointment

// router.post("/create-appointment-payment", async (req, res) => {
//   try {
//     const { amount, appointmentId } = req.body;

//     if (!amount || !appointmentId) {
//       return res.status(400).json({ success: false, message: "Missing amount or appointmentId" });
//     }

//     const options = {
//       amount: amount * 100, // Convert to paise
//       currency: "INR",
//       receipt: `appointment_${appointmentId}`,
//     };

//     const order = await razorpay.orders.create(options);

//     // Save order info to appointment (optional)
//     await Appointment.findByIdAndUpdate(appointmentId, {
//       razorpayOrderId: order.id,
//       paymentStatus: "Pending",
//     });

//     res.status(200).json({
//       success: true,
//       razorpayOrder: order,
//     });
//   } catch (error) {
//     console.error("Error creating Razorpay appointment order:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to create payment order for appointment",
//     });
//   }
// });

// // ✅ Step 2: Verify payment after success
// router.post("/verify-appointment-payment", async (req, res) => {
//   try {
//     const {
//       appointmentId,
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = req.body;

//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature === razorpay_signature) {
//       await Appointment.findByIdAndUpdate(appointmentId, {
//         paymentStatus: "Paid",
//         razorpayPaymentId: razorpay_payment_id,
//       });

//       res.json({ success: true, message: "Appointment payment verified successfully" });
//     } else {
//       res.status(400).json({ success: false, message: "Invalid signature" });
//     }
//   } catch (error) {
//     console.error("Verify appointment payment error:", error);
//     res.status(500).json({ success: false, message: "Payment verification failed" });
//   }
// });

// export default router;


import Razorpay from "razorpay";
import crypto from "crypto";
import Appointment from "../models/Appointments.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Create Order
export const createOrder = async (req, res) => {
  try {
    const { appointmentId } = req.body;

    if (!appointmentId) {
      return res.status(400).json({
        success: false,
        message: "No appointmentId received",
      });
    }

    const appointment = await Appointment.findById(appointmentId);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    const amount = Number(appointment.fee || appointment.fees);

    if (!amount || isNaN(amount)) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount",
      });
    }

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: `appointment_${appointmentId}`,
    };

    const order = await razorpay.orders.create(options);

    await Appointment.findByIdAndUpdate(appointmentId, {
      razorpayOrderId: order.id,
      paymentStatus: "Pending",
    });

    res.json({ success: true, order });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      appointmentId,
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    } = req.body;

    // 🔥 Step 1: Signature generate karo
    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    // 🔥 Step 2: Match karo
    if (expectedSignature === razorpay_signature) {

      // ✅ Payment success → DB update
      await Appointment.findByIdAndUpdate(appointmentId, {
        paymentStatus: "Paid",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
      });

      return res.json({
        success: true,
        message: "Payment verified successfully",
      });

    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid signature",
      });
    }

  } catch (err) {
    console.log("Verify Payment Error:", err);
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};