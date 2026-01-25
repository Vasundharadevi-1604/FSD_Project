import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import path from "path";
import { fileURLToPath } from "url";

import userRoutes from "./routes/userRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

/* 🔹 Load .env correctly (ESM-safe) */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

/* 🔍 TEMP DEBUG (REMOVE AFTER SUCCESS) */
console.log("MONGO_URI =", process.env.MONGO_URI);

const app = express();
const PORT = process.env.PORT || 5000;

/* Middleware */
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

/* Routes */
app.use("/api", userRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/applications", applicationRoutes);

app.get("/", (req, res) => res.send("API is running..."));

/* MongoDB Connection */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB Atlas'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

/* Server */
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
