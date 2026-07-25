import mongoose from "mongoose";

const careerScoreSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true, index: true },
    score: { type: Number, min: 0, max: 100, default: 0 },
    breakdown: {
      resumeScore: { type: Number, min: 0, max: 100, default: 0 },
      interviewScore: { type: Number, min: 0, max: 100, default: 0 },
      roadmapScore: { type: Number, min: 0, max: 100, default: 0 },
    },
  },
  { timestamps: true }
);

const CareerScore = mongoose.model("CareerScore", careerScoreSchema);
export default CareerScore;
