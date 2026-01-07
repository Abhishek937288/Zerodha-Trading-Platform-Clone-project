
import { sendMail } from "./sendGridEmail.js";
import { verificationEmailTemplate ,WELCOME_EMAIL_TEMPLATE } from "./template.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  try {
    // const html = verificationEmailTemplate.replace(
    //   "{verificationToken}",
    //   verificationToken
    // );

    const response = await sendMail(
      email,
      "Your token for the email verification",
      verificationToken
    );

    return response;
  } catch (err) {
    console.log(`the error is : ${err}`);
    throw new Error("Error while sending the mail");
  }
};

export const sendwelcomeEmail = async (email, name) => {
  try {
    // const html = WELCOME_EMAIL_TEMPLATE.replace("{name}", name);
    const response = await sendMail(
      email,
      "Your token for the email verification",
      name
    );
    return response;
  } catch (err) {
    console.log(`error - ${err}`);
    throw new Error(`Error while sending the mail ${err.message}`);
  }
};

export const sendForgotpassLink = async (email, forntendUrl) => {
  try {
    // const html = `<p>Click <a href="${forntendUrl}">here</a> to reset your password </p>`;
    const response = await sendMail(email, "please check the link", forntendUrl);

    return response;
  } catch (err) {
    console.log(err.message);
  }
};

export const updatePassword = async (email, name) => {
  try {
    // const response = await resend.emails.send({
    //   from: "onboarding@resend.dev",
    //   to: email,
    //   subject: "Your token for the email verification",
    //   html: `<p>${name} your reset password request successfully done</p>`,
    // const html = `<p>${name} your reset password request successfully done</p>`;
    const subject = "Your token for the email verification";
    const response = await sendMail(email, subject, name);
    return response;
  } catch (err) {
    console.log(err.message);
  }
};
