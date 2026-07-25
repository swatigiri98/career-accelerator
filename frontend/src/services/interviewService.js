import api from "./api.js";

export const startInterviewRequest = (resumeId) => api.post("/interview/start", { resumeId });

export const submitAnswerRequest = (sessionId, questionId, answer) =>
  api.post(`/interview/${sessionId}/answer`, { questionId, answer });

export const getInterviewSessionRequest = (sessionId) => api.get(`/interview/${sessionId}`);

export const getInterviewHistoryRequest = () => api.get("/interview/history");
