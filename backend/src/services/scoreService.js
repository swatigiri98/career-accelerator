import Resume from "../models/Resume.js";
import InterviewSession from "../models/InterviewSession.js";
import RoadmapItem from "../models/RoadmapItem.js";
import CareerScore from "../models/CareerScore.js";

const WEIGHTS = {
  resume: 0.4,
  interview: 0.3,
  roadmap: 0.3,
};

/**
 * Recomputes and persists a user's Career Score from their latest resume
 * analysis, interview performance, and roadmap completion. Called after
 * any action that could move the score, so the dashboard always reads a
 * value that's already up to date rather than computing on every GET.
 */
export async function recomputeCareerScore(userId) {
  const latestResume = await Resume.findOne({ user: userId }).sort({ createdAt: -1 });
  const resumeScore = latestResume ? latestResume.atsScore : 0;

  const interviewSessions = await InterviewSession.find({ user: userId, averageScore: { $ne: null } });
  const interviewScore =
    interviewSessions.length === 0
      ? 0
      : Math.round(
          (interviewSessions.reduce((sum, s) => sum + s.averageScore, 0) / interviewSessions.length) * 10
        ); // averageScore is out of 10 -> scale to 100

  const roadmapItems = await RoadmapItem.find({ user: userId });
  const roadmapScore =
    roadmapItems.length === 0
      ? 0
      : Math.round((roadmapItems.filter((item) => item.status === "done").length / roadmapItems.length) * 100);

  const score = Math.round(
    resumeScore * WEIGHTS.resume + interviewScore * WEIGHTS.interview + roadmapScore * WEIGHTS.roadmap
  );

  const careerScore = await CareerScore.findOneAndUpdate(
    { user: userId },
    {
      user: userId,
      score,
      breakdown: { resumeScore, interviewScore, roadmapScore },
    },
    { upsert: true, new: true }
  );

  return careerScore;
}
