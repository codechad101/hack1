# GreenPulse API Documentation

Base URL: `http://localhost:5000/api` (development) or your production URL

## Authentication

Most endpoints require authentication via JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

---

## Authentication Endpoints

### Register User
**POST** `/auth/register`

Register a new user account.

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

**Response:**
```json
{
  "token": "jwt_token_here",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "volunteer",
    "city": "San Francisco",
    "contributionPoints": 0,
    "badges": []
  }
}
```

### Login
**POST** `/auth/login`

Login and get JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:** Same as register

### Get Profile
**GET** `/auth/profile`

Get current user profile. Requires authentication.

**Response:**
```json
{
  "id": "uuid",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "role": "volunteer",
  "city": "San Francisco",
  "contributionPoints": 50,
  "badges": ["first_plant"]
}
```

---

## Tree Endpoints

### Register Tree
**POST** `/trees/register`

Register a new tree. Requires authentication.

**Request Body:**
```json
{
  "gpsLat": 37.7749,
  "gpsLng": -122.4194,
  "speciesId": "species-uuid",
  "city": "San Francisco",
  "currentHeight": 2.5
}
```

**Response:**
```json
{
  "id": "tree-uuid",
  "gpsLat": "37.7749",
  "gpsLng": "-122.4194",
  "speciesId": "species-uuid",
  "plantedBy": "user-uuid",
  "plantedOn": "2024-01-15T00:00:00.000Z",
  "qrCode": "GP-ABC12345",
  "city": "San Francisco",
  "currentHeight": "2.50",
  "status": "healthy",
  "species": {
    "id": "species-uuid",
    "name": "Oak Tree",
    "scientificName": "Quercus"
  }
}
```

### Get Tree Details
**GET** `/trees/:id`

Get detailed information about a specific tree.

**Response:**
```json
{
  "id": "tree-uuid",
  "gpsLat": "37.7749",
  "gpsLng": "-122.4194",
  "species": {
    "id": "species-uuid",
    "name": "Oak Tree",
    "avgOxygenPerYear": "120.00",
    "avgCO2Absorption": "22.00"
  },
  "planter": {
    "id": "user-uuid",
    "firstName": "John",
    "lastName": "Doe"
  },
  "age": 365
}
```

### Get Trees (with filters)
**GET** `/trees`

Get list of trees with optional filters.

**Query Parameters:**
- `city` - Filter by city
- `speciesId` - Filter by species UUID
- `status` - Filter by status (healthy, needs_water, needs_check, flagged, reviewed)
- `lat` - Latitude for location filter
- `lng` - Longitude for location filter
- `radius` - Radius in km for location filter

**Example:**
```
GET /trees?city=San Francisco&status=needs_water&lat=37.7749&lng=-122.4194&radius=5
```

### Get Species List
**GET** `/trees/species-list`

Get list of all available tree species.

**Response:**
```json
[
  {
    "id": "species-uuid",
    "name": "Oak Tree",
    "scientificName": "Quercus",
    "avgOxygenPerYear": "120.00",
    "avgCO2Absorption": "22.00",
    "wateringFrequency": 14,
    "fertilizerRecommendation": "Use balanced fertilizer in spring and fall",
    "bestFertilizerSeason": ["spring", "fall"]
  }
]
```

### Update Tree
**PATCH** `/trees/:id/update`

Update tree information. Requires authentication.

**Request Body:**
```json
{
  "currentHeight": 3.0
}
```

---

## Task Endpoints

### Create Task
**POST** `/tasks/create`

Create a new task. Requires authentication.

**Request Body:**
```json
{
  "type": "watering",
  "treeId": "tree-uuid",
  "locationLat": 37.7749,
  "locationLng": -122.4194,
  "city": "San Francisco",
  "scheduledDate": "2024-01-20T10:00:00.000Z",
  "description": "Water the oak tree"
}
```

**Task Types:** `watering`, `health_check`, `planting`

### Get Nearby Tasks
**GET** `/tasks/nearby`

Get tasks near a location.

**Query Parameters:**
- `lat` - Latitude (required)
- `lng` - Longitude (required)
- `radius` - Radius in km (default: 10)
- `type` - Filter by type
- `status` - Filter by status

**Example:**
```
GET /tasks/nearby?lat=37.7749&lng=-122.4194&radius=5&type=watering
```

### Join Task
**POST** `/tasks/:id/join`

Join a task. Requires authentication.

**Response:**
```json
{
  "id": "task-uuid",
  "status": "in_progress",
  "assignedTo": "user-uuid",
  "volunteersJoined": ["user-uuid"]
}
```

