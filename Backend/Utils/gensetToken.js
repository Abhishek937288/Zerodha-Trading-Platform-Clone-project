import env from "envgaurd";
import jwt from "jsonwebtoken";
import "dotenv/config";
const secretKey = env("JWT_SECRET");

const genandsetToken = (id, res) => {
  const token = jwt.sign({ id }, secretKey, { expiresIn: "15d" });
  const isProduction = process.env.NODE_ENV === "production";
  res.cookie("token", token, {
    httpOnly: true,
    sameSite: isProduction ? "None" : "Lax",
    secure: isProduction,
    path: "/",
    maxAge: 15 * 24 * 60 * 60 * 1000,
  });
};

export default genandsetToken;
