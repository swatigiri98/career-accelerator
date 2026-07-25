import InterviewSession from "../models/InterviewSession.js";
import Resume from "../models/Resume.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateInterviewQuestions, scoreInterviewAnswer } from "../services/aiService.js";
import { recomputeCareerScore } from "../services/scoreService.js";

/**
 * POST /api/interview/start
 * body: { resumeId } - uses that resume's gaps to generate questions.
 */
export const startInterview = asyncHandler(async (req, res) => {
  const { resumeId } = req.body;

  const resume = resumeId
    ? await Resume.findOne({ _id: resumeId, user: req.user._id })
    : await Resume.findOne({ user: req.user._id }).sort({ createdAt: -1 });

  if (!resume) {
    res.status(404);
    throw new Error("No resume found to base the interview on - upload a resume first");
  }

  const questionTexts = await generateInterviewQuestions(resume.rawText, resume.gaps, resume.jobDescription);

  const session = await InterviewSession.create({
    user: req.user._id,
    resume: resume._id,
    targetSkills: resume.gaps,
    questions: questionTexts.map((question) => ({
    question: typeof question === 'string' ? question : question.question,
    answer : "",
    score : null,
    feedback : ""
    })),
  });

  res.status(201).json({ success: true, session });
});

/**
 * POST /api/interview/:sessionId/answer
 * body: { questionId, answer }
 */
export const submitAnswer = asyncHandler(async (req, res) => {
  const { sessionId } = req.params;
  const { questionId, answer } = req.body;

  const session = await InterviewSession.findOne({ _id: sessionId, user: req.user._id });
  if (!session) {
    res.status(404);
    throw new Error("Interview session not found");
  }

  const questionEntry = session.questions.id(questionId);
  if (!questionEntry) {
    res.status(404);
    throw new Error("Question not found in this session");
  }

  const { score, feedback } = await scoreInterviewAnswer(questionEntry.question, answer);

  questionEntry.answer = answer;
  questionEntry.score = score;
  questionEntry.feedback = feedback;

  const answeredQuestions = session.questions.filter((q) => q.score !== null);
  session.averageScore =
    answeredQuestions.length === 0
      ? null
      : answeredQuestions.reduce((sum, q) => sum + q.score, 0) / answeredQuestions.length;
  session.completed = session.questions.every((q) => q.score !== null);

  await session.save();

  if (session.completed) {
    await recomputeCareerScore(req.user._id);
  }

  res.json({ success: true, question: questionEntry, session });
});

/**
 * GET /api/interview/:sessionId
 */
export const getInterviewSession = asyncHandler(async (req, res) => {
  const session = await InterviewSession.findOne({ _id: req.params.sessionId, user: req.user._id });
  if (!session) {
    res.status(404);
    throw new Error("Interview session not found");
  }
  res.json({ success: true, session });
});

/**
 * GET /api/interview/history
 */
export const getInterviewHistory = asyncHandler(async (req, res) => {
  const sessions = await InterviewSession.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json({ success: true, sessions });
});
