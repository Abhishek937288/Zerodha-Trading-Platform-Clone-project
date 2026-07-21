import { sendMail } from "./sendGridEmail.js";
import {
  verificationEmailTemplate,
  WELCOME_EMAIL_TEMPLATE,
  FORGOT_PASSWORD_TEMPLATE,
  PASSWORD_UPDATED_TEMPLATE,
} from "./template.js";
import env from "envgaurd";

const frontendUrl = env("FRONTEND_URL");

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const html = verificationEmailTemplate.replace(
      "{verificationToken}",
      verificationToken
    );

    const response = await sendMail(
      email,
      "Verify your email address - Stock.in",
      html
    );

    return response;
  } catch (err) {
    console.log(`the error is : ${err}`);
    throw new Error("Error while sending the mail");
  }
};

export const sendwelcomeEmail = async (email, name) => {
  try {
    const html = WELCOME_EMAIL_TEMPLATE.replace("{name}", name).replace(
      "{dashboardUrl}",
      `${frontendUrl}/Dashboard/Dashboardpage`
    );

    const response = await sendMail(
      email,
      "Welcome to Stock.in - Email Verified 🎉",
      html
    );
    return response;
  } catch (err) {
    console.log(`error - ${err}`);
    throw new Error(`Error while sending the mail ${err.message}`);
  }
};

export const sendForgotpassLink = async (email, resetUrl) => {
  try {
    const html = FORGOT_PASSWORD_TEMPLATE.replace("{resetUrl}", resetUrl);

    const response = await sendMail(
      email,
      "Reset your password - Stock.in",
      html
    );

    return response;
  } catch (err) {
    console.log(err.message);
    throw new Error("Error while sending forgot password mail");
  }
};

export const updatePassword = async (email, name) => {
  try {
    const html = PASSWORD_UPDATED_TEMPLATE.replace("{name}", name).replace(
      "{dashboardUrl}",
      `${frontendUrl}/Dashboard/Dashboardpage`
    );

    const response = await sendMail(
      email,
      "Password updated successfully - Stock.in",
      html
    );
    return response;
  } catch (err) {
    console.log(err.message);
    throw new Error("Error while sending password update mail");
  }
};
