import nodemailer from "nodemailer";

export const sendEmail = async ({ email, subject, text, attachment }) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_EMAIL,
    to: email,
    subject,
    text,
    attachments: attachment ? [{ path: attachment }] : [],
  });

  return true;
};
