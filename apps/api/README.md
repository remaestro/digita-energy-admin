# Digita Energy Admin - Backend API

> Express.js + TypeScript + Prisma + PostgreSQL

## 🚀 Quick Start

```bash
cd apps/api

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Make sure PostgreSQL is running (via Docker)
# Update DATABASE_URL in .env if needed

# Generate Prisma Client
pnpm db:generate

# Run database migrations
pnpm db:migrate

# Seed database with templates
pnpm db:seed

# Start development server
pnpm dev
```

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user  
- `GET /api/auth/me` - Get current user (protected)

### Templates
- `GET /api/templates` - Get all templates
- `GET /api/templates/:id` - Get template by ID/slug

### Projects
- `GET /api/projects` - Get all user projects (protected)
- `POST /api/projects` - Create new project (protected)
- `GET /api/projects/:id` - Get project details (protected)
- `PUT /api/projects/:id` - Update project (protected)
- `DELETE /api/projects/:id` - Delete project (protected)
- `POST /api/projects/:id/generate` - Generate project from template (protected)

### Deployments
- `GET /api/projects/:projectId/deployments` - Get all deployments (protected)
- `POST /api/projects/:projectId/deployments` - Create deployment (protected)
- `GET /api/projects/:projectId/deployments/:deploymentId` - Get deployment details (protected)

## 📚 Documentation

- API Docs: http://localhost:3001/api/docs
- Health Check: http://localhost:3001/health

## 🗄️ Database

We use Prisma ORM with PostgreSQL. Schema is defined in `prisma/schema.prisma`.

### Available Scripts

```bash
pnpm db:generate   # Generate Prisma Client
pnpm db:migrate    # Run migrations
pnpm db:reset      # Reset database
pnpm db:seed       # Seed database
pnpm db:studio     # Open Prisma Studio
```

## 🔐 Environment Variables

See `.env.example` for required variables:
- `DATABASE_URL` - PostgreSQL connection string
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_KEY` - Supabase service key
- `JWT_SECRET` - JWT secret (min 32 characters)
- `PORT` - Server port (default: 3001)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Allowed CORS origin

## 🏗️ Project Structure

```
src/
├── config/           # Configuration files
│   ├── database.ts   # Prisma client
│   ├── env.ts        # Environment validation
│   ├── logger.ts     # Winston logger
│   ├── supabase.ts   # Supabase client
│   └── swagger.ts    # Swagger config
├── controllers/      # Route controllers
│   ├── auth.controller.ts
│   ├── project.controller.ts
│   ├── template.controller.ts
│   └── deployment.controller.ts
├── middleware/       # Express middleware
│   ├── auth.ts       # JWT authentication
│   ├── errorHandler.ts
│   └── validate.ts   # Zod validation
├── routes/           # API routes
│   ├── auth.routes.ts
│   ├── project.routes.ts
│   ├── template.routes.ts
│   ├── deployment.routes.ts
│   └── index.ts
└── server.ts         # Express server
```

## ✅ Status

- [x] Express server setup
- [x] TypeScript configuration
- [x] Prisma schema
- [x] Authentication (Supabase + JWT)
- [x] API routes (CRUD)
- [x] Validation with Zod
- [x] Error handling
- [x] Logging with Winston
- [x] Swagger documentation
- [ ] Project generation engine
- [ ] Deployment integration
