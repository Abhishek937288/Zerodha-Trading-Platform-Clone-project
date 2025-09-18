import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import env from "envgaurd";
import connectDb from "./Config/db.js";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import fundRoutes from "./Routes/fundRoute.js";
import orderRoutes from "./Routes/ordersRoute.js";
import positionsRoutes from "./Routes/positionsRoute.js";
import holdingsRoutes from "./Routes/holdingsRoute.js";
import http from "http";
import { Server } from "socket.io";
import { stockData } from "./Utils/stocksData.js";
import { updateStockPrice } from "./Utils/stocksData.js";

const PORT = env("PORT", 5000);
const FRONTEND_URL = env("FRONTEND_URL");
const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
  },
});

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: [FRONTEND_URL],
    method: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

io.on("connection", (socket) => {
  console.log("a new user connected", socket.id);
  socket.emit("stocksData", stockData);

  socket.on("disconnect", () => {
    console.log("client disconnect :", socket.id);
  });
});

setInterval(() => {
  const newstockData = updateStockPrice(stockData);
  io.emit("stocksData", newstockData);
}, 6000);

app.use("/api/auth", authRoutes);
app.use("/api/funds", fundRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/positions", positionsRoutes);
app.use("/api/holdings", holdingsRoutes);

connectDb();

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
