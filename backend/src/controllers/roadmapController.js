import RoadmapItem from "../models/RoadmapItem.js";
import Resume from "../models/Resume.js";
import InterviewSession from "../models/InterviewSession.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateRoadmap } from "../services/aiService.js";
import { recomputeCareerScore } from "../services/scoreService.js";

/**
 * POST /api/roadmap/generate
 * Builds roadmap items from the latest resume's gaps, plus any skills that
 * scored low (<6/10) in the most recent completed interview - this is the
 * "closed loop" step where interview performance feeds back into the plan.
 */
export const generateUserRoadmap = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ user: req.user._id }).sort({ createdAt: -1 });
  if (!resume) {
    res.status(404);
    throw new Error("No resume found - upload a resume first so the roadmap has gaps to build from");
  }

  const latestSession = await InterviewSession.findOne({ user: req.user._id, completed: true }).sort({
    createdAt: -1,
  });

  const weakInterviewSkills = [];
  if (latestSession) {
    latestSession.questions.forEach((q, index) => {
      if (q.score !== null && q.score < 6 && latestSession.targetSkills[index]) {
        weakInterviewSkills.push(latestSession.targetSkills[index]);
      }
    });
  }

  const combinedGaps = [...new Set([...resume.gaps, ...weakInterviewSkills])];

  if (combinedGaps.length === 0) {
    res.status(400);
    throw new Error("No skill gaps found to build a roadmap from");
  }

  const items = await generateRoadmap(combinedGaps);

  // Replace any existing "todo" items so re-generating doesn't pile up duplicates;
  // items already in-progress or done are preserved as a record of real progress.
  await RoadmapItem.deleteMany({ user: req.user._id, status: "todo" });

  const created = await RoadmapItem.insertMany(
    items.map((item) => ({
      user: req.user._id,
      skill: item.skill || item.phaseTitle || "Technical Skill",
      description: item.description || (item.topics ? item.topics.join(", ") : ""),
      resources: item.resources || [],
      sourceGap: item.skill || item.phaseTitle || "General",
      status: "todo",
    }))
  );

  await recomputeCareerScore(req.user._id);

  res.status(201).json({ success: true, items: created });
});

/**
 * GET /api/roadmap
 */
export const getRoadmap = asyncHandler(async (req, res) => {
  const items = await RoadmapItem.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, items });
});

/**
 * PATCH /api/roadmap/:itemId
 * body: { status }
 */
export const updateRoadmapItem = asyncHandler(async (req, res) => {
  const { status } = req.body;

  if (!["todo", "in-progress", "done"].includes(status)) {
    res.status(400);
    throw new Error("Status must be one of: todo, in-progress, done");
  }

  const item = await RoadmapItem.findOneAndUpdate(
    { _id: req.params.itemId, user: req.user._id },
    { status },
    { new: true }
  );

  if (!item) {
    res.status(404);
    throw new Error("Roadmap item not found");
  }

  await recomputeCareerScore(req.user._id);

  res.json({ success: true, item });
});
