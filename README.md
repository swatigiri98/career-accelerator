# 🚀 AI Career Accelerator

An AI-powered platform that helps students become job-ready through resume analysis, AI mock interviews (voice + text), skill-gap-driven learning roadmaps, and internship recommendations — all connected as **one continuously-updating career profile** instead of disconnected one-off tools.

**🔗 Live Demo:** https://career-accelerator-frontend-6j2u.onrender.com

---

## 💡 The Idea

Most resume checkers and mock-interview apps stop at a score. This platform connects **resume analysis → AI interviews → learning roadmap → internship matches** into one closed loop, so every action moves a single Career Score instead of resetting each time you open a new tool.

## ✨ Features

- **Resume Analyzer** — AI-generated ATS score with specific, line-level feedback
- **AI Mock Interview** — Voice or text interview with questions generated from your actual resume gaps, scored per answer
- **Skill Gap Analysis** — Paste a target job description for role-specific gap analysis
- **Career Roadmap** — Learning path built from resume + interview weaknesses, with progress tracking
- **Internship Matching** — Internships ranked by real skill overlap, with plain-language reasoning
- **Career Report** — Shareable, downloadable (PDF) summary of your whole profile
- **Career Score** — One aggregated score (resume + interview + roadmap) that updates live as you use the app
- Dark/light mode, fully responsive

## 🛠️ Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS
- **Backend:** Node.js + Express
- **Database:** MongoDB
- **AI:** Google Gemini API
- **Deployment:** Render

## 📸 Screenshots

<!-- Screenshots add karne ke liye: GitHub repo pe is README ko edit mode mein kholo,
     phir image ko seedha yahan drag-and-drop karo - GitHub khud markdown line generate kar dega -->

## 🧑‍💻 Getting Started (Local Setup)

**Backend**
```bash
cd backend
npm install
cp .env.example .env
# fill in MONGO_URI, JWT_SECRET, ANTHROPIC_API_KEY
npm run seed
npm run dev
```

**Frontend** (in a second terminal)
```bash
cd frontend
npm install
npm run dev
```

## 👩‍💻 Built By

**Swati Giri**
📧 swatihustle802@gmail.com
🔗 [LinkedIn](https://www.linkedin.com/in/swati-giri-1206a4314/)
🔗 [GitHub](https://github.com/swatigiri98/career-accelerator)

*Built for Buildathon 2K26*