import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import env from "envgaurd";
import connectDb from "./Config/db.js";
import cors from "cors";
import authRoues from "./Routes/authRoutes.js";


const PORT = env("PORT", 5000);
const FRONTEND_URL = env("FRONTEND_URL");
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [FRONTEND_URL],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/api/auth",authRoues);


connectDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
