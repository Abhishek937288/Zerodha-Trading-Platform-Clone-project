import bcrypt from "bcrypt";
import userModel from "../Models/usersModel.js";
import { signupSchema } from "../Validation/signupValidation.js";
import { signinSchema } from "../Validation/signInvalidation.js";
import {
  sendVerificationEmail,
  sendwelcomeEmail,
  sendForgotpassLink,
  updatePassword,
} from "../Resend/email.js";
import { verificationToken, genTokenExp } from "../Utils/verifyToken.js";
import genandsetToken from "../Utils/gensetToken.js";
import env from "envgaurd";
const frontendUrl = env("FRONTEND_URL");

export const signup = async (req, res) => {
  const { value, error } = signupSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ data: null, success: false, message: error.details[0].message });
  }
  const { email, password, username } = value;
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res
      .status(400)
      .json({ data: null, success: false, message: "email already taken" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = new userModel({
    username,
    email,
    password: hashedPassword,
  });

  const verifyToken = verificationToken();
  const verifyokenEpiresAt = genTokenExp();
  user.verificationToken = verifyToken;
  user.verificationTokenExpiresAt = verifyokenEpiresAt;
  await sendVerificationEmail(email, verifyToken);

  await user.save();

  const { password: _, ...userWithoutpassword } = user._doc;

  return res.status(200).json({
    data: userWithoutpassword,
    success: true,
    message: "token sent succesfully",
  });
};

export const verifyemail = async (req, res) => {
  try {
    const { code } = req.body;
    if (!code) {
      return res.status(400).json({
        data: null,
        success: false,
        message: "please provide a code",
      });
    }
    const user = await userModel.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res.status(401).json({
        data: null,
        success: false,
        message: "invalid token or expired token",
      });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();
    genandsetToken(user._id, res);

    await sendwelcomeEmail(user.email, user.username);

    return res.status(200).json({
      data: null,
      success: true,
      message: "users email verified successfully",
    });
  } catch (err) {
    console.log(`the error is ${err}`);
    return res.status(400).json({
      data: null,
      success: false,
      message: `error - ${err.message} `,
    });
  }
};

export const signin = async (req, res) => {
  const { value, error } = signinSchema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ data: null, success: false, message: error.details[0].message });
  }
  const { email, password } = value;
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(400).json({
      data: null,
      success: false,
      message: "invalid user or password",
    });
  }

  const isVerified = await bcrypt.compare(password, user.password);
  if (!isVerified) {
    return res
      .status(400)
      .json({ data: null, success: false, message: "incorrect password" });
  }

  genandsetToken(user._id, res);
  const { password: _, ...userWithoutPassword } = user._doc;

  return res.status(200).json({
    data: userWithoutPassword,
    success: false,
    message: "user logged in successfully",
  });
};

export const forgotpassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({
      data: null,
      success: false,
      message: "please enter your email id",
    });
  }
  const user = await userModel.findOne({ email });
  if (!user) {
    return res
      .status(400)
      .json({ data: null, success: false, message: "invalid email id " });
  }

  const resetPasswordToken = verificationToken();
  const tokenExpiry = genTokenExp();

  user.resetPasswordToken = resetPasswordToken;
  user.resetPasswordTokenExpiresAt = tokenExpiry;

  await user.save();

  const url = `${frontendUrl}/Newpasswordpage/${resetPasswordToken}`;

  sendForgotpassLink(user.email, url);

  return res.status(200).json({
    data: null,
    success: true,
    message: "forgot password link shared on mail",
  });
};

export const newPassword = async (req, res) => {
  const { forgotpasstoken } = req.params;
  const { newPassword } = req.body;
  if (!newPassword) {
    return res
      .status(400)
      .json({ data: null, success: false, message: "please enter password" });
  }
  const user = await userModel.findOne({
    resetPasswordToken: forgotpasstoken,
    resetPasswordTokenExpiresAt: { $gt: Date.now() },
  });
  if (!user) {
    return res
      .status(400)
      .json({
        data: null,
        success: false,
        message: "invlaid request or token expired",
      });
  }
  if (!user.isVerified) {
    return res
      .status(400)
      .json({ data: null, success: false, message: "user is not verified" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);

  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpiresAt = undefined;

  await user.save();
  updatePassword(user.email, user.username);

  return res
    .status(200)
    .json({
      data: null,
      success: true,
      message: "password updated succesfull",
    });
};

export const checkAuth = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId);
    if (!user) {
      return res
        .status(401)
        .json({ data: null, success: false, message: "user not found" });
    }
    const { password: _, ...userWithoutPassword } = user._doc;
    return res
      .status(201)
      .json({
        data: userWithoutPassword,
        success: true,
        message: "user found succesfully",
      });
  } catch (err) {
    console.log(err.message);
    return res
      .status(401)
      .json({ data: null, success: false, message: err.message });
  }
};
