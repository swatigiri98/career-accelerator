import express from "express";
import {
  startInterview,
  submitAnswer,
  getInterviewSession,
  getInterviewHistory,
} from "../controllers/interviewController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/start", protect, startInterview);
router.post("/:sessionId/answer", protect, submitAnswer);
router.get("/history", protect, getInterviewHistory);
router.get("/:sessionId", protect, getInterviewSession);

export default router;
