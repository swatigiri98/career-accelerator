import { GoogleGenerativeAI } from "@google/generative-ai";

let aiClient = null;

export function getAIClient() {
  if(!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if(!apiKey) {
      throw new Error("GEMINI_API_KEY is not set in backend/.env");
    }
    aiClient = new GoogleGenerativeAI(apiKey);
  }
  return aiClient;
}

export const AI_MODEL = "gemini-3.6-flash";