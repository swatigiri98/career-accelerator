import api from "./api.js";

/**
 * Uploads a resume file (+ optional job description) as multipart form data.
 */
export const uploadResumeRequest = (file, jobDescription) => {
  const formData = new FormData();
  formData.append("resume", file);
  if (jobDescription) formData.append("jobDescription", jobDescription);

  return api.post("/resume/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getLatestResumeRequest = () => api.get("/resume/latest");

export const getResumeHistoryRequest = () => api.get("/resume/history");
