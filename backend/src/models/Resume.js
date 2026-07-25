import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    fileName: { type: String, required: true },
    rawText: { type: String, required: true },
    jobDescription: { type: String, default: "" },
    atsScore: { type: Number, min: 0, max: 100, required: true },
    strengths: [{ type: String }],
    gaps: [{ type: String }],
    extractedSkills: [{ type: String }],
    feedback: { type: String, default: "" },
  },
  { timestamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);
export default Resume;
