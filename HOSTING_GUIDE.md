# How to Host Your GreenPulse Website

This guide shows you how to put your website online so others can access it.

## Overview

You need to host:
1. **Backend API** (Node.js server)
2. **Frontend** (Next.js website)
3. **Databases** (PostgreSQL + MongoDB)

---

## Option 1: Free Hosting (Best for Beginners)

### Backend: Railway or Render (Free Tier)

#### Railway (Recommended - Easiest)

1. **Sign up:** Go to https://railway.app/
2. **Create new project**
3. **Add PostgreSQL:**
   - Click "New" → "Database" → "PostgreSQL"
   - Railway will create it automatically
4. **Deploy backend:**
   - Click "New" → "GitHub Repo"
   - Select your repository
   - Set root directory to `backend`
   - Railway will auto-detect Node.js
5. **Set environment variables:**
   - Go to your backend service → "Variables"
   - Add all variables from `backend/.env`:
     ```
     NODE_ENV=production
     DB_HOST=<railway-provided-host>
     DB_PORT=5432
     DB_NAME=railway
     DB_USER=postgres
     DB_PASSWORD=<railway-provided-password>
     MONGODB_URI=<your-mongodb-atlas-uri>
     JWT_SECRET=<random-secret-string>
     GEMINI_API_KEY=<your-key>
     ```
   - Railway provides DB credentials automatically
6. **Deploy:**
   - Railway will build and deploy automatically
   - You'll get a URL like: `https://your-app.railway.app`

#### Render (Alternative)

1. **Sign up:** https://render.com/
2. **Create Web Service:**
   - Connect GitHub repo
   - Root directory: `backend`
   - Build command: `npm install`
   - Start command: `npm start`
3. **Add PostgreSQL:**
   - Create PostgreSQL database
   - Render provides connection string automatically
4. **Set environment variables** (same as Railway)

### Frontend: Vercel (Free & Best for Next.js)

1. **Sign up:** Go to https://vercel.com/
2. **Import project:**
   - Click "Add New" → "Project"
   - Import from GitHub
   - Select your repository
3. **Configure:**
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `frontend`
   - Build Command: `npm run build` (default)
   - Output Directory: `.next` (default)
4. **Environment variables:**
   - Add: `NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api`
   - Replace with your actual backend URL
5. **Deploy:**
   - Click "Deploy"
   - Vercel will build and deploy
   - You'll get a URL like: `https://your-app.vercel.app`

### MongoDB: MongoDB Atlas (Free Forever)

1. **Sign up:** https://www.mongodb.com/cloud/atlas
2. **Create free cluster** (M0 - Free tier)
3. **Create database user:**
   - Username and password
   - Save these!
4. **Whitelist IP:**
   - Add `0.0.0.0/0` (allows all IPs - OK for testing)
   - For production, add specific IPs
5. **Get connection string:**
   - Click "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your password
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/greenpulse`

---

## Option 2: All-in-One Hosting (Paid)

### Heroku (Easiest but Paid)

**Backend:**
1. Install Heroku CLI: https://devcenter.heroku.com/articles/heroku-cli
2. Login: `heroku login`
3. Create app: `heroku create greenpulse-api`
4. Add PostgreSQL: `heroku addons:create heroku-postgresql:hobby-dev`
5. Set config: `heroku config:set JWT_SECRET=your_secret`
6. Deploy: `git push heroku main`

**Frontend:**
- Deploy to Vercel (same as above) - it's free and better for Next.js

---

## Step-by-Step: Complete Deployment

### Step 1: Prepare Your Code

Make sure your code is on GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/greenpulse.git
git push -u origin main
```

### Step 2: Deploy Backend (Railway)

1. Go to https://railway.app/
2. Click "New Project" → "Deploy from GitHub"
3. Select your repository
4. Railway will detect Node.js
5. Set root directory to `backend` in settings
6. Add environment variables (see above)
7. Railway will deploy automatically
8. Copy your backend URL (e.g., `https://greenpulse-api.railway.app`)

### Step 3: Deploy Frontend (Vercel)

1. Go to https://vercel.com/
2. Click "Add New" → "Project"
3. Import from GitHub
4. Set root directory to `frontend`
5. Add environment variable:
   - Key: `NEXT_PUBLIC_API_URL`
   - Value: `https://your-backend-url.railway.app/api`
6. Click "Deploy"
7. Copy your frontend URL (e.g., `https://greenpulse.vercel.app`)

### Step 4: Run Database Migrations

After backend is deployed, run seed script:

