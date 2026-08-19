import env from "envgaurd";
import jwt from "jsonwebtoken";
import "dotenv/config";
const secretKey = env("JWT_SECRET");

const genToken = (id) => {
  return jwt.sign({ id }, secretKey, { expiresIn: "15d" });
};

export default genToken;
