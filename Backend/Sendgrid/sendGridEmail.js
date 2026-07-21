import "dotenv/config";
import env from "envgaurd";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: env("SMTP_HOST"),
  port: Number(env("SMTP_PORT")),
  secure: Number(env("SMTP_PORT")) === 465,
  auth: {
    user: env("SMTP_USER"),
    pass: env("SMTP_PASS"),
  },
});

export const sendMail = async (to, sub, htmlContent) => {
  try {
    const info = await transporter.sendMail({
      from: env("EMAIL"),
      to,
      subject: sub,
      html: htmlContent,
    });

    console.log("mail sent successfully :", info.messageId);
    return { success: true, message: "mail sent successfully" };
  } catch (err) {
    console.log("error :", err);
    return { success: false, err };
  }
};
