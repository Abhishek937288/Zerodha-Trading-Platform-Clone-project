import "dotenv/config";
import env from "envgaurd";
import sgMail from "@sendgrid/mail";

const sendGridApiKey = env("SEND_GRID_API_KEY");

sgMail.setApiKey(sendGridApiKey);

export const sendMail = async (to, sub, mess) => {
  const msg = {
    to,
    from: env("EMAIL"),
    subject: sub,
    text: mess,
  };
  try {
    await sgMail.send(msg);
    console.log("mail sent successfully");
    return { success: true, message: "mail sent successfully" };
  } catch (err) {
    console.log("error :", err);
    return { success: false, err };
  }
};
