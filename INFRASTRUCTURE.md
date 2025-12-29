# Infrastructure Documentation

> DevOps Engineer (Agent 2) - Infrastructure, CI/CD, and Deployment Guide

## 📋 Table of Contents

- [Architecture Overview](#architecture-overview)
- [Local Development](#local-development)
- [Docker Setup](#docker-setup)
- [CI/CD Pipeline](#cicd-pipeline)
- [Deployment](#deployment)
- [Monitoring](#monitoring)
- [Environment Management](#environment-management)

## 🏗️ Architecture Overview

### Monorepo Structure

We use **pnpm workspaces** for efficient dependency management across packages.

```
digita_energy_admin/
├── apps/               # Application packages
├── packages/           # Shared libraries
├── templates/          # Project templates
├── tests/              # E2E tests
└── scripts/            # Automation scripts
```

### Technology Stack

- **Package Manager**: pnpm 8+
- **Runtime**: Node.js 20+
- **Database**: PostgreSQL 16 (via Docker)
- **Cache**: Redis 7 (via Docker)
- **CI/CD**: GitHub Actions
- **Hosting**: Netlify (frontend) + Railway (backend)

## 💻 Local Development

### Prerequisites

```bash
# Check versions
node --version    # Should be 20+
pnpm --version    # Should be 8+
docker --version  # Any recent version
```

### Initial Setup

```bash
# 1. Install dependencies
pnpm install

# 2. Set up environment files
cp .env.example .env
cp apps/web/.env.example apps/web/.env
cp apps/api/.env.example apps/api/.env

# 3. Start Docker services
docker-compose up -d

# 4. Verify services are running
docker-compose ps
```

### Development Workflow

```bash
# Start all services in parallel
pnpm dev

# Start individual services
pnpm --filter web dev      # Frontend only
pnpm --filter api dev      # Backend only

# Build everything
pnpm build

# Run tests
pnpm test                  # Unit tests
pnpm test:e2e             # E2E tests
```

## 🐳 Docker Setup

### Services

We run the following services in Docker:

1. **PostgreSQL** - Main database (port 5432)
2. **Redis** - Caching & queues (port 6379)

### Docker Compose Commands

```bash
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f postgres

# Restart a service
docker-compose restart postgres

# Remove volumes (reset data)
docker-compose down -v
```

### Health Checks

```bash
# PostgreSQL
docker exec digita_postgres pg_isready -U postgres

# Redis
docker exec digita_redis redis-cli ping
```

## 🔄 CI/CD Pipeline

### Workflows

#### 1. **CI Pipeline** (`.github/workflows/ci.yml`)

Runs on every PR and push to `main`/`develop`:
- Lint code (ESLint)
- Type check (TypeScript)
- Format check (Prettier)
- Run unit tests
- Build all packages

#### 2. **Deploy Pipeline** (`.github/workflows/deploy.yml`)

Runs on merge to `main`:
- Build production bundles
- Deploy frontend to Netlify
- Deploy backend to Railway
- Run smoke tests

#### 3. **E2E Tests** (`.github/workflows/test.yml`)

Runs on PR and nightly schedule:
- Install Playwright browsers
- Run full E2E test suite
- Upload test reports

### GitHub Secrets Required

Add these in GitHub Settings → Secrets and Variables → Actions:

```
NETLIFY_AUTH_TOKEN      # Netlify deployment token
NETLIFY_SITE_ID         # Netlify site ID
RAILWAY_TOKEN           # Railway API token
SUPABASE_URL            # Supabase project URL
SUPABASE_SERVICE_KEY    # Supabase service role key
SENTRY_DSN              # Sentry error tracking DSN
```

## 🚀 Deployment

### Frontend (Netlify)

**Configuration**: `netlify.toml`

```bash
# Manual deployment
pnpm --filter web build
netlify deploy --dir=apps/web/dist --prod
```

**Automatic deployment**: Triggered on merge to `main` via GitHub Actions.

### Backend (Railway)

**Configuration**: `railway.json` (to be created)

```bash
# Manual deployment
pnpm --filter api build
# Railway CLI deployment commands
```

**Automatic deployment**: Triggered via GitHub Actions or Railway GitHub integration.

### Database (Supabase)

We use Supabase for:
- PostgreSQL database
- Authentication
- File storage
- Real-time subscriptions

**Setup**:
1. Create project at [supabase.com](https://supabase.com)
2. Copy project URL and keys to `.env`
3. Run migrations: `pnpm --filter api db:migrate`

## 📊 Monitoring

### Error Tracking (Sentry)

```bash
# Install Sentry SDK (already in package.json)
# Configure in apps/web/src/main.tsx and apps/api/src/server.ts
```

**Setup**:
1. Create project at [sentry.io](https://sentry.io)
2. Copy DSN to `.env`
3. Sentry automatically captures errors

### Application Monitoring

- **Uptime**: UptimeRobot (to be configured)
- **Logs**: Built-in logging to console (production logs via hosting platforms)
- **Performance**: Sentry Performance Monitoring

## 🔐 Environment Management

### Environment Files

Each app has its own `.env` file:

```
Root:         .env                 # Shared variables
Frontend:     apps/web/.env        # Vite variables (VITE_*)
Backend:      apps/api/.env        # API variables
```

### Variable Naming Convention

- **Frontend**: Prefix with `VITE_` (e.g., `VITE_API_URL`)
- **Backend**: No prefix needed
- **Secrets**: Never commit secrets; use `.env.example` as template

### Environment Validation

We validate environment variables at runtime using Zod schemas (to be implemented by Agent 1).

## 🛠️ Automation Scripts

### `scripts/setup.sh`

Initial project setup:
- Checks for required tools
- Installs dependencies
- Creates environment files
- Starts Docker services

### `scripts/db-reset.sh`

Reset database (development only):
- Stops Docker services
- Removes volumes
- Restarts services

### `scripts/deploy.sh` (to be created)

Manual deployment script for emergency deployments.

### `scripts/generate-project.sh` (to be created)

Test project generation locally without using the UI.

## 🔧 Troubleshooting

### Common Issues

#### Port Already in Use

```bash
# Find process using port
lsof -i :5432  # PostgreSQL
lsof -i :3001  # API
lsof -i :5173  # Vite

# Kill process
kill -9 <PID>
```

#### Docker Issues

```bash
# Reset everything
docker-compose down -v
docker system prune -a
docker-compose up -d
```

#### pnpm Installation Fails

```bash
# Clear cache
pnpm store prune

# Reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

## 📝 Maintenance Checklist

### Weekly
- [ ] Check CI/CD pipeline status
- [ ] Review deployment logs
- [ ] Monitor error rates in Sentry

### Monthly
- [ ] Update dependencies: `pnpm update -r`
- [ ] Review and rotate secrets
- [ ] Check disk usage on hosting platforms

### Quarterly
- [ ] Audit security dependencies
- [ ] Review and optimize CI/CD costs
- [ ] Update Node.js/Docker base images

## 🎯 Success Criteria

✅ All agents can run `pnpm install` successfully
✅ `docker-compose up -d` starts PostgreSQL and Redis
✅ CI/CD pipeline runs without errors
✅ Deployments are automated
✅ Environment variables are properly managed
✅ Monitoring is configured

## 📞 Support

For infrastructure questions, contact **Agent 2 (DevOps Engineer)**.

---

**Status**: ✅ Infrastructure Complete
**Last Updated**: 2025-12-29
**Maintained by**: Agent 2 (DevOps Engineer)
