# 🎯 Complete Setup Guide - For Beginners

## What You're Building

A full-stack web application that lets people:
- Register trees with GPS locations
- Track tree health using AI
- Join volunteer tasks (watering, health checks)
- See environmental impact (oxygen, CO₂)
- Compete on leaderboards

---

## Part 1: Run Locally (On Your Computer)

### Step 1: Install Required Software

**1. Node.js** (Required)
- Download: https://nodejs.org/
- Choose LTS version
- Install it
- Verify: Open terminal, type `node --version`

**2. PostgreSQL** (Required - Database)
- Download: https://www.postgresql.org/download/
- Install it
- Remember the password you set!
- Verify: `psql --version`

**3. MongoDB** (Required - Database)
- **Option A:** Local install from https://www.mongodb.com/try/download/community
- **Option B:** Free cloud version at https://www.mongodb.com/cloud/atlas (easier!)

---

### Step 2: Get Your Project Ready

**If you have the code:**
```bash
# Navigate to project folder
cd path/to/greenpulse

# Install all dependencies
npm run install-all
```

**If downloading from GitHub:**
```bash
git clone <your-repo-url>
cd greenpulse
npm run install-all
```

---

### Step 3: Set Up Databases

**PostgreSQL:**
```bash
# Create database
createdb greenpulse

# Or using psql:
psql -U postgres
CREATE DATABASE greenpulse;
\q
```

**MongoDB:**
- If local: Make sure it's running
- If Atlas: Copy your connection string (looks like: `mongodb+srv://user:pass@cluster.mongodb.net/greenpulse`)

---

### Step 4: Configure Environment Variables

**Backend (`backend/.env`):**

Create a file named `.env` in the `backend` folder:

```env
PORT=5000
NODE_ENV=development

# PostgreSQL - USE YOUR ACTUAL PASSWORD
DB_HOST=localhost
DB_PORT=5432
DB_NAME=greenpulse
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE

# MongoDB - Choose one
# Local:
MONGODB_URI=mongodb://localhost:27017/greenpulse
# OR Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/greenpulse

# JWT Secret - Any random string
JWT_SECRET=my_secret_key_12345
JWT_EXPIRE=7d

# Gemini API (Optional - Get from https://aistudio.google.com/)
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
```

**Frontend (`frontend/.env.local`):**

Create a file named `.env.local` in the `frontend` folder:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

### Step 5: Seed Database (Create Sample Data)

```bash
cd backend
node scripts/seed.js
```

You should see: "Seed data created successfully!"

---

### Step 6: Start the Application

```bash
# From project root folder:
npm run dev
```

This starts both backend and frontend.

**Wait for:**
- Backend: "Server running on port 5000"
- Frontend: "Ready on http://localhost:3000"

---

### Step 7: Open in Browser

Go to: **http://localhost:3000**

**Test Login:**
- Email: `volunteer@greenpulse.com`
- Password: `volunteer123`

---

## Part 2: Host Online (Make It Public)

### Free Option (Recommended)

**Backend → Railway** (Free tier)
1. Sign up: https://railway.app/
2. Create project → Deploy from GitHub
3. Add PostgreSQL (Railway does this automatically)
4. Set environment variables (copy from your `.env`)
5. Deploy!

**Frontend → Vercel** (Free forever)
1. Sign up: https://vercel.com/
2. Import from GitHub
3. Set root directory: `frontend`
4. Add environment variable: `NEXT_PUBLIC_API_URL=https://your-railway-url.railway.app/api`
5. Deploy!

**MongoDB → Atlas** (Free forever)
1. Use MongoDB Atlas (already set up if you used it locally)
2. Get connection string
3. Add to Railway environment variables

**Total Cost: $0/month** ✅

---

## Quick Troubleshooting

### "Cannot connect to database"
- Check PostgreSQL is running
- Verify password in `.env` is correct
- Test: `psql -U postgres -d greenpulse`

### "Port already in use"
- Change `PORT=5000` to `PORT=5001` in `backend/.env`
- Update `NEXT_PUBLIC_API_URL` in `frontend/.env.local`

### "Module not found"
```bash
cd backend && rm -rf node_modules && npm install
cd ../frontend && rm -rf node_modules && npm install
```

---

## Files You Need to Edit

1. **`backend/.env`** - Database passwords, API keys
2. **`frontend/.env.local`** - Backend URL (usually no changes)

---

## What Each Part Does

- **Backend** (`backend/`) - API server, database logic
- **Frontend** (`frontend/`) - Website users see
- **PostgreSQL** - Stores users, trees, tasks
- **MongoDB** - Stores photos, AI logs
- **Gemini API** - Analyzes tree health from photos

---

## Need More Help?

- **Detailed local setup:** `LOCAL_SETUP.md`
- **Hosting guide:** `HOSTING_GUIDE.md`
- **Quick checklist:** `SETUP_CHECKLIST.md`
- **Start here:** `START_HERE.md`

---

## Success Indicators

✅ You're ready when:
- Can open http://localhost:3000
- Can login with test account
- Can see map with trees
- Can view tree details
- Backend responds at http://localhost:5000/api/health-check

---

Good luck! 🚀
