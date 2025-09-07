import env from "envgaurd";
import jwt from "jsonwebtoken";
import "dotenv/config";
const secretKey = env("JWT_SECRET");

const genandsetToken = (id, res) => {
  try {
    const token = jwt.sign({ id }, secretKey, { expiresIn: "15d" });
    res.cookie("token", token, {
      httpsOnly: env("STATUS") !== dev,
      sameSite: "Lax",
      secure: true,
      maxAge: 15 * 24 * 60 * 60 * 1000,
    });
  } catch (err) {
    console.log(err.message);
  }
};

export default genandsetToken;
