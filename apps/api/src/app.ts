import express from "express";
import cors from "cors";
import healthRoutes from "./routes/health.routes";
import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import pageRoutes from "./routes/page.routes";
import newsRoutes from "./routes/news.routes";
import eventRoutes from "./routes/event.routes";
import adminPageRoutes from "./routes/admin.page.routes";
import adminNewsRoutes from "./routes/admin.news.routes";
import adminEventRoutes from "./routes/admin.event.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

export const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/pages", pageRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin/pages", adminPageRoutes);
app.use("/api/admin/news", adminNewsRoutes);
app.use("/api/admin/events", adminEventRoutes);

app.use(errorMiddleware);