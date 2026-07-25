import express from "express";
import mongoose from "mongoose";

const router = express.Router();

/**
 * GET /api/health
 */
router.get("/", (req, res) => {
  const mongoStates = ["disconnected", "connected", "connecting", "disconnecting"];

  res.json({
    success: true,
    message: "API is running",
    mongoStatus: mongoStates[mongoose.connection.readyState],
    timestamp: new Date().toISOString(),
  });
});

export default router;
