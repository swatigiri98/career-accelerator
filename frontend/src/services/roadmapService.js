import api from "./api.js";

export const generateRoadmapRequest = () => api.post("/roadmap/generate");

export const getRoadmapRequest = () => api.get("/roadmap");

export const updateRoadmapItemRequest = (itemId, status) => api.patch(`/roadmap/${itemId}`, { status });
