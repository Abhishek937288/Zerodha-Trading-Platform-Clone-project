import "dotenv/config";
import env from "envgaurd";

const nodemailerEmail = env("EMAIL");
const nodemailerPassword = env("PASSWORD");

import nodemailer from "nodemailer";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: nodemailerEmail,
//     pass: nodemailerPassword,
//   },
//   logger: true,
//   debug: true,
// });

const isProduction = process.env.NODE_ENV === "production";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: isProduction ? 465 : 587, // 465 for production (SSL), 587 for dev
  secure: isProduction, // true in production, false in development
  auth: {
    user: nodemailerEmail,
    pass: nodemailerPassword,
  },
  logger: true, // logs SMTP conversation
  debug: true,  // prints debugging info in console
});

export const sendMail = async (to, sub, mess) => {
  return await transporter.sendMail({
    to: to,
    subject: sub,
    html: mess,
  });
};


