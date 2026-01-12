# 🚀 START HERE - Quick Setup Guide

**Welcome!** This guide will get you running in 15 minutes.

## 📋 What You Need First

1. **Node.js** - Download from https://nodejs.org/ (get LTS version)
2. **PostgreSQL** - Download from https://www.postgresql.org/download/
3. **MongoDB** - Download from https://www.mongodb.com/try/download/community OR use free cloud version at https://www.mongodb.com/cloud/atlas

---

## ⚡ Quick Start (3 Steps)

### Step 1: Install Everything

```bash
# Install all dependencies
npm run install-all
```

This installs everything for backend and frontend.

### Step 2: Set Up Databases

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
- If installed locally: Make sure it's running
- If using Atlas: Get connection string from MongoDB Atlas dashboard

### Step 3: Configure & Run

1. **Copy environment files:**
   ```bash
   # Backend
   cd backend
   cp .env.example .env
   # Edit .env and add your database passwords
   
   # Frontend  
   cd ../frontend
   cp .env.local.example .env.local
   # Edit .env.local (usually no changes needed)
   ```

2. **Seed database:**
   ```bash
   cd ../backend
   node scripts/seed.js
   ```

3. **Start everything:**
   ```bash
   cd ..
   npm run dev
   ```

4. **Open browser:**
   - Go to: http://localhost:3000
   - Login with: `volunteer@greenpulse.com` / `volunteer123`

---

## 🎯 What to Edit in `.env` Files

### `backend/.env` - REQUIRED:

```env
DB_PASSWORD=your_postgres_password_here
MONGODB_URI=mongodb://localhost:27017/greenpulse
JWT_SECRET=any_random_string_here
```

### `backend/.env` - OPTIONAL (for AI):

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

**To get Gemini API key:**
1. Go to https://aistudio.google.com/
2. Click "Get API Key"
3. Create new key
4. Copy and paste into `.env`

### `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

(Usually no changes needed)

---

## 🐛 Common Problems

### "Cannot connect to database"
- Make sure PostgreSQL is running
- Check password in `.env` matches your PostgreSQL password
- Verify database exists: `psql -U postgres -d greenpulse`

### "Port already in use"
- Change `PORT=5000` to `PORT=5001` in `backend/.env`
- Update `NEXT_PUBLIC_API_URL=http://localhost:5001/api` in `frontend/.env.local`

### "Module not found"
```bash
# Delete and reinstall
cd backend
rm -rf node_modules
npm install

cd ../frontend
rm -rf node_modules
npm install
```

---

## 📚 More Help

- **Detailed local setup:** See `LOCAL_SETUP.md`
- **How to host online:** See `HOSTING_GUIDE.md`
- **API documentation:** See `API_DOCUMENTATION.md`

---

## ✅ Success Checklist

- [ ] Node.js installed (`node --version` works)
- [ ] PostgreSQL installed and running
- [ ] MongoDB installed/running OR Atlas account created
- [ ] Database `greenpulse` created
- [ ] `.env` files configured
- [ ] `npm run install-all` completed
- [ ] `node scripts/seed.js` completed successfully
- [ ] `npm run dev` starts without errors
- [ ] http://localhost:3000 opens in browser
- [ ] Can login with test account

---

## 🎉 You're Done!

Once you see the website at http://localhost:3000, you're ready to go!

**Next steps:**
1. Explore the map
2. Try registering a tree
3. Join a task
4. Check out the admin dashboard

**To host online:** See `HOSTING_GUIDE.md`
