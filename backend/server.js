import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express(); // ✅ Create Express app first
app.use(cors());
app.use(express.json());



// Chat route

app.listen(5000, () => {
  console.log("✅ Server running at http://localhost:5000");
});
