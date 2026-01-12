# Deployment Guide

## Backend Deployment (Heroku/Railway)

### Prerequisites
- PostgreSQL database (Heroku Postgres or Railway PostgreSQL)
- MongoDB database (MongoDB Atlas recommended)
- Git repository

### Heroku Deployment

1. Install Heroku CLI and login:
```bash
heroku login
```

2. Create Heroku app:
```bash
cd backend
heroku create greenpulse-api
```

3. Add PostgreSQL addon:
```bash
heroku addons:create heroku-postgresql:hobby-dev
```

4. Set environment variables:
```bash
heroku config:set NODE_ENV=production
heroku config:set JWT_SECRET=your_production_secret_key
heroku config:set MONGODB_URI=your_mongodb_atlas_connection_string
```

5. Deploy:
```bash
git push heroku main
```

6. Run migrations and seed:
```bash
heroku run node scripts/seed.js
```

### Railway Deployment

1. Connect GitHub repository to Railway
2. Add PostgreSQL service
3. Set environment variables in Railway dashboard
4. Deploy automatically on push

## Frontend Deployment (Vercel)

### Prerequisites
- Vercel account
- GitHub repository

### Steps

1. Import project to Vercel:
   - Go to vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Select `frontend` as root directory

2. Configure environment variables:
   - `NEXT_PUBLIC_API_URL` - Your backend API URL (e.g., https://greenpulse-api.herokuapp.com/api)

3. Deploy:
   - Vercel will automatically deploy on every push to main branch

## MongoDB Atlas Setup

1. Create account at mongodb.com/cloud/atlas
2. Create new cluster (free tier available)
3. Create database user
4. Whitelist IP addresses (0.0.0.0/0 for development)
5. Get connection string:
   ```
   mongodb+srv://username:password@cluster.mongodb.net/greenpulse
   ```

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
DB_HOST=your_postgres_host
DB_PORT=5432
DB_NAME=greenpulse
DB_USER=your_user
DB_PASSWORD=your_password
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
JWT_EXPIRE=7d
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=https://your-api-url.com/api
```

## Database Migrations

Run migrations after deployment:
```bash
heroku run node scripts/seed.js
```

Or connect to production database and run SQL manually.

## Monitoring

- Set up error tracking (Sentry recommended)
- Monitor API response times
- Set up uptime monitoring
- Configure logging

## Scaling

- Use connection pooling for PostgreSQL
- Enable MongoDB replica sets for production
- Use CDN for static assets
- Implement caching (Redis) for frequently accessed data
- Use load balancer for multiple backend instances

## Security Checklist

- [ ] Use strong JWT secret
- [ ] Enable HTTPS
- [ ] Set secure CORS origins
- [ ] Validate all inputs
- [ ] Use rate limiting
- [ ] Sanitize user inputs
- [ ] Keep dependencies updated
- [ ] Use environment variables for secrets
- [ ] Enable database backups
