import bcrypt from "bcrypt";
import userModel from "../Models/usersModel.js";
import { signupSchema } from "../Validation/signupValidation.js";
import { sendVerificationEmail  ,sendwelcomeEmail } from "../Resend/email.js";
import { verificationToken, expToken } from "../Utils/verifyToken.js";

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
  const verifyokenEpiresAt = expToken();
  user.verificationToken = verifyToken;
  user.verificationTokenEpiresAt = verifyokenEpiresAt;
  await sendVerificationEmail(email, verifyToken);

  const { password: _, ...userWithoutpassword } = user._doc;

  await user.save();

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
      verificationTokenEpiresAt: { $gt: Date.now() },
    });
    if (!user) {
      return res
        .status(401)
        .json({
          data: null,
          success: false,
          message: "invalid token or expired token",
        });
    }
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenEpiresAt = undefined;
    await user.save();

   await sendwelcomeEmail(user.email,user.username);

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
