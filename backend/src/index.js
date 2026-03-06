import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
const app = express();

import { connectDb } from "./lib/db.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

// -------------------- Middleware -------------------- //
app.use(express.json());
app.use(cookieParser());

// Log every request for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// CORS for dev and deployed frontend
app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));

// -------------------- API Routes -------------------- //
app.use("/api/auth", authRoutes);

// -------------------- Global Error Handler -------------------- //
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Something went wrong" });
});

// -------------------- Start Server & Connect DB -------------------- //
app.listen(PORT, async () => {
  console.log(`Server running on PORT: ${PORT}`);
  try {
    await connectDb();
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
});
