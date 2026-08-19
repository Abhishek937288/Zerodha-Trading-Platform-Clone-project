import jwt from "jsonwebtoken";
import env from "envgaurd";

export const protectRoute = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ data: null, success: false, message: "unauthorised" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, env("JWT_SECRET"));

    if (!decoded) {
      return res
        .status(401)
        .json({ data: null, success: false, message: "unauthorised" });
    }

    req.userId = decoded.id;
    next();
  } catch (err) {
    console.log(err.message);
    return res
      .status(401)
      .json({ data: null, success: false, message: "unauthorised" });
  }
};
