import express from "express";
import { generateUserRoadmap, getRoadmap, updateRoadmapItem } from "../controllers/roadmapController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.post("/generate", protect, generateUserRoadmap);
router.get("/", protect, getRoadmap);
router.patch("/:itemId", protect, updateRoadmapItem);

export default router;