**Railway:**
- Go to your backend service → "Deployments" → Click on latest deployment → "View Logs"
- Or use Railway CLI: `railway run node scripts/seed.js`

**Or connect via SSH and run:**
```bash
# Get connection details from Railway dashboard
psql -h <host> -U <user> -d <database>
# Then run SQL from seed script
```

### Step 5: Update CORS (If Needed)

If you get CORS errors, update `backend/server.js`:

```javascript
app.use(cors({
  origin: ['http://localhost:3000', 'https://your-frontend-url.vercel.app'],
  credentials: true
}));
```

---

## Environment Variables Checklist

### Backend (Railway/Render)

```env
NODE_ENV=production
PORT=5000
DB_HOST=<provided-by-hosting>
DB_PORT=5432
DB_NAME=<provided-by-hosting>
DB_USER=<provided-by-hosting>
DB_PASSWORD=<provided-by-hosting>
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/greenpulse
JWT_SECRET=<random-long-string>
JWT_EXPIRE=7d
GEMINI_API_KEY=<your-gemini-key>
CLOUDINARY_CLOUD_NAME=<optional>
CLOUDINARY_API_KEY=<optional>
CLOUDINARY_API_SECRET=<optional>
```

### Frontend (Vercel)

```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api
```

---

## Testing Your Deployment

1. **Test backend:**
   - Visit: `https://your-backend-url.railway.app/api/health-check`
   - Should return: `{"status":"OK","message":"GreenPulse API is running"}`

2. **Test frontend:**
   - Visit: `https://your-frontend-url.vercel.app`
   - Should load the homepage

3. **Test login:**
   - Try logging in with test accounts
   - If it fails, check browser console for errors

---

## Custom Domain (Optional)

### Vercel (Frontend)

1. Go to your project → "Settings" → "Domains"
2. Add your domain (e.g., `greenpulse.com`)
3. Follow DNS instructions
4. Vercel will handle SSL automatically

### Railway (Backend)

1. Go to your service → "Settings" → "Networking"
2. Add custom domain
3. Update DNS records as instructed

---

## Monitoring & Maintenance

### Check Logs

**Railway:**
- Go to your service → "Deployments" → View logs

**Vercel:**
- Go to your project → "Deployments" → Click deployment → View logs

### Update Your Site

1. Make changes locally
2. Commit and push to GitHub:
   ```bash
   git add .
   git commit -m "Update feature"
   git push
   ```
3. Railway and Vercel will auto-deploy

### Database Backups

**PostgreSQL (Railway):**
- Railway handles backups automatically
- Can download backups from dashboard

**MongoDB Atlas:**
- Free tier includes backups
- Can enable automated backups in settings

---

## Cost Breakdown

### Free Tier (Recommended)

- **Railway:** Free tier (500 hours/month) - enough for testing
- **Vercel:** Free forever (generous limits)
- **MongoDB Atlas:** Free forever (512MB storage)
- **Total:** $0/month

### Paid Tier (If you need more)

- **Railway:** $5/month (more hours)
- **Vercel:** Still free (unless you need more)
- **MongoDB Atlas:** Free tier usually enough
- **Total:** ~$5/month

---

## Troubleshooting Deployment

### "Build failed"

**Check:**
- Node.js version (should be 18+)
- All dependencies in `package.json`
- Build logs for specific errors

### "Cannot connect to database"

**Check:**
- Database credentials are correct
- Database is running (Railway shows status)
- IP whitelist (for MongoDB Atlas)

### "CORS error"

**Fix:**
- Update CORS settings in `backend/server.js`
- Add your frontend URL to allowed origins

### "Environment variables not working"

**Check:**
- Variables are set in hosting dashboard
- Names match exactly (case-sensitive)
- Restart/redeploy after adding variables

---

## Quick Reference

| Service | What It Hosts | Cost | URL |
|---------|--------------|------|-----|
| Railway | Backend API | Free tier | railway.app |
| Vercel | Frontend | Free | vercel.com |
| MongoDB Atlas | MongoDB | Free | mongodb.com/cloud/atlas |

---

## Next Steps After Deployment

1. ✅ Test all features
2. ✅ Set up monitoring (optional)
3. ✅ Configure custom domain (optional)
4. ✅ Set up automated backups
5. ✅ Share your website URL!

---

## Need Help?

- Railway docs: https://docs.railway.app/
- Vercel docs: https://vercel.com/docs
- MongoDB Atlas docs: https://docs.atlas.mongodb.com/
