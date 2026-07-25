import express from "express";
import cors from "cors";
import morgan from "morgan";

import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import resumeRoutes from "./routes/resume.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import roadmapRoutes from "./routes/roadmap.routes.js";
import internshipRoutes from "./routes/internship.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

const app = express();

// --- Core middleware ---
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
  app.use(morgan("dev"));
}

// --- Routes ---
app.use("/api/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/internships", internshipRoutes);
app.use("/api/dashboard", dashboardRoutes);

// --- Error handling (must be last) ---
app.use(notFound);
app.use(errorHandler);

export default app;
