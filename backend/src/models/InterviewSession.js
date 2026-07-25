import mongoose from "mongoose";

const qaSchema = new mongoose.Schema(
  {
    question: { type: String, required: true },
    answer: { type: String, default: "" },
    score: { type: Number, min: 0, max: 10, default: null },
    feedback: { type: String, default: "" },
  },
  { _id: true }
);

const interviewSessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    resume: { type: mongoose.Schema.Types.ObjectId, ref: "Resume", required: true },
    targetSkills: [{ type: String }], // the gaps this session was generated to probe
    questions: [qaSchema],
    averageScore: { type: Number, min: 0, max: 10, default: null },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const InterviewSession = mongoose.model("InterviewSession", interviewSessionSchema);
export default InterviewSession;
