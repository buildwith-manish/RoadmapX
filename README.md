# RoadmapX 🚀

RoadmapX is a learning roadmap platform that helps developers and students follow structured roadmaps for various technologies (DSA, AI, Frontend, Backend, etc.) with progress tracking, AI-powered custom roadmaps, leaderboards, reminders, and social sharing.

This is the unified monorepo combining both the **frontend** and **backend** codebases.

## 📁 Repository Structure

```
RoadmapX/
├── frontend/   # Static HTML/CSS/JS frontend (deployed on Cloudflare Pages)
└── backend/    # Node.js + Express + MongoDB backend (deployed on Render)
```

## 🌐 Live Deployment

- **Frontend:** https://roadmapx-frontend.pages.dev/
- **Backend:** https://roadmapx-backend-3qmc.onrender.com

## 🛠️ Tech Stack

### Frontend
- Vanilla HTML5, CSS3, JavaScript (ES6+)
- Capacitor 6 (Android app wrapper)
- Google OAuth (Capacitor plugin)
- Hosted on Cloudflare Pages

### Backend
- Node.js + Express
- MongoDB + Mongoose
- Session-based auth (express-session + connect-mongo)
- bcryptjs (password hashing)
- speakeasy + qrcode (2FA / TOTP)
- nodemailer (email verification, password reset)
- node-cron (scheduled reminders)
- express-rate-limit (rate limiting)
- google-auth-library (Google OAuth verification)

## 🚀 Local Development

### Backend
```bash
cd backend
npm install
# Create a .env file based on your environment (see server.js for required vars)
npm start
# Server runs on http://localhost:5000
```

### Frontend
The frontend is a static site — just open `frontend/index.html` in a browser, or serve the `frontend/` folder with any static server. When running on `localhost` or `127.0.0.1`, `config.js` automatically points to `http://localhost:5000` for the backend.

## 📦 Sub-Folders

See `frontend/README.md` and `backend/README.md` (if present) for component-specific notes.

## 📝 License

See `frontend/LICENSE`.
