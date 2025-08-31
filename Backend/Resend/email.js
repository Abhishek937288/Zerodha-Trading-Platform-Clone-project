import { resend } from "./config.js";
import {
  verificationEmailTemplate,
  WELCOME_EMAIL_TEMPLATE,
} from "./template.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your token for the email verification",
      html: verificationEmailTemplate.replace(
        "{verificationToken}",
        verificationToken
      ),
    });
    return response;
  } catch (err) {
    console.log(`the error is : ${err}`);
    throw new Error("Error while sending the mail");
  }
};

export const sendwelcomeEmail = async (email, name) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your token for the email verification",
      html: WELCOME_EMAIL_TEMPLATE.replace("{name}", name),
    });
    return response;
  } catch (err) {
    console.log(`error - ${err}`);
    throw new Error(`Error while sending the mail ${err.message}`);
  }
};

export const sendForgotpassLink = async (email, forntendUrl) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your token for the email verification",
      html: `<p>Click <a href="${forntendUrl}">here</a> to reset your password </p>`,
    });
    return response;
  } catch (err) {
    console.log(err.message);
  }
};


export const updatePassword = async (email, name) => {
  try {
    const response = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: email,
      subject: "Your token for the email verification",
      html: `<p>${name} your reset password request successfully done</p>`
    });
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
