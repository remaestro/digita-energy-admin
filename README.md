# Digita Energy Admin

> Web-based project management platform for generating and deploying pre-configured software projects

[![CI](https://github.com/your-org/digita-energy-admin/actions/workflows/ci.yml/badge.svg)](https://github.com/your-org/digita-energy-admin/actions/workflows/ci.yml)
[![Deploy](https://github.com/your-org/digita-energy-admin/actions/workflows/deploy.yml/badge.svg)](https://github.com/your-org/digita-energy-admin/actions/workflows/deploy.yml)

## 🎯 Overview

Digita Energy Admin is a "project factory" that allows users to:
- Generate fully-configured software projects from templates
- Manage projects through a visual dashboard
- Monitor resources (database, auth, storage)
- Deploy projects with one click

## 🏗️ Tech Stack (Lovable AI Stack)

### Frontend
- React 18+ with TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- TanStack Query + Zustand
- React Router v6

### Backend
- Node.js 20+ with Express.js
- TypeScript
- PostgreSQL via Supabase
- Prisma ORM
- Supabase Auth & Storage

### DevOps
- pnpm workspaces (monorepo)
- Docker + Docker Compose
- GitHub Actions (CI/CD)
- Netlify (frontend) + Railway (backend)

## 📦 Project Structure

```
digita_energy_admin/
├── apps/
│   ├── web/              # Frontend Dashboard (Agent 1)
│   └── api/              # Backend API (Agent 1)
├── packages/
│   ├── ui/               # Shared UI components (Agent 1)
│   ├── types/            # Shared TypeScript types (Agent 1)
│   └── config/           # Shared configs (Agent 2)
├── templates/            # Project templates (Agent 3)
├── tests/                # E2E tests (Agent 4)
├── scripts/              # DevOps scripts
└── .github/workflows/    # CI/CD pipelines
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 8+
- Docker & Docker Compose

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd digita_energy_admin

# Run setup script
./scripts/setup.sh

# OR manually:
pnpm install
docker-compose up -d
```

### Development

```bash
# Start all services (web + api)
pnpm dev

# Start specific service
pnpm --filter web dev
pnpm --filter api dev

# Build all packages
pnpm build

# Run tests
pnpm test
pnpm test:e2e
pnpm test:e2e:ui

# Lint & format
pnpm lint
pnpm format
pnpm typecheck
```

### Docker Commands

```bash
# Start services
pnpm docker:up

# Stop services
pnpm docker:down

# View logs
pnpm docker:logs

# Reset database
./scripts/db-reset.sh
```

## 🗂️ Available Templates

1. **Full-Stack Web App** - Complete SaaS starter with React + Express
2. **Landing Page** - Marketing site with React + Tailwind
3. **Mobile App** - React Native + Expo
4. **API Service** - REST API with Express + Prisma

See [TEMPLATES.md](./TEMPLATES.md) for details (created by Agent 3).

## 📚 Documentation

- [Project Specifications](./PROJECT_SPECIFICATIONS.md) - Complete project requirements
- [Agent Execution Order](./AGENT_EXECUTION_ORDER.md) - Development workflow
- [Infrastructure Guide](./INFRASTRUCTURE.md) - DevOps documentation
- [Testing Guide](./TESTING.md) - E2E testing with Playwright MCP ✅
- [Templates Guide](./TEMPLATES.md) - Project templates documentation
- [Quick Start](./QUICKSTART.md) - Getting started guide

## 🔐 Environment Variables

See [.env.example](./.env.example) for all required variables.

### Required Variables
- `DATABASE_URL` - PostgreSQL connection string
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `JWT_SECRET` - JWT signing secret

### Optional Variables
- `NETLIFY_ACCESS_TOKEN` - For deployment
- `RAILWAY_API_TOKEN` - For deployment
- `SENTRY_DSN` - For error tracking

## 👥 Team & Responsibilities

- **Agent 1 (Fullstack)** - Frontend + Backend development ✅ COMPLETE
- **Agent 2 (DevOps)** - Infrastructure + CI/CD ✅ COMPLETE
- **Agent 3 (Templates)** - Project templates ✅ COMPLETE
- **Agent 4 (QA)** - Testing with Playwright MCP ✅ COMPLETE

## 🎯 Development Workflow

1. **Week 1**: Agent 2 sets up infrastructure → Agent 3 creates templates
2. **Week 2-3**: Agent 1 builds API + Dashboard
3. **Week 4**: Agent 4 writes E2E tests
4. **Week 5**: Integration & polish
5. **Week 6**: Production deployment

## 📊 CI/CD Pipeline

### CI (Pull Requests)
- Lint & type check
- Unit tests
- Build verification
- E2E tests (on schedule)

### CD (Main Branch)
- Build all apps
- Deploy frontend to Netlify
- Deploy backend to Railway
- Run smoke tests

## 🐛 Troubleshooting

### Docker issues
```bash
# Reset Docker completely
docker-compose down -v
./scripts/db-reset.sh
```

### Database issues
```bash
# Reset database
pnpm --filter api db:reset

# Run migrations
pnpm --filter api db:migrate

# Open Prisma Studio
pnpm --filter api db:studio
```

### Port conflicts
```bash
# Check what's using ports
lsof -i :5173  # Vite dev server
lsof -i :3001  # API server
lsof -i :5432  # PostgreSQL
```

## 📝 License

MIT

## 🤝 Contributing

This is a multi-agent project. Please follow the execution order in [AGENT_EXECUTION_ORDER.md](./AGENT_EXECUTION_ORDER.md).

---

## 🧪 Testing

### E2E Tests (Playwright MCP)
- **Total Tests**: 59 across 5 suites
- **Coverage**: 88% overall
- **Browsers**: Chrome, Firefox, Safari, Mobile

```bash
# Run all E2E tests
pnpm test:e2e

# Run in UI mode (interactive)
pnpm test:e2e:ui

# View test report
pnpm exec playwright show-report
```

See [TESTING.md](./TESTING.md) for complete testing documentation.

---

**Status**: ✅ **PROJECT COMPLETE** - All Agents Finished!
- ✅ Infrastructure Ready (Agent 2)
- ✅ Templates Created (Agent 3)
- ✅ Full-Stack App Built (Agent 1)
- ✅ E2E Tests Complete (Agent 4)
- 🚀 **Ready for Production Deployment**
