import api from "./api.js";

export const registerRequest = (name, email, password, targetRole) =>
  api.post("/auth/register", { name, email, password, targetRole });

export const loginRequest = (email, password) => api.post("/auth/login", { email, password });

export const getMeRequest = () => api.get("/auth/me");
