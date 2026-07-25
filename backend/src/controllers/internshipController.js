import Internship from "../models/Internship.js";
import Resume from "../models/Resume.js";
import asyncHandler from "../utils/asyncHandler.js";
import { matchInternships } from "../services/matchingService.js";

/**
 * GET /api/internships/match
 */
export const getMatchedInternships = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne().sort({ createdAt: -1 });
  if (!resume) {
    res.status(404);
    throw new Error("No resume found - upload a resume first so internships can be matched to your skills");
  }

  const internships = await Internship.find({});
  if (internships.length === 0) {
    res.status(404);
    throw new Error("No internships available yet - run the seed script on the backend");
  }

  const matches = matchInternships(resume.extractedSkills, internships);

  res.json({ success: true, matches });
});

/**
 * GET /api/internships
 * Unfiltered list, useful for browsing without a resume yet.
 */
export const getAllInternships = asyncHandler(async (req, res) => {
  const internships = await Internship.find({}).sort({ createdAt: -1 });
  res.json({ success: true, internships });
});
