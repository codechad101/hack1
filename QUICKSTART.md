# Quick Start Guide

Get GreenPulse up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- PostgreSQL 14+ installed and running
- MongoDB 6+ installed and running (or use MongoDB Atlas)

## Step 1: Clone and Install

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

## Step 2: Database Setup

### PostgreSQL

```bash
# Create database
createdb greenpulse

# Or using psql:
psql -U postgres
CREATE DATABASE greenpulse;
\q
```

### MongoDB

```bash
# MongoDB should be running locally, or use MongoDB Atlas
# No setup needed if using local MongoDB
```

## Step 3: Configure Environment

### Backend

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=greenpulse
DB_USER=postgres
DB_PASSWORD=your_postgres_password
MONGODB_URI=mongodb://localhost:27017/greenpulse
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRE=7d
```

### Frontend

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Step 4: Seed Database

```bash
cd backend
node scripts/seed.js
```

This creates:
- 4 tree species
- Admin user: admin@greenpulse.com / admin123
- Botanist user: botanist@greenpulse.com / botanist123
- Volunteer user: volunteer@greenpulse.com / volunteer123
- 3 sample trees

## Step 5: Start Servers

### Option A: Run Both Together (Recommended)

From root directory:
```bash
npm run dev
```

### Option B: Run Separately

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

## Step 6: Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health-check

## Test Login

Try logging in with:
- Email: `volunteer@greenpulse.com`
- Password: `volunteer123`

## Next Steps

1. Explore the map at http://localhost:3000/map
2. View tree details
3. Join tasks
4. Check admin dashboard (login as admin@greenpulse.com)

## Troubleshooting

### Database Connection Error

- Ensure PostgreSQL is running: `pg_isready`
- Check credentials in `.env`
- Verify database exists: `psql -l | grep greenpulse`

### MongoDB Connection Error

- Ensure MongoDB is running: `mongosh`
- Check connection string in `.env`
- For MongoDB Atlas, ensure IP is whitelisted

### Port Already in Use

- Change PORT in backend `.env`
- Update NEXT_PUBLIC_API_URL in frontend `.env.local`

### Module Not Found

- Run `npm install` in both backend and frontend directories
- Delete `node_modules` and reinstall if needed

## Development Tips

- Backend uses nodemon for auto-reload
- Frontend uses Next.js hot reload
- Check console for errors
- Use browser DevTools for frontend debugging
- Check backend logs in terminal

## Production Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for production deployment instructions.