### Complete Task
**PATCH** `/tasks/:id/complete`

Mark task as completed. Requires authentication.

---

## Health Tracking Endpoints

### Create Health Update
**POST** `/health/trees/:id/health-update`

Create a health log entry for a tree. Requires authentication.

**Request Body:**
```json
{
  "height": 2.5,
  "notes": "Tree looks healthy",
  "photoUrl": "https://example.com/tree-photo.jpg"
}
```

**Response:**
```json
{
  "id": "log-uuid",
  "treeId": "tree-uuid",
  "status": "healthy",
  "height": "2.50",
  "notes": "Tree looks healthy",
  "photoUrl": "https://example.com/tree-photo.jpg",
  "aiAnalysis": {
    "greennessIndex": 0.75,
    "healthScore": 0.85,
    "flags": [],
    "recommendations": "Tree appears healthy. Continue regular care."
  },
  "flaggedForReview": false
}
```

### Upload Photo
**POST** `/health/trees/:id/upload-photo`

Upload photo for AI analysis. Requires authentication.

**Request Body:**
```json
{
  "photoUrl": "https://example.com/tree-photo.jpg"
}
```

### Get Health History
**GET** `/health/trees/:id/health-history`

Get health history for a tree.

**Response:**
```json
[
  {
    "id": "log-uuid",
    "treeId": "tree-uuid",
    "status": "healthy",
    "height": "2.50",
    "createdAt": "2024-01-15T00:00:00.000Z",
    "aiAnalysis": {
      "greennessIndex": 0.75,
      "healthScore": 0.85
    }
  }
]
```

### Get Flagged Trees
**GET** `/health/flagged`

Get trees flagged for botanist review. Requires botanist/admin role.

### Submit Review
**PATCH** `/health/:id/review`

Submit botanist review. Requires botanist/admin role.

**Request Body:**
```json
{
  "decision": "healthy",
  "notes": "Tree is in good condition",
  "recommendations": "Continue regular care"
}
```

**Decisions:** `healthy`, `needs_care`, `needs_treatment`, `critical`

---

## Impact Endpoints

### Get City Impact
**GET** `/impact/city`

Get environmental impact metrics for a city.

**Query Parameters:**
- `city` - City name (required)

**Response:**
```json
{
  "city": "San Francisco",
  "totalTrees": 150,
  "totalOxygen": 18000.50,
  "totalCO2Absorption": 3300.75,
  "speciesBreakdown": {
    "Oak Tree": {
      "count": 50,
      "oxygen": 6000.00,
      "co2": 1100.00
    }
  }
}
```

### Get Tree Impact
**GET** `/impact/tree/:id`

Get environmental impact for a specific tree.

**Response:**
```json
{
  "treeId": "tree-uuid",
  "species": "Oak Tree",
  "age": {
    "days": 365,
    "years": 1.0
  },
  "oxygenProduced": "120.00",
  "co2Absorbed": "22.00",
  "annualOxygen": "120.00",
  "annualCO2": "22.00"
}
```

---

## Reports Endpoints

### Generate PDF Report
**GET** `/reports/pdf`

Generate PDF impact report. Requires admin/organizer role.

**Query Parameters:**
- `city` - Filter by city (optional)
- `startDate` - Start date (ISO 8601, optional)
- `endDate` - End date (ISO 8601, optional)

**Response:** PDF file download

---

## Admin Endpoints

### Get Dashboard Data
**GET** `/admin/dashboard`

Get admin dashboard statistics. Requires admin role.

**Response:**
```json
{
  "overview": {
    "totalUsers": 100,
    "totalTrees": 500,
    "totalTasks": 200,
    "flaggedTrees": 5
  },
  "usersByRole": [
    {
      "role": "volunteer",
      "count": 80
    }
  ],
  "treesByStatus": [
    {
      "status": "healthy",
      "count": 450
    }
  ]
}
```

### Get All Users
**GET** `/admin/users`

Get list of all users. Requires admin role.

---

## Error Responses

All endpoints may return error responses:

**400 Bad Request:**
```json
{
  "message": "Validation error",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

**401 Unauthorized:**
```json
{
  "message": "No token, authorization denied"
}
```

**403 Forbidden:**
```json
{
  "message": "Access denied"
}
```

**404 Not Found:**
```json
{
  "message": "Tree not found"
}
```

**500 Internal Server Error:**
```json
{
  "message": "Server error",
  "error": "Error details"
}
```

---

## Rate Limiting

Currently no rate limiting implemented. Recommended for production:
- 100 requests per minute per IP
- 1000 requests per hour per authenticated user

---

## Pagination

List endpoints may support pagination in future:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 20)
