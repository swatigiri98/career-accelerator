# AI Career Accelerator

An AI-powered platform that helps students become job-ready through resume analysis, AI mock interviews (voice + text), skill-gap-driven learning roadmaps, and internship recommendations — all connected as one continuously-updating career profile instead of disconnected one-off tools.

## Stack
- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **AI:** Anthropic Claude API

## Quick Start

**1. Backend**
```bash
cd backend
npm install
cp .env.example .env
# fill in MONGO_URI, JWT_SECRET, ANTHROPIC_API_KEY
npm run seed
npm run dev
```
Runs on `http://localhost:5000`.

**2. Frontend** (in a second terminal)
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`.

Open `http://localhost:5173`, sign up, upload a resume, and the rest of the app (interview, roadmap, internships) unlocks from there.

## Requirements
- Node.js 18+
- A running MongoDB instance (local `mongod` or a MongoDB Atlas connection string)
- An Anthropic API key (resume analysis, interview questions/scoring, and roadmap generation all call the Claude API — the app will start without a key, but those specific actions will return a clear error until one is added)

## Project Structure
```
career-accelerator/
├── backend/     Express API - see backend/README.md for full API reference
└── frontend/     React client - see frontend/README.md for route map
```

## Features
- Responsive dark/light landing page
- Email/password auth (JWT)
- Resume upload (PDF/DOC/DOCX/TXT) with AI-generated ATS score, strengths, gaps, and extracted skills
- Optional job-description-targeted gap analysis
- AI mock interview (voice via Web Speech API, or text) with questions generated from your specific gaps, and per-answer scoring
- AI-generated learning roadmap, driven by resume gaps and weak interview answers, with status tracking
- Internship matching against a seeded dataset, ranked by skill overlap with plain-language reasoning
- One aggregated Career Score (resume 40% / interview 30% / roadmap 30%) that recomputes after every relevant action
