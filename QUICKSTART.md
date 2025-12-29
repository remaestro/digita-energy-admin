# Quick Start Guide - Agent 1 Work

## ✅ What's Been Completed

Agent 1 (Fullstack Developer) has completed the foundational work for both the backend API and frontend dashboard.

### Backend API
- Complete Express.js + TypeScript server
- Prisma database schema (Users, Projects, Templates, Deployments)
- 13 REST API endpoints with authentication
- Swagger documentation
- All middleware (auth, validation, error handling)

### Frontend Dashboard
- React 18 + TypeScript + Vite setup
- Authentication pages (Login/Register)
- Basic dashboard layout
- API service layer
- State management with Zustand
- Tailwind CSS styling

## 🚀 How to Get Started

### 1. Install Dependencies

```bash
# From project root
cd /Users/adioyeremi/digita_energy_admin

# Install all workspace dependencies
pnpm install
```

### 2. Set Up Backend

```bash
cd apps/api

# Configure environment
cp .env.example .env
# Edit .env:
# - Set DATABASE_URL to your PostgreSQL connection
# - Add Supabase credentials
# - Set a strong JWT_SECRET (min 32 characters)

# Generate Prisma Client
pnpm db:generate

# Run database migrations (requires PostgreSQL running)
pnpm db:migrate

# Seed the database with templates
pnpm db:seed

# Start the backend server
pnpm dev
```

Backend will run at: **http://localhost:3001**
API Docs: **http://localhost:3001/api/docs**

### 3. Set Up Frontend

```bash
# In a new terminal
cd apps/web

# Configure environment
cp .env.example .env
# Defaults should work if backend is on localhost:3001

# Start the frontend server
pnpm dev
```

Frontend will run at: **http://localhost:5173**

### 4. Test the Application

1. Open http://localhost:5173
2. Click "Sign up" to create an account
3. Register with email/password
4. You'll be redirected to the dashboard

## 🔑 API Endpoints

### Public Endpoints
- `POST /api/auth/register` - Create account
- `POST /api/auth/login` - Sign in
- `GET /api/templates` - Browse templates

### Protected Endpoints (require Bearer token)
- `GET /api/auth/me` - Get current user
- `GET /api/projects` - List your projects
- `POST /api/projects` - Create new project
- `GET /api/projects/:id` - Get project details
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project
- `POST /api/projects/:id/generate` - Generate project files
- `GET /api/projects/:projectId/deployments` - List deployments
- `POST /api/projects/:projectId/deployments` - Deploy project

## 📁 Key Files to Know

### Backend
```
apps/api/
├── prisma/schema.prisma          # Database schema
├── src/
│   ├── server.ts                 # Main server file
│   ├── config/                   # Configuration files
│   ├── controllers/              # Route controllers
│   ├── middleware/               # Auth, validation, errors
│   ├── routes/                   # API routes
│   └── services/                 # Business logic (to be added)
└── .env                          # Environment variables
```

### Frontend
```
apps/web/
├── src/
│   ├── App.tsx                   # Main app with routing
│   ├── pages/                    # Page components
│   ├── services/                 # API calls
│   ├── stores/                   # Zustand state
│   ├── types/                    # TypeScript types
│   └── lib/                      # Utilities
└── .env                          # Environment variables
```

## 🗄️ Database Schema

**Users**
- id, email, name, createdAt, updatedAt

**Templates** (Seeded with 4 templates)
- id, name, slug, description, type, icon, category, variables, metadata, isActive

**Projects**
- id, name, slug, description, templateId, userId, status, config, repoUrl

**Deployments**
- id, projectId, environment, status, buildUrl, deploymentUrl, logs, triggeredBy

## 🧪 Testing the API

### Using Swagger UI
1. Go to http://localhost:3001/api/docs
2. Try the `/api/auth/register` endpoint
3. Copy the returned `token`
4. Click "Authorize" button at top
5. Enter: `Bearer YOUR_TOKEN_HERE`
6. Now you can test protected endpoints

### Using curl

```bash
# Register
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Get templates (no auth required)
curl http://localhost:3001/api/templates

# Get projects (with auth)
curl http://localhost:3001/api/projects \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## 🐛 Troubleshooting

### Backend won't start
- **Check DATABASE_URL**: Make sure PostgreSQL is running
- **Check environment**: Ensure all required vars in `.env`
- **Check ports**: Port 3001 should be available

### Frontend won't start
- **Check API URL**: Should point to http://localhost:3001/api
- **Check ports**: Port 5173 should be available

### Can't login
- **Check backend logs**: Look for authentication errors
- **Check Supabase**: Ensure credentials are correct
- **Check database**: User should exist in database

### CORS errors
- **Check CORS_ORIGIN**: Should match frontend URL (http://localhost:5173)
- **Check headers**: Authorization header should have `Bearer` prefix

## 📦 Available Templates

After running `pnpm db:seed`, these templates are available:

1. **Full-Stack Web App** (`fullstack-web-app`)
   - React + Express + PostgreSQL + Prisma

2. **Landing Page** (`landing-page`)
   - React + Tailwind CSS + SEO

3. **Mobile App** (`mobile-app`)
   - React Native + Expo + Supabase

4. **API Service** (`api-service`)
   - Express + Prisma + PostgreSQL + Swagger

## 🎯 What's Next?

### For Agent 1 (Week 3)
- [ ] Build project management UI (list, create, edit)
- [ ] Create template browser
- [ ] Add deployment interface
- [ ] Implement actual project generation
- [ ] Add shadcn/ui components

### For Agent 4 (QA)
- [ ] Can start writing E2E tests now
- [ ] Test authentication flows
- [ ] Test API endpoints
- [ ] Test UI interactions

### For Agent 2 (DevOps)
- [ ] Both apps are ready for CI/CD setup
- [ ] Environment configs are in place
- [ ] Can add deployment pipelines

## 📞 Need Help?

- **Backend issues**: Check `apps/api/README.md`
- **Frontend issues**: Check `apps/web/README.md`
- **API docs**: http://localhost:3001/api/docs
- **Project status**: See `AGENT1_STATUS.md`

---

**Created by**: Agent 1 (Fullstack Developer)
**Date**: December 29, 2025
**Status**: ✅ Ready for Week 3 development and QA testing
