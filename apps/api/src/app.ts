import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes";

export const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/health", healthRoutes);