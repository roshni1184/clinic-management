import PDFDocument from "pdfkit";
import fs from "fs";

const generateAppointmentReceipt = (appointment, filePath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const stream = fs.createWriteStream(filePath);

      doc.pipe(stream);

      doc.fontSize(20).text("Appointment Receipt", { align: "center" });
      doc.moveDown();
      
      doc.fontSize(12).text(`Appointment ID: ${appointment._id}`);
      doc.text(`Patient Name: ${appointment.name}`);
      doc.text(`Doctor Name: ${appointment.doctor.name}`);
      doc.text(`Specialization: ${appointment.doctor.specialization}`);
      doc.text(`Date: ${appointment.date}`);
      doc.text(`Time: ${appointment.time}`);
      doc.text(`Fee: ₹${appointment.fee}`);
      doc.text(`Payment Status: ${appointment.paymentStatus}`);
      doc.text(`Payment ID: ${appointment.razorpay_payment_id}`);
      doc.text(`Transaction ID: ${appointment.razorpay_signature}`);

      doc.end();

      stream.on("finish", () => resolve(filePath));
      stream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};

export default generateAppointmentReceipt;
