import CareerScore from "../models/CareerScore.js";
import Resume from "../models/Resume.js";
import InterviewSession from "../models/InterviewSession.js";
import RoadmapItem from "../models/RoadmapItem.js";
import Internship from "../models/Internship.js";
import asyncHandler from "../utils/asyncHandler.js";
import { matchInternships } from "../services/matchingService.js";

/**
 * GET /api/dashboard
 * Single call that powers the dashboard page - avoids the frontend having
 * to make five separate requests and juggle five loading states.
 */
export const getDashboard = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const [careerScore, latestResume, interviewSessions, roadmapItems, internships] = await Promise.all([
    CareerScore.findOne({ user: userId }),
    Resume.findOne({ user: userId }).sort({ createdAt: -1 }),
    InterviewSession.find({ user: userId }).sort({ createdAt: -1 }).limit(5),
    RoadmapItem.find({ user: userId }),
    Internship.find({}),
  ]);

  const topInternshipMatches = latestResume
    ? matchInternships(latestResume.extractedSkills, internships).slice(0, 3)
    : [];

  res.json({
    success: true,
    dashboard: {
      careerScore: careerScore || { score: 0, breakdown: { resumeScore: 0, interviewScore: 0, roadmapScore: 0 } },
      latestResume,
      recentInterviews: interviewSessions,
      roadmap: {
        total: roadmapItems.length,
        done: roadmapItems.filter((i) => i.status === "done").length,
        items: roadmapItems,
      },
      topInternshipMatches,
    },
  });
});
