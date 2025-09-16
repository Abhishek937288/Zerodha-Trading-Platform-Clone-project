import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import env from "envgaurd";
import connectDb from "./Config/db.js";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import fundRoutes from "./Routes/fundRoute.js";
import orderRoutes from "./Routes/ordersRoute.js"
import positionsRoutes from "./Routes/positionsRoute.js"
import holdingsRoutes from "./Routes/holdingsRoute.js"

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

app.use("/api/auth", authRoutes);
app.use("/api/funds", fundRoutes);
app.use("/api/orders",orderRoutes);
app.use("/api/positions",positionsRoutes);
app.use("/api/holdings",holdingsRoutes);

connectDb();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
