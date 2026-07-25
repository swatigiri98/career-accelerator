import mongoose from "mongoose";

const internshipSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    requiredSkills: [{ type: String, required: true }],
    applyUrl: { type: String, default: "" },
  },
  { timestamps: true }
);

const Internship = mongoose.model("Internship", internshipSchema);
export default Internship;
