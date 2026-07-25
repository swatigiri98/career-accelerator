# Backend — AI Career Accelerator API

## Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in MONGO_URI, JWT_SECRET, and ANTHROPIC_API_KEY in .env
npm run seed   # populates the internships collection
npm run dev
```

Server starts on `http://localhost:5000`.

## Environment Variables

| Variable | Description |
|---|---|
| `PORT` | Port the server listens on (default 5000) |
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret used to sign auth tokens |
| `JWT_EXPIRES_IN` | Token lifetime (e.g. `7d`) |
| `ANTHROPIC_API_KEY` | Required for resume analysis, interview questions/scoring, and roadmap generation |
| `CLIENT_ORIGIN` | Frontend URL, for CORS |

## API Reference

### Auth
- `POST /api/auth/register` — `{ name, email, password, targetRole? }`
- `POST /api/auth/login` — `{ email, password }`
- `GET /api/auth/me` — requires `Authorization: Bearer <token>`

### Resume
- `POST /api/resume/upload` — multipart form, field `resume` (file) + optional `jobDescription` (text)
- `GET /api/resume/latest`
- `GET /api/resume/history`

### Interview
- `POST /api/interview/start` — `{ resumeId? }` (defaults to latest resume)
- `POST /api/interview/:sessionId/answer` — `{ questionId, answer }`
- `GET /api/interview/:sessionId`
- `GET /api/interview/history`

### Roadmap
- `POST /api/roadmap/generate` — builds items from latest resume gaps + weak interview answers
- `GET /api/roadmap`
- `PATCH /api/roadmap/:itemId` — `{ status: "todo" | "in-progress" | "done" }`

### Internships
- `GET /api/internships/match` — ranked matches for the current user
- `GET /api/internships` — unfiltered list

### Dashboard
- `GET /api/dashboard` — aggregates career score, latest resume, recent interviews, roadmap progress, top matches

All routes except `/api/health`, `/api/auth/register`, and `/api/auth/login` require the `Authorization: Bearer <token>` header.

## Folder Structure

```
backend/
├── src/
│   ├── config/        # db.js (MongoDB), ai.js (Anthropic client)
│   ├── models/         # User, Resume, InterviewSession, RoadmapItem, Internship, CareerScore
│   ├── controllers/    # Request handlers - one file per resource
│   ├── routes/          # Express routers - one file per resource
│   ├── middleware/      # auth.js (JWT), upload.js (multer), errorHandler.js
│   ├── services/        # aiService (LLM calls), parserService (resume text extraction),
│   │                      matchingService (internship scoring), scoreService (career score aggregation)
│   ├── utils/           # asyncHandler, generateToken, parseAIJson
│   ├── data/             # internships.seed.json
│   ├── scripts/          # seedInternships.js
│   ├── app.js
│   └── server.js
├── .env.example
└── package.json
```
