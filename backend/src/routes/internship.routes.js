import express from "express";
import { getMatchedInternships, getAllInternships } from "../controllers/internshipController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/match", protect, getMatchedInternships);
router.get("/", protect, getAllInternships);

export default router;
