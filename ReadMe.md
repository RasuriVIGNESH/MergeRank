# MergeRank 🏆

> **Competitive Programming Analytics & Mentorship Platform**
> Rank within your college batch. Compete smarter.

[![Live Demo](https://img.shields.io/badge/Live-mergerank.pages.dev-blue?style=flat-square)](https://mergerank.pages.dev)
[![Stack](https://img.shields.io/badge/Stack-MERN-green?style=flat-square)](#tech-stack)

---

## 📌 Overview

Global leaderboards showing ranks in the millions kill motivation. **MergeRank** solves this by unifying a student's data from **LeetCode, GitHub, Codeforces, CodeChef, and HackerRank** into a single profile — then ranking them **only within their college batch**.

Mentors get a real-time class overview with placement-readiness scores, at-risk alerts, and CSV export. Students get an AI-powered study plan, activity heatmaps, and streak tracking — all in one place.

---

## Features

### For Students
- **Unified Dashboard** — Total problems solved, GitHub contributions, and current streak in one view
- **Topic Mastery Radar** — Spider chart across Arrays, Strings, Trees, Graphs, and DP
- **GitHub Contribution Heatmap** — Visual activity grid (26 weeks)
- **Platform Integrations** — Connect LeetCode, GitHub, Codeforces, CodeChef, and HackerRank with a single username
- **Batch Leaderboard** — Rankings scoped to your college batch across all connected platforms
- **AI Suggestions** — Personalized weekly goals and targeted topic recommendations powered by an LLM pipeline
- **Placement Readiness Score** — 0–100 score based on problem-solving breadth and difficulty mix
- **Anonymous Mode** — Compare stats with peers without revealing identity

### For Mentors
- **Class Overview Dashboard** — Total students, placement-ready count (80+), and at-risk count (<40)
- **Student Performance Table** — Searchable/filterable table with Total Solved and LeetCode Rating per student
- **Batch Explorer** — Browse all student batches across branches and graduation years
- **Proactive Alerts** — Instant notifications when a student goes inactive for 7+ days or falls behind the batch average
- **Export Report** — One-click CSV export of student performance data

---


## 🛠️ Tech Stack

### Frontend
| Tech | Purpose |
|---|---|
| React 18 + Vite | UI framework & build tool |
| React Router v6 | Client-side routing |
| Recharts | Radar chart (Topic Mastery) |
| Lucide React | Icon library |
| CSS-in-JS (inline styles) | Theming with dark/light mode |
| Cloudflare Pages | Frontend hosting |

### Backend
| Tech | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT | Authentication |
| Render | Backend hosting (free tier — cold starts expected) |

### External APIs & Integrations
| Platform | Data Fetched |
|---|---|
| LeetCode (unofficial GraphQL) | Total solved, Easy/Med/Hard breakdown, topic tags |
| GitHub REST API | Contributions, repos, stars |
| Codeforces API | Rating, contest history |
| CodeChef API | Stars, badges |
| HackerRank API | Badges, certificates, solved count |
| Anthropic / OpenAI | AI study plan & problem recommendations |

---

## 🗂️ Project Structure

```
mergerank/
├── client/                  # React frontend (Vite)
│   ├── public/
│   │   └── logo.png
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── student/
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── Leaderboard.jsx
│   │   │   │   ├── AISuggestions.jsx
│   │   │   │   └── Profile.jsx
│   │   │   └── mentor/
│   │   │       ├── MentorDashboard.jsx
│   │   │       ├── BatchExplorer.jsx
│   │   │       ├── MentorLeaderboard.jsx
│   │   │       └── Alerts.jsx
│   │   ├── components/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env.example
│   └── vite.config.js
│
└── server/                  # Express backend
    ├── controllers/
    │   ├── authController.js
    │   ├── platformController.js
    │   ├── leaderboardController.js
    │   └── aiController.js
    ├── models/
    │   ├── User.js
    │   ├── Batch.js
    │   └── Alert.js
    ├── routes/
    │   ├── auth.js
    │   ├── platforms.js
    │   ├── leaderboard.js
    │   └── ai.js
    ├── middleware/
    │   └── authMiddleware.js
    ├── utils/
    │   └── platformSync.js
    ├── .env.example
    └── server.js
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Clone the repository

```bash
git clone https://github.com/your-username/mergerank.git
cd mergerank
```

### 2. Setup the Backend

```bash
cd server
npm install
cp .env.example .env
```

Edit `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/mergerank
JWT_SECRET=your_jwt_secret_here
OPENAI_API_KEY=your_openai_or_anthropic_key   # for AI suggestions
GITHUB_TOKEN=your_github_pat                  # optional, for higher rate limits
```

Start the server:

```bash
npm run dev       # Development (nodemon)
npm start         # Production
```

The API will be available at `http://localhost:5000/api`.

### 3. Setup the Frontend

```bash
cd ../client
npm install
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the dev server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

---

## 🔌 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register student or mentor |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/auth/me` | Get current user profile |

### Platforms
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/platforms/connect` | Connect a platform username |
| POST | `/api/platforms/sync` | Sync all connected platforms |
| GET | `/api/platforms/profile` | Get unified platform data |

### Leaderboard
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/leaderboard` | Get batch leaderboard (filterable by branch/year) |
| GET | `/api/leaderboard/:platform` | Platform-specific leaderboard |

### AI
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/ai/suggestions` | Get personalized AI study recommendations |

### Mentor
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/mentor/dashboard` | Class overview stats |
| GET | `/api/mentor/students` | All students with performance data |
| GET | `/api/mentor/batches` | All batches |
| GET | `/api/mentor/alerts` | At-risk student alerts |
| GET | `/api/mentor/export` | Export CSV report |


## 🔄 Data Sync

Platform data is synced automatically every **6 hours** via a scheduled job on the backend. Students can also trigger a manual sync from their Profile page using the **"Sync All Now"** button.

The sync pipeline:
1. Fetches latest stats from each connected platform API
2. Updates the user's document in MongoDB
3. Recalculates the batch leaderboard scores
4. Fires alerts if a student has been inactive for 7+ days

---

## 🤖 AI Suggestions Engine

The AI module analyzes a student's:
- Topic-wise problem distribution (weak areas detection)
- Difficulty mix (Easy / Medium / Hard ratio)
- Platform coverage gaps (e.g., missing Codeforces)
- Current streak and recent activity

It then calls an LLM   Anthropic Claude with a structured prompt and returns:
- A **Weekly Goal** with a placement readiness target
- **Targeted Topics** with specific recommended problems

---

## 🌐 Deployment

### Frontend — Cloudflare Pages

```bash
cd client
npm run build
# Upload dist/ to Cloudflare Pages
# Set VITE_API_URL to your Render backend URL
```

## 👥 User Roles

| Role | Access |
|---|---|
| **Student** | Dashboard, Leaderboard, AI Suggestions, Profile |
| **Mentor** | Dashboard (Class Overview), Batch Explorer, Leaderboard, Alerts |

Students join a batch using an **Invite Code** generated by their mentor during batch creation.

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'Add your feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgements

- [LeetCode](https://leetcode.com), [GitHub](https://github.com), [Codeforces](https://codeforces.com), [CodeChef](https://codechef.com), [HackerRank](https://hackerrank.com) for their public APIs
- [Lucide](https://lucide.dev) for the icon set
- [Recharts](https://recharts.org) for charting
- [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) & [Geist](https://vercel.com/font) for typography

