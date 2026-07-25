# Frontend — AI Career Accelerator

## Setup

```bash
cd frontend
npm install
npm run dev
```

Opens on `http://localhost:5173`. The Vite dev server proxies `/api/*` to `http://localhost:5000` (see `vite.config.js`), so start the backend first.

## Routes

| Path | Access | Page |
|---|---|---|
| `/` | Public | Landing page |
| `/login` | Public | Login |
| `/signup` | Public | Sign up |
| `/dashboard` | Protected | Career Score + summary of all sections |
| `/resume` | Protected | Resume upload + AI analysis |
| `/interview` | Protected | AI mock interview (voice or text) |
| `/roadmap` | Protected | Generated learning roadmap |
| `/internships` | Protected | Ranked internship matches |
| `*` | - | 404 |

Protected routes redirect to `/login` if there's no valid session. Voice input in the interview page uses the browser's native Web Speech API (best supported in Chrome) - it degrades gracefully to text-only in unsupported browsers.

## Folder Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── ui/          Button, Card, LoadingSpinner, ScoreGauge
│   │   ├── layout/       AppLayout, Sidebar, ProtectedRoute
│   │   └── *.jsx          Landing page sections (Navbar, Hero, Features, etc.)
│   ├── context/           ThemeContext, AuthContext
│   ├── services/          api.js + one wrapper file per backend resource
│   ├── pages/              One file per route
│   ├── App.jsx              Route definitions
│   ├── main.jsx              React root + router + global CSS
│   └── index.css             Tailwind directives + design system base styles
├── index.html
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
```
