import { getAIClient, AI_MODEL } from "../config/ai.js";
import { parseAIJson } from "../utils/parseAIJson.js";

// 1. Resume Analyzer
export async function analyzeResume(resumeText, jobDescription = "") {
  try {
    const client = getAIClient();
    const model = client.getGenerativeModel({ model: AI_MODEL });

    const systemPrompt = `You are an expert technical recruiter and ATS. Analyze the resume against the job description. Respond with ONLY valid JSON, no markdown fences, no preamble, matching exactly:
{
  "atsScore": <integer 0-100>,
  "strengths": [<string>, ...],
  "gaps": [<string>, ...],
  "extractedSkills": [<string>, ...],
  "feedback": "<2-4 sentence summary written directly to the candidate>"
}`;

    const userPrompt = `RESUME TEXT:\n${resumeText}\n\nJOB DESCRIPTION:\n${jobDescription}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const responseText = result.response.text();
    return parseAIJson(responseText);
  } catch (error) {
    console.error("AI Analysis Error:", error);
    throw new Error("AI Analysis failed: " + error.message);
  }
}

// 2. Generate Interview Questions
export async function generateInterviewQuestions(rawText, gaps, jobDescription) {
  try {
    const client = getAIClient();
    const model = client.getGenerativeModel({ model: AI_MODEL });

    const systemPrompt = `You are an expert technical hiring manager. Generate a list of interview questions based on the candidate's resume text, gaps, and the target job description. Respond with ONLY valid JSON, no markdown fences, no preamble, matching exactly:
{
  "questions": [
    {
      "question": "<string>",
      "category": "<Technical / Behavioral / System Design>",
      "difficulty": "<Easy / Medium / Hard>",
      "expectedKeyPoints": [<string>, ...]
    }
  ]
}`;

    const userPrompt = `Resume Content:\n${rawText}\n\nIdentified Gaps:\n${JSON.stringify(gaps)}\n\nJob Description:\n${jobDescription || "Not provided"}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const responseText = result.response.text();
    const parsed = parseAIJson(responseText);
    
    // Agar AI ne object ke andar 'questions' array diya hai, toh sirf array return karo
    if (parsed && Array.isArray(parsed.questions)) {
      return parsed.questions;
    }
    // Agar seedha array mil jaye
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return [];
  } catch (error) {
    console.error("Interview Questions Error:", error);
    throw new Error("Failed to generate interview questions: " + error.message);
  }
}

// 3. Score Interview Answer
export async function scoreInterviewAnswer(question, candidateAnswer) {
  try {
    const client = getAIClient();
    const model = client.getGenerativeModel({ model: AI_MODEL });

    const systemPrompt = `You are an expert technical interviewer evaluating a candidate's answer. Respond with ONLY valid JSON, no markdown fences, no preamble, matching exactly:
{
  "score": <integer 0-10>,
  "feedback": "<detailed constructive feedback>",
  "improvements": [<string>, ...]
}`;

    const userPrompt = `Question: ${question}\nCandidate Answer: ${candidateAnswer}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const responseText = result.response.text();
    return parseAIJson(responseText);
  } catch (error) {
    console.error("Score Answer Error:", error);
    throw new Error("Failed to score interview answer: " + error.message);
  }
}

// 4. Generate Career Roadmap
export async function generateRoadmap(currentRole, targetRole, skills = []) {
  try {
    const client = getAIClient();
    const model = client.getGenerativeModel({ model: AI_MODEL });

    const systemPrompt = `You are an expert career coach and technical mentor. Generate a step-by-step career learning roadmap to transition from the current role to the target role. Respond with ONLY valid JSON, no markdown fences, no preamble, matching exactly:
{
  "roadmapTitle": "<string>",
  "estimatedDuration": "<string>",
  "phases": [
    {
      "phaseTitle": "<string>",
      "duration": "<string>",
      "topics": [<string>, ...],
      "milestone": "<string>"
    }
  ]
}`;

    const userPrompt = `Current Role: ${currentRole}\nTarget Role: ${targetRole}\nCurrent Skills: ${skills.join(", ")}`;

    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: `${systemPrompt}\n\n${userPrompt}` }] }],
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    const responseText = result.response.text();
    const parsed = parseAIJson(responseText);

    // Agar AI ne 'phases' array diya hai, toh usko return karo
    if (parsed && Array.isArray(parsed.phases)) {
      return parsed.phases;
    }
    // Agar direct array mil jaye
    if (Array.isArray(parsed)) {
      return parsed;
    }
    // Fallback array taaki .map() kabhi fail na ho
    return [];
  } catch (error) {
    console.error("Roadmap Generation Error:", error);
    throw new Error("Failed to generate career roadmap: " + error.message);
  }
}