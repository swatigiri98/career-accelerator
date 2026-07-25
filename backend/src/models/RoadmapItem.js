import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false }
);

const roadmapItemSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    skill: { type: String, required: true },
    description: { type: String, default: "" },
    resources: [resourceSchema],
    sourceGap: { type: String, default: "" }, // which resume/interview gap generated this item
    status: { type: String, enum: ["todo", "in-progress", "done"], default: "todo" },
  },
  { timestamps: true }
);

const RoadmapItem = mongoose.model("RoadmapItem", roadmapItemSchema);
export default RoadmapItem;
