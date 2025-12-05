// server/index.js
import express from "express";
import http from "http";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import { registerRoutes } from "./routes.js";
import { authRouter } from "./auth.js";

// __dirname for ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env
dotenv.config({ path: path.join(__dirname, ".env") });
console.log("Loaded ENV:", {
  PORT: process.env.PORT,
  MONGODB_URI: !!process.env.MONGODB_URI,
});

// Create app + server
const app = express();
const httpServer = http.createServer(app);

// Middleware
app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
}));
app.use(express.json());

// Optional MongoDB
if (process.env.MONGODB_URI) {
  mongoose
    .connect(process.env.MONGODB_URI, { dbName: process.env.MONGODB_DBNAME || "taskflow" })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.error("MongoDB Error:", err));
}

// mount auth & api routes
app.use("/auth", authRouter);
registerRoutes(httpServer, app);

// start server
const port = parseInt(process.env.PORT || "5000", 10);
httpServer.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
