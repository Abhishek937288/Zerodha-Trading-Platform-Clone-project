import "dotenv/config";
import env from "envgaurd";

const nodemailerEmail = env("EMAIL");
const nodemailerPassword = env("PASSWORD");

import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: nodemailerEmail,
    pass: nodemailerPassword,
  },
  logger: true,
  debug: true,
});

export const sendMail = async (to, sub, mess) => {
  return await transporter.sendMail({
    to: to,
    subject: sub,
    html: mess,
  });
};
