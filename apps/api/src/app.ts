import express from "express";
import cors from "cors";

export const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
    })
);

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "Bahrain Red Crescent API is running",
    })
});

