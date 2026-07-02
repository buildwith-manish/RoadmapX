# RoadmapX 🚀

RoadmapX is a learning roadmap platform that helps developers and students follow structured roadmaps for various technologies (DSA, AI, Frontend, Backend, etc.) with progress tracking, AI-powered custom roadmaps, leaderboards, reminders, and social sharing.

This is the unified monorepo combining both the **frontend** and **backend** codebases.

## 📁 Repository Structure

```
RoadmapX/
├── frontend/   # Static HTML/CSS/JS frontend (deployed on Vercel)
└── backend/    # Node.js + Express + MongoDB backend (deployed on Render)
```

## 🌐 Live Deployment

- **Frontend:** `https://<your-project>.vercel.app` (Vercel)
- **Backend:** `https://<your-service>.onrender.com` (Render)

## 🛠️ Tech Stack

### Frontend
- Vanilla HTML5, CSS3, JavaScript (ES6+)
- Capacitor 6 (Android app wrapper)
- Google OAuth (Capacitor plugin)
- Hosted on Vercel (static site)

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

## 🚀 Deployment

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project** → import this repo
2. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Other
   - **Build Command:** *(leave empty — it's a static site)*
   - **Output Directory:** `.` (single dot)
   - **Environment Variables:** none required — `config.js` auto-detects the backend URL from the hostname
3. Click **Deploy**
4. After deploy, copy your Vercel URL (e.g. `https://roadmap-x.vercel.app`) — you'll need it for the backend CORS and Google OAuth Console

`frontend/vercel.json` is already configured with clean URLs and proper cache headers.

### Backend → Render

1. Go to [dashboard.render.com](https://dashboard.render.com) → **New +** → **Web Service**
2. Connect this repo
3. Configure:
   - **Root Directory:** `backend`
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
4. **Environment variables** (all required in production):

| Variable | Example value | Notes |
|---|---|---|
| `MONGO_URI` | `mongodb+srv://...` | MongoDB Atlas connection string |
| `SESSION_SECRET` | (random 32+ char string) | **REQUIRED in production** — server refuses to start without it |
| `RENDER` | `true` | Auto-set by Render; used to detect prod |
| `APP_URL` | `https://roadmap-x.vercel.app` | Your Vercel frontend URL — used in email links |
| `BACKEND_URL` | `https://your-service.onrender.com` | Your Render backend URL — used in Google OAuth redirect |
| `CORS_ORIGINS` | `https://roadmap-x.vercel.app` | Comma-separated list of **additional** allowed frontend origins. The baseline allowlist (localhost, capacitor, etc.) is hardcoded in `server.js`. Add your Vercel URL(s) here. |
| `SMTP_USER` | `you@gmail.com` | Gmail address for sending emails |
| `SMTP_PASS` | (16-char App Password) | Gmail App Password, NOT your account password — see [Google App Passwords](https://support.google.com/accounts/answer/185833) |
| `MAIL_FROM` | `RoadmapX <you@gmail.com>` | Sender display name + address |
| `GOOGLE_CLIENT_ID` | `xxxxx.apps.googleusercontent.com` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | (secret) | Google OAuth client secret |
| `ANTHROPIC_API_KEY` | (optional) | Only needed if you want the AI Mentor feature to work |

5. Click **Create Web Service** → wait for build to finish
6. Verify: visit `https://your-service.onrender.com/me` → should return `{"success":false,"message":"Not logged in."}`

### Google OAuth Console (one-time)

1. Go to [console.cloud.google.com](https://console.cloud.google.com) → APIs & Services → Credentials
2. Edit your OAuth 2.0 Client ID
3. **Authorized JavaScript origins:**
   ```
   https://roadmap-x.vercel.app
   https://your-service.onrender.com
   http://localhost:5500
   ```
4. **Authorized redirect URIs:**
   ```
   https://your-service.onrender.com/auth/google/callback
   http://localhost:5000/auth/google/callback
   ```

## 🧑‍💻 Local Development

### Backend
```bash
cd backend
npm install
# Create a .env file with: MONGO_URI, SESSION_SECRET, SMTP_USER, SMTP_PASS,
# MAIL_FROM, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET (optional: ANTHROPIC_API_KEY)
npm start
# Server runs on http://localhost:5000
```

### Frontend
The frontend is a static site — serve the `frontend/` folder with any static server. When the hostname is `localhost` or `127.0.0.1`, `config.js` automatically points to `http://localhost:5000` for the backend.

```bash
cd frontend
# Using Python:
python3 -m http.server 5500
# Or using Node's http-server:
npx http-server -p 5500
# Then open http://localhost:5500
```

## 📝 License

See `frontend/LICENSE`.
