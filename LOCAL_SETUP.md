# Local Setup Guide - Step by Step

This guide will help you run everything locally on your computer.

## Prerequisites Checklist

Before starting, make sure you have:

- ✅ **Node.js** (version 18 or higher)
- ✅ **PostgreSQL** database installed
- ✅ **MongoDB** installed (or use MongoDB Atlas free tier)
- ✅ **Git** (to clone/download the project)
- ✅ **A code editor** (VS Code recommended)

---

## Step 1: Install Node.js

### Windows:
1. Go to https://nodejs.org/
2. Download the LTS version (Long Term Support)
3. Run the installer
4. Open Command Prompt and verify:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers.

### Mac:
```bash
# Using Homebrew (if you have it)
brew install node

# Or download from nodejs.org
```

### Linux:
```bash
sudo apt update
sudo apt install nodejs npm
```

---

## Step 2: Install PostgreSQL

### Windows:
1. Download from: https://www.postgresql.org/download/windows/
2. Run the installer
3. Remember the password you set for the `postgres` user
4. PostgreSQL will run as a Windows service automatically

### Mac:
```bash
# Using Homebrew
brew install postgresql@14
brew services start postgresql@14
```

### Linux:
```bash
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Verify PostgreSQL is running:**
```bash
psql --version
```

---

## Step 3: Install MongoDB

### Option A: Local MongoDB (Recommended for beginners)

**Windows:**
1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Run the installer
3. MongoDB will install as a Windows service

**Mac:**
```bash
brew tap mongodb/brew
brew install mongodb-community
brew services start mongodb-community
```

**Linux:**
```bash
sudo apt install mongodb
sudo systemctl start mongodb
```

### Option B: MongoDB Atlas (Cloud - Easier, Free)

1. Go to https://www.mongodb.com/cloud/atlas
2. Sign up for free account
3. Create a free cluster
4. Create a database user
5. Whitelist IP: `0.0.0.0/0` (allows all IPs)
6. Get connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/greenpulse`)

---

## Step 4: Download/Clone the Project

If you have Git:
```bash
git clone <your-repo-url>
cd greenpulse
```

Or download as ZIP and extract it.

---

## Step 5: Install Project Dependencies

Open **Terminal** (Mac/Linux) or **Command Prompt** (Windows) in the project folder:

```bash
# Install root dependencies
npm install

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

This will take a few minutes. Wait for it to finish.

---

## Step 6: Set Up PostgreSQL Database

### Create the Database:

**Windows (using pgAdmin or Command Prompt):**
```bash
# Open Command Prompt
psql -U postgres

# In psql prompt:
CREATE DATABASE greenpulse;
\q
```

**Mac/Linux:**
```bash
createdb greenpulse
```

**Or using psql:**
```bash
psql -U postgres
CREATE DATABASE greenpulse;
\q
```

---

## Step 7: Configure Environment Variables

### Backend Configuration

1. Go to `backend` folder
2. Copy `.env.example` to `.env`:
   - **Windows:** Copy the file and rename it to `.env`
   - **Mac/Linux:** `cp .env.example .env`

3. Open `backend/.env` in a text editor and fill in:

```env
# Server
PORT=5000
NODE_ENV=development

# PostgreSQL (use your PostgreSQL password)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=greenpulse
DB_USER=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD_HERE

# MongoDB (choose one)
# Option 1: Local MongoDB
MONGODB_URI=mongodb://localhost:27017/greenpulse

# Option 2: MongoDB Atlas (if using cloud)
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/greenpulse

# JWT Secret (use any random string)
JWT_SECRET=my_super_secret_key_change_this_in_production_12345
JWT_EXPIRE=7d

# Gemini API (optional - get from https://aistudio.google.com/)
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash

# Cloudinary (optional - for image uploads)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

**Important:** Replace `YOUR_POSTGRES_PASSWORD_HERE` with your actual PostgreSQL password!

### Frontend Configuration

1. Go to `frontend` folder
2. Create `.env.local` file (copy from `.env.local.example` if it exists)
3. Add:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## Step 8: Seed the Database

This creates sample data (users, species, trees):

```bash
cd backend
node scripts/seed.js
```

You should see:
```
PostgreSQL connection established
MongoDB connected
Created 4 species
Admin user created
Botanist user created
Volunteer user created
Created 3 sample trees
Seed data created successfully!
```

---

## Step 9: Start Everything

### Option 1: Run Both Together (Easiest)

From the **root folder** (where `package.json` is):

```bash
npm run dev
```

This starts both backend and frontend automatically.

### Option 2: Run Separately (If Option 1 doesn't work)

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

Wait until you see: `Server running on port 5000`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

Wait until you see: `Ready on http://localhost:3000`

---

## Step 10: Access the Application

Open your web browser and go to:

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health-check

---

## Step 11: Test Login

Try logging in with these test accounts:

1. **Volunteer:**
   - Email: `volunteer@greenpulse.com`
   - Password: `volunteer123`

2. **Admin:**
   - Email: `admin@greenpulse.com`
   - Password: `admin123`

3. **Botanist:**
   - Email: `botanist@greenpulse.com`
   - Password: `botanist123`

---

## Troubleshooting

### "Cannot connect to PostgreSQL"

**Check if PostgreSQL is running:**
- Windows: Check Services (search "Services" in Start menu, look for PostgreSQL)
- Mac/Linux: `sudo systemctl status postgresql` or `brew services list`

**Check your password:**
- Make sure the password in `.env` matches your PostgreSQL password
- Try connecting manually: `psql -U postgres -d greenpulse`

### "Cannot connect to MongoDB"

**If using local MongoDB:**
- Windows: Check Services for MongoDB
- Mac: `brew services list` (should show MongoDB running)
- Linux: `sudo systemctl status mongodb`

**If using MongoDB Atlas:**
- Check your connection string
- Make sure IP is whitelisted (0.0.0.0/0 for testing)
- Check username/password are correct

### "Port 5000 already in use"

Change the port in `backend/.env`:
```env
PORT=5001
```

Then update `frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

### "Module not found" errors

Delete `node_modules` and reinstall:
```bash
# In backend folder
rm -rf node_modules
npm install

# In frontend folder
rm -rf node_modules
npm install
```

### "Database sync error"

Make sure PostgreSQL is running and database exists:
```bash
psql -U postgres -c "SELECT 1 FROM pg_database WHERE datname='greenpulse'"
```

If nothing returns, create the database:
```bash
createdb greenpulse
```

---

## Daily Usage

Once everything is set up:

1. **Start the app:**
   ```bash
   npm run dev
   ```

2. **Stop the app:**
   - Press `Ctrl+C` in the terminal

3. **Reset database (if needed):**
   ```bash
   cd backend
   node scripts/seed.js
   ```

---

## What's Running Where?

- **Frontend (Next.js):** http://localhost:3000 - Your website
- **Backend (Express):** http://localhost:5000 - API server
- **PostgreSQL:** Port 5432 - Main database
- **MongoDB:** Port 27017 - Document storage

---

## Next Steps

Once everything is running locally:
1. Explore the map at http://localhost:3000/map
2. Try registering a new tree
3. Join a task
4. Check the admin dashboard

For hosting/deployment, see `HOSTING_GUIDE.md`
