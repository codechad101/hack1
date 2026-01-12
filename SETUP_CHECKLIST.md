# ✅ Setup Checklist - Follow This Order

Print this or keep it open while setting up!

## Phase 1: Install Software (One-Time Setup)

- [ ] **Node.js** installed
  - Check: Open terminal, type `node --version`
  - If error: Download from https://nodejs.org/
  
- [ ] **PostgreSQL** installed and running
  - Windows: Check Services (search "Services" in Start menu)
  - Mac: `brew services list` (should show postgresql running)
  - Linux: `sudo systemctl status postgresql`
  
- [ ] **MongoDB** installed OR MongoDB Atlas account created
  - Local: Check Services / `brew services list`
  - Atlas: Go to https://www.mongodb.com/cloud/atlas and create free account

---

## Phase 2: Project Setup (Every Time You Clone/Download)

- [ ] **Downloaded/Cloned project**
  ```bash
  # If using Git:
  git clone <your-repo-url>
  cd greenpulse
  ```

- [ ] **Installed dependencies**
  ```bash
  npm run install-all
  ```
  Wait for it to finish (takes 2-5 minutes)

- [ ] **Created PostgreSQL database**
  ```bash
  createdb greenpulse
  ```
  Or: `psql -U postgres` then `CREATE DATABASE greenpulse;`

---

## Phase 3: Configuration (One-Time Per Project)

- [ ] **Created `backend/.env` file**
  - Copy from `.env.example` if it exists
  - Or create new file named `.env`
  - Add these REQUIRED values:
    ```env
    DB_PASSWORD=your_postgres_password
    MONGODB_URI=mongodb://localhost:27017/greenpulse
    JWT_SECRET=any_random_string_12345
    ```
  - Add OPTIONAL (for AI):
    ```env
    GEMINI_API_KEY=your_key_from_aistudio.google.com
    ```

- [ ] **Created `frontend/.env.local` file**
  - Create new file
  - Add:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:5000/api
    ```

---

## Phase 4: Database Setup (One-Time)

- [ ] **Seeded database**
  ```bash
  cd backend
  node scripts/seed.js
  ```
  Should see: "Seed data created successfully!"

---

## Phase 5: Start Application (Every Time You Work)

- [ ] **Started servers**
  ```bash
  # From project root:
  npm run dev
  ```
  
- [ ] **Verified backend is running**
  - Should see: "Server running on port 5000"
  - Visit: http://localhost:5000/api/health-check
  - Should see: `{"status":"OK"}`

- [ ] **Verified frontend is running**
  - Should see: "Ready on http://localhost:3000"
  - Visit: http://localhost:3000
  - Should see homepage

- [ ] **Tested login**
  - Go to http://localhost:3000/login
  - Email: `volunteer@greenpulse.com`
  - Password: `volunteer123`
  - Should login successfully

---

## Phase 6: Verify Everything Works

- [ ] Can see map at http://localhost:3000/map
- [ ] Can see trees on map
- [ ] Can view tree details
- [ ] Can see tasks
- [ ] Admin dashboard works (login as admin@greenpulse.com / admin123)

---

## 🎯 Quick Reference Commands

```bash
# Install everything
npm run install-all

# Seed database
cd backend && node scripts/seed.js

# Start everything
npm run dev

# Stop everything
# Press Ctrl+C in terminal
```

---

## 🆘 If Something Fails

1. **Check error message** - Read what it says
2. **Check database is running** - PostgreSQL and MongoDB
3. **Check `.env` files** - Make sure passwords are correct
4. **Check ports** - Make sure 3000 and 5000 are not in use
5. **Restart** - Close terminal, reopen, try again

---

## 📞 Need More Help?

- **Detailed setup:** See `LOCAL_SETUP.md`
- **Hosting guide:** See `HOSTING_GUIDE.md`
- **Quick start:** See `START_HERE.md`
