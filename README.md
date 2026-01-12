# GreenPulse - Tree Tracking & Care Application

A full-stack web application to track, care for, and verify trees after plantation using community contributions and AI guidance.

## Features

- 🌳 **Tree Registration & Digital Passport** - Register trees with GPS location and QR codes
- 🗺️ **Interactive Map Dashboard** - View trees and tasks on an interactive map
- 🤝 **Volunteer Tasks** - Join watering, health check, and planting tasks
- 💧 **Watering Guidance** - Get personalized watering reminders and best practices
- 🤖 **AI Health Tracking** - Monitor tree health with AI-powered analysis
- 👨‍🔬 **Botanist Reviews** - Expert review system for flagged trees
- 📊 **Environmental Impact Metrics** - Track oxygen production and CO₂ absorption
- 🏆 **Community Leaderboards** - Gamification with badges and contribution points
- 👥 **Admin & CSR Dashboards** - Management tools and impact reports

## Tech Stack

### Frontend
- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Leaflet** - Interactive maps
- **Recharts** - Data visualization
- **React Hot Toast** - Notifications

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **PostgreSQL** - Primary database (via Sequelize ORM)
- **MongoDB** - Document storage for photos and AI logs
- **JWT** - Authentication
- **Cloudinary** - Image storage (optional)
- **Node-cron** - Scheduled tasks

### AI/ML
- **Python + OpenCV** - Image analysis (simulated in current implementation)
- Health score calculation based on greenness index

## Project Structure

```
greenpulse/
├── backend/
│   ├── config/
│   │   └── database.js          # PostgreSQL connection
│   ├── models/                  # Sequelize models
│   │   ├── User.js
│   │   ├── Tree.js
│   │   ├── Species.js
│   │   ├── Task.js
│   │   ├── HealthLog.js
│   │   ├── BotanistReview.js
│   │   └── index.js            # Model associations
│   ├── routes/                  # API routes
│   │   ├── auth.js
│   │   ├── trees.js
│   │   ├── tasks.js
│   │   ├── health.js
│   │   ├── impact.js
│   │   ├── reports.js
│   │   └── admin.js
│   ├── middleware/
│   │   └── auth.js              # JWT authentication
│   ├── services/
│   │   ├── aiHealthService.js  # AI health analysis
│   │   └── scheduler.js         # Cron jobs
│   ├── utils/
│   │   └── wateringGuidance.js  # Watering logic
│   ├── scripts/
│   │   └── seed.js              # Database seeding
│   └── server.js                # Express server
├── frontend/
│   ├── app/                     # Next.js app directory
│   │   ├── page.tsx            # Home page
│   │   ├── login/
│   │   ├── register/
│   │   ├── map/                 # Map dashboard
│   │   ├── trees/[id]/         # Tree detail page
│   │   ├── tasks/
│   │   ├── community/
│   │   ├── profile/
│   │   ├── admin/
│   │   └── botanist/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── MapComponent.tsx
│   └── lib/
│       └── api.ts               # API client
└── README.md
```

## Installation

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL 14+
- MongoDB 6+
- (Optional) Python 3.8+ for AI service

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

4. Update `.env` with your database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=greenpulse
DB_USER=postgres
DB_PASSWORD=your_password

MONGODB_URI=mongodb://localhost:27017/greenpulse
JWT_SECRET=your_super_secret_jwt_key
```

5. Create PostgreSQL database:
```sql
CREATE DATABASE greenpulse;
```

6. Start MongoDB service

7. Run database migrations and seed:
```bash
node scripts/seed.js
```

8. Start the server:
```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file:
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### Running Both Together

From the root directory:
```bash
npm run dev
```

This uses `concurrently` to run both frontend and backend.

## API Documentation

### Authentication

