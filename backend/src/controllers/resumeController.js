import Resume from "../models/Resume.js";
import asyncHandler from "../utils/asyncHandler.js";
import { extractResumeText } from "../services/parserService.js";
import { analyzeResume } from "../services/aiService.js";
import { recomputeCareerScore } from "../services/scoreService.js";

/**
 * POST /api/resume/upload
 * multipart/form-data with a "resume" file field, and an optional "jobDescription" text field.
 */
export const uploadResume = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.status(400);
    throw new Error("No resume file uploaded - attach a file under the 'resume' field");
  }

  const { jobDescription = "" } = req.body;

  const rawText = await extractResumeText(req.file.buffer, req.file.mimetype);
  if (!rawText || rawText.length < 30) {
    res.status(422);
    throw new Error("Could not extract meaningful text from this file - try a different format");
  }

  const analysis = await analyzeResume(rawText, jobDescription);

  const resume = await Resume.create({
    user: req.user._id,
    fileName: req.file.originalname,
    rawText,
    jobDescription,
    atsScore: analysis.atsScore,
    strengths: analysis.strengths,
    gaps: analysis.gaps,
    extractedSkills: analysis.extractedSkills,
    feedback: analysis.feedback,
  });

  await recomputeCareerScore(req.user._id);

  res.status(201).json({ success: true, resume });
});

/**
 * GET /api/resume/latest
 */
export const getLatestResume = asyncHandler(async (req, res) => {
  const resume = await Resume.findOne({ user: req.user._id }).sort({ createdAt: -1 });

  if (!resume) {
    res.status(404);
    throw new Error("No resume found - upload one first");
  }

  res.json({ success: true, resume });
});

/**
 * GET /api/resume/history
 */
export const getResumeHistory = asyncHandler(async (req, res) => {
  const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, resumes });
});
