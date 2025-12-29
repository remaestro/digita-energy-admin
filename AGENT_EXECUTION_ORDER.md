# Agent Execution Order - Digita Energy Admin

## 🚀 Start Here: Week 1 - Foundation

### **Agent 2: DevOps Engineer Goes FIRST** 🚀

**Why?** They set up the foundation that everyone else needs.

#### Tasks (Days 1-3):
1. Initialize the monorepo structure
2. Set up pnpm workspace configuration
3. Create Docker Compose for local development
4. Set up basic folder structure (`apps/`, `packages/`, `templates/`, `tests/`)
5. Create root `package.json` with workspace scripts
6. Initialize Git repository
7. Create basic `.env.example` files
8. Set up ESLint, Prettier, TypeScript configs

#### Deliverables:
```bash
digita_energy_admin/
├── apps/
│   ├── web/              # (empty, ready for Agent 1)
│   └── api/              # (empty, ready for Agent 1)
├── packages/
│   ├── ui/               # (empty, ready for Agent 1)
│   ├── types/            # (empty, ready for Agent 1)
│   └── config/           # ESLint, Prettier, TS configs
├── templates/            # (empty, ready for Agent 3)
├── tests/                # (empty, ready for Agent 4)
├── scripts/
│   └── setup.sh
├── docker-compose.yml
├── package.json
├── pnpm-workspace.yaml
├── .env.example
├── .gitignore
├── README.md
└── PROJECT_SPECIFICATIONS.md
```

#### Success Criteria:
- ✅ Any agent can run `pnpm install` successfully
- ✅ `docker-compose up -d` starts PostgreSQL
- ✅ All agents have a clear place to put their code

---

## 📐 Next: Week 1 - Templates (Days 4-7)

### **Agent 3: Template Engineer Goes SECOND** 📐

**Why?** Agent 1 (Fullstack Dev) needs templates to build the generation engine.

#### Tasks:
1. Create `templates/manifest.json` with template metadata
2. Build **Full-Stack Web App** template
   - Complete folder structure
   - All config files (package.json, tsconfig, vite.config, etc.)
   - Sample components
   - README with setup instructions
3. Create at least one other template (Landing Page recommended)
4. Document template variables ({{PROJECT_NAME}}, etc.)
5. Test templates can be installed and run

#### Deliverables:
```
templates/
├── manifest.json
├── fullstack-web-app/
│   ├── apps/
│   │   ├── web/
│   │   └── api/
│   ├── package.json
│   ├── README.md
│   └── setup.sh
└── landing-page/
    ├── src/
    ├── package.json
    ├── README.md
    └── setup.sh
```

#### Success Criteria:
- ✅ Templates can be copied and run independently
- ✅ Manifest.json is well-documented
- ✅ At least 2 templates are complete

---

## 💻 Then: Week 2-3 - Core Application

### **Agent 1: Fullstack Developer Goes THIRD** 💻

**Why?** Now they have the foundation (from Agent 2) and templates (from Agent 3).

#### Week 2 Tasks (Backend First):
1. Design database schema in `prisma/schema.prisma`
2. Create API endpoints:
   - `POST /api/projects` - Create project
   - `GET /api/projects` - List projects
   - `GET /api/projects/:id` - Get project details
   - `POST /api/projects/generate` - Generate project from template
   - `POST /api/projects/:id/deploy` - Deploy project
3. Set up Supabase integration
4. Implement authentication
5. Create project generation engine (uses templates from Agent 3)
6. Write Swagger API documentation

#### Week 3 Tasks (Frontend):
7. Build dashboard UI with shadcn/ui
8. Create project creation wizard
9. Build project list and detail pages
10. Implement resource management interfaces
11. Connect frontend to backend API

#### Deliverables:
- Complete `apps/api/` directory
- Complete `apps/web/` directory
- `packages/types/` with shared types
- `packages/ui/` with shared components
- Working application (can create and manage projects)

#### Success Criteria:
- ✅ API endpoints work and are documented
- ✅ Dashboard UI is functional
- ✅ Can generate a project from a template
- ✅ Frontend and backend communicate correctly

---

## 🎭 Next: Week 4 - Quality Assurance

### **Agent 4: QA Engineer Goes FOURTH** 🎭

**Why?** They need a working application (from Agent 1) to test.

#### Tasks:
1. Set up Playwright testing framework
2. Configure Playwright MCP
3. Write E2E tests for all user flows:
   - User authentication
   - Create project
   - View projects
   - Deploy project
   - Manage resources
4. Create visual regression tests
5. Test API endpoints
6. Generate test reports
7. Document testing approach

#### Deliverables:
- `tests/e2e/` with all test files
- `playwright.config.ts`
- Test reports
- `TESTING.md` documentation

#### Success Criteria:
- ✅ All critical user flows have E2E tests
- ✅ Tests pass consistently
- ✅ Bug reports are documented
- ✅ Test coverage report generated

---

## 🔄 Parallel Work: Agent 2 (DevOps) Continues Throughout

### **Agent 2: DevOps Engineer - Ongoing Work** 🚀

While Agents 1, 3, 4 work on their tasks, Agent 2 continues:

