import express from "express";
import cookieParser from "cookie-parser";
import "dotenv/config";
import connectDb from "./Config/db.js";
import cors from "cors";
import authRoutes from "./Routes/authRoutes.js";
import fundRoutes from "./Routes/fundRoute.js";
import orderRoutes from "./Routes/ordersRoute.js";
import positionsRoutes from "./Routes/positionsRoute.js";
import holdingsRoutes from "./Routes/holdingsRoute.js";
import dashboardRoutes from "./Routes/dashboardRoutes.js";
import http from "http";
import { Server } from "socket.io";
import { stockData, updateStockPrice } from "./Utils/stocksData.js";

import path from "path";
import { fileURLToPath } from "url";

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL;

const app = express();
const server = http.createServer(app);

// ESM dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

const io = new Server(server, {
  cors:
    process.env.NODE_ENV === "development"
      ? {}
      : { origin: FRONTEND_URL, credentials: true },
});

io.on("connection", (socket) => {
  console.log("a new user connected", socket.id);
  socket.emit("stocksData", stockData);

  socket.on("disconnect", () => {
    console.log("client disconnect :", socket.id);
  });
});

setInterval(() => {
  io.emit("stocksData", updateStockPrice(stockData));
}, 6000);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/funds", fundRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/positions", positionsRoutes);
app.use("/api/holdings", holdingsRoutes);
app.use("/api/dashboard", dashboardRoutes);

// DB
connectDb();

if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "client");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