#### POST /api/auth/register
Register a new user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "city": "San Francisco",
  "role": "volunteer"
}
```

#### POST /api/auth/login
Login user.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### GET /api/auth/profile
Get current user profile (requires authentication).

### Tree Management

#### POST /api/trees/register
Register a new tree (requires authentication).

**Request Body:**
```json
{
  "gpsLat": 37.7749,
  "gpsLng": -122.4194,
  "speciesId": "uuid",
  "city": "San Francisco",
  "currentHeight": 2.5
}
```

#### GET /api/trees/:id
Get tree details.

#### GET /api/trees
Get trees with optional filters:
- `city` - Filter by city
- `speciesId` - Filter by species
- `status` - Filter by status
- `lat`, `lng`, `radius` - Filter by location

#### GET /api/trees/species-list
Get list of all species.

### Tasks

#### POST /api/tasks/create
Create a new task (requires authentication).

#### GET /api/tasks/nearby
Get nearby tasks:
- `lat`, `lng` - User location (required)
- `radius` - Search radius in km (default: 10)
- `type` - Filter by task type
- `status` - Filter by status

#### POST /api/tasks/:id/join
Join a task (requires authentication).

#### PATCH /api/tasks/:id/complete
Complete a task (requires authentication).

### Health Tracking

#### POST /api/health/trees/:id/health-update
Create health log entry (requires authentication).

**Request Body:**
```json
{
  "height": 2.5,
  "notes": "Tree looks healthy",
  "photoUrl": "https://..."
}
```

#### GET /api/health/trees/:id/health-history
Get health history for a tree.

#### GET /api/health/flagged
Get trees flagged for review (requires botanist/admin role).

#### PATCH /api/health/:id/review
Submit botanist review (requires botanist/admin role).

### Impact Metrics

#### GET /api/impact/city?city=San Francisco
Get environmental impact metrics for a city.

#### GET /api/impact/tree/:id
Get environmental impact for a specific tree.

### Reports

#### GET /api/reports/pdf
Generate PDF report (requires admin/organizer role).

### Admin

#### GET /api/admin/dashboard
Get admin dashboard data (requires admin role).

#### GET /api/admin/users
Get all users (requires admin role).

## Database Schema

### PostgreSQL Tables

**Users**
- id (UUID)
- email (unique)
- password (hashed)
- firstName, lastName
- role (volunteer, organizer, botanist, admin)
- city
- contributionPoints
- badges (array)
- avatar

**Species**
- id (UUID)
- name (unique)
- scientificName
- avgOxygenPerYear (kg)
- avgCO2Absorption (kg)
- wateringFrequency (days)
- fertilizerRecommendation
- bestFertilizerSeason (array)

**Trees**
- id (UUID)
- gpsLat, gpsLng
- speciesId (FK)
- plantedBy (FK to Users)
- plantedOn
- qrCode (unique)
- lastWatered, lastHealthCheck
- currentHeight (meters)
- city
- status (healthy, needs_water, needs_check, flagged, reviewed)
- aiHealthScore (0-1)

**Tasks**
- id (UUID)
- type (watering, health_check, planting)
- treeId (FK, nullable)
- locationLat, locationLng
- city
- status (open, in_progress, completed, cancelled)
- assignedTo (FK to Users)
- volunteersJoined (array of UUIDs)
- scheduledDate, completedAt

**HealthLogs**
- id (UUID)
- treeId (FK)
- status
- height
- notes
- photoUrl
- aiAnalysis (JSONB)
- flaggedForReview
- reviewedBy (FK to Users)
- reviewedAt

**BotanistReviews**
- id (UUID)
- healthLogId (FK)
- botanistId (FK to Users)
- decision
- notes
- recommendations

### MongoDB Collections

- **photos** - Tree photos with metadata
- **ai_logs** - AI analysis results and history

## Watering Guidance Logic

- **Newly planted trees** (< 1 year): Water every 7 days
- **Established trees**: Water based on species frequency (default: 14 days)
- **Best time**: Early morning (before 10 AM)
- **Method**: Deep soak for new trees, deep watering for established

## Fertilizer Guidance

- Best seasons: Spring and Fall (configurable per species)
- Recommendations shown based on current season
- Species-specific fertilizer needs displayed

## AI Health Analysis

Current implementation simulates AI analysis:
- Calculates greenness index (0-1)
- Determines health score
- Flags trees for review if score < 0.6
- Stores analysis results in JSONB format

**To implement real AI:**
1. Create Python service with OpenCV
2. Calculate actual green pixel ratio
3. Compare with previous photos for growth
4. Detect stress indicators
5. Update `backend/services/aiHealthService.js` to call Python service

## Scheduled Tasks

- **Daily at 6 AM**: Check trees needing water, create watering tasks
- **Weekly on Monday at 8 AM**: Check trees needing health checks, create tasks

## User Roles

- **volunteer** - Can join tasks, update tree health, view maps
- **organizer** - Can create tasks, view reports
- **botanist** - Can review flagged trees, provide expert guidance
- **admin** - Full access to all features and admin dashboard

## Deployment

### Backend (Heroku/Railway)

1. Set environment variables in hosting platform
2. Ensure PostgreSQL and MongoDB are configured
3. Deploy:
```bash
git push heroku main
```

### Frontend (Vercel)

1. Connect GitHub repository
2. Set environment variables:
   - `NEXT_PUBLIC_API_URL` - Your backend API URL
3. Deploy automatically on push

### Database Setup

**PostgreSQL (Heroku/Railway):**
- Use managed PostgreSQL service
- Run migrations on deploy

**MongoDB (MongoDB Atlas):**
- Create cluster
- Whitelist IP addresses
- Get connection string

## Testing

Run backend tests:
```bash
cd backend
npm test
```

## Sample Data

Seed script creates:
- 4 tree species (Oak, Maple, Pine, Birch)
- Admin user (admin@greenpulse.com / admin123)
- Botanist user (botanist@greenpulse.com / botanist123)
- Volunteer user (volunteer@greenpulse.com / volunteer123)
- 3 sample trees in San Francisco

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License

## Support

For issues and questions, please open an issue on GitHub.