#### Week 2-3:
- Set up CI/CD pipeline (GitHub Actions)
- Configure Netlify for frontend deployment
- Configure Railway/Render for backend deployment
- Set up Supabase project
- Configure monitoring (Sentry)
- Create deployment scripts

#### Week 4:
- Integrate Agent 4's tests into CI/CD
- Set up staging environment
- Prepare production environment

#### Week 5-6:
- Deploy to staging
- Deploy to production
- Monitor and troubleshoot

---

## 📅 Complete Timeline

### **Week 1: Foundation**
- **Days 1-3:** Agent 2 (DevOps) - Infrastructure setup
- **Days 4-7:** Agent 3 (Templates) - Create templates

### **Week 2: Backend Development**
- Agent 1 (Fullstack) - Build API and database
- Agent 2 (DevOps) - Start CI/CD setup

### **Week 3: Frontend Development**
- Agent 1 (Fullstack) - Build dashboard UI
- Agent 2 (DevOps) - Configure deployments

### **Week 4: Testing**
- Agent 4 (QA) - Write E2E tests
- Agent 1 (Fullstack) - Fix bugs
- Agent 2 (DevOps) - Integrate tests into CI/CD

### **Week 5: Integration**
- All agents - Integration testing, bug fixes, polish

### **Week 6: Launch**
- Agent 2 (DevOps) - Production deployment
- Agent 4 (QA) - Production smoke tests
- All agents - Monitoring and support

---

## 🎯 Quick Start Commands (In Order)

### 1️⃣ Agent 2 Starts:
```bash
cd digita_energy_admin

# Initialize monorepo
pnpm init
mkdir -p apps/web apps/api packages/ui packages/types packages/config templates tests scripts .github/workflows

# Create pnpm workspace config
echo "packages:\n  - 'apps/*'\n  - 'packages/*'" > pnpm-workspace.yaml

# Set up Docker Compose
# Create docker-compose.yml with PostgreSQL

# Initialize Git
git init
git add .
git commit -m "Initial project structure"
```

### 2️⃣ Agent 3 Follows:
```bash
cd digita_energy_admin/templates

# Create templates
mkdir -p fullstack-web-app landing-page mobile-app api-service

# Create manifest.json
# Build out each template
```

### 3️⃣ Agent 1 Follows:
```bash
cd digita_energy_admin/apps/api

# Initialize backend
pnpm init
pnpm add express @types/express typescript prisma

# Set up Prisma
npx prisma init

# Then work on frontend
cd ../web
pnpm create vite . --template react-ts
```

### 4️⃣ Agent 4 Follows:
```bash
cd digita_energy_admin

# Install Playwright
pnpm add -D @playwright/test

# Initialize Playwright
npx playwright install

# Write tests in tests/e2e/
```

---

## ✅ Handoff Checklist

### Agent 2 → Agent 3:
- [ ] Monorepo structure created
- [ ] Docker Compose working
- [ ] All agents can run `pnpm install`
- [ ] `/templates` directory exists and is ready

### Agent 3 → Agent 1:
- [ ] At least 2 templates completed
- [ ] `templates/manifest.json` documented
- [ ] Templates tested and working
- [ ] Template variables documented

### Agent 1 → Agent 4:
- [ ] Backend API functional
- [ ] Frontend dashboard functional
- [ ] Can create and view projects
- [ ] API documentation (Swagger) available
- [ ] Local development environment working

### Agent 4 → Agent 2:
- [ ] Test suite written
- [ ] Tests passing locally
- [ ] Test documentation complete
- [ ] Ready for CI/CD integration

---

## 🚨 What If Something Blocks?

### If Agent 2 is blocked:
- **Impact:** Everyone is blocked (foundation not ready)
- **Action:** Priority fix, all hands on deck

### If Agent 3 is blocked:
- **Impact:** Agent 1 can't build generation engine
- **Workaround:** Agent 1 starts with API/database, delays generation engine
- **Action:** Agent 3 resolves blocker ASAP

### If Agent 1 is blocked:
- **Impact:** Agent 4 has nothing to test
- **Workaround:** Agent 4 can start setting up Playwright framework
- **Action:** Agent 1 resolves blocker, Agent 4 waits

### If Agent 4 is blocked:
- **Impact:** Testing delayed but doesn't block others
- **Workaround:** Manual testing continues
- **Action:** Agent 4 resolves, others continue

---

## 📞 Daily Standup Order

**Every day, agents report in this order:**

1. **Agent 2 (DevOps)** - Infrastructure updates, blockers
2. **Agent 3 (Templates)** - Template progress, handoff readiness
3. **Agent 1 (Fullstack)** - Development progress, API updates
4. **Agent 4 (QA)** - Testing progress, bugs found

---

## 🎉 Summary

**Start Order:**
1. 🚀 **DevOps Engineer** (Agent 2) - Sets the stage
2. 📐 **Template Engineer** (Agent 3) - Provides building blocks
3. 💻 **Fullstack Developer** (Agent 1) - Builds the application
4. 🎭 **QA Engineer** (Agent 4) - Ensures quality

**Everyone else waits for their turn, but Agent 2 supports everyone throughout!**

---

**Ready to start?** Agent 2, you're up! 🚀
