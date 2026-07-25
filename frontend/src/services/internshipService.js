import api from "./api.js";

export const getMatchedInternshipsRequest = () => api.get("/internships/match");

export const getAllInternshipsRequest = () => api.get("/internships");
