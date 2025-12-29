# Templates Documentation

This document describes all available project templates in the Digita Energy Admin platform.

## 📚 Template Overview

The `/templates` directory contains pre-configured project templates that users can generate with one click. Each template follows the Lovable AI stack and is production-ready.

## 🔧 Template System

### Template Manifest

The `manifest.json` file contains metadata for all templates:
- Template ID and name
- Description and category
- Required environment variables
- Template variables for substitution
- Dependencies and versions
- Setup instructions

### Template Variables

Templates use placeholder variables that are replaced during project generation:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{PROJECT_NAME}}` | Project name | my-awesome-app |
| `{{PROJECT_DESCRIPTION}}` | Project description | A cool web application |
| `{{DATABASE_URL}}` | PostgreSQL connection string | postgresql://user:pass@host:5432/db |
| `{{SUPABASE_URL}}` | Supabase project URL | https://xxx.supabase.co |
| `{{SUPABASE_ANON_KEY}}` | Supabase anonymous key | eyJhbGciOiJIUzI1... |
| `{{PORT}}` | Server port | 3000 |
| `{{JWT_SECRET}}` | JWT secret key | random-secret-string |

## 📦 Available Templates

### 1. Full-Stack Web Application

**ID:** `fullstack-web-app`  
**Type:** Full-Stack  
**Icon:** 🚀

Complete SaaS starter with frontend, backend, and database.

#### Features
- ✅ React 18 + TypeScript + Vite
- ✅ Express.js API + TypeScript
- ✅ PostgreSQL + Prisma ORM
- ✅ Supabase Auth & Storage
- ✅ TanStack Query for data fetching
- ✅ Tailwind CSS + shadcn/ui components
- ✅ React Router for navigation
- ✅ JWT authentication
- ✅ CORS and security middleware
- ✅ Error handling

#### Structure
```
fullstack-web-app/
├── apps/
│   ├── web/              # React frontend
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── lib/
│   │   │   ├── hooks/
│   │   │   ├── stores/
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   ├── vite.config.ts
│   │   └── package.json
│   │
│   └── api/              # Express backend
│       ├── src/
│       │   ├── routes/
│       │   ├── controllers/
│       │   ├── middleware/
│       │   ├── config/
│       │   └── server.ts
│       ├── prisma/
│       │   └── schema.prisma
│       └── package.json
│
├── pnpm-workspace.yaml
├── package.json
├── setup.sh
└── README.md
```

#### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_ANON_KEY` - Supabase anonymous key
- `JWT_SECRET` - Secret for JWT tokens
- `PORT` - API server port (default: 3000)

#### Setup
```bash
# Run the setup script
./setup.sh

# Or manually:
pnpm install
pnpm --filter api db:migrate
pnpm dev
```

#### Usage
- Frontend: http://localhost:5173
- Backend API: http://localhost:3000
- API Docs: http://localhost:3000/api

---

### 2. Landing Page

**ID:** `landing-page`  
**Type:** Frontend  
**Icon:** 🎨

Modern marketing website with React, Tailwind CSS, SEO optimization, and smooth animations.

#### Features
- ✅ React 18 + TypeScript + Vite
- ✅ Tailwind CSS with custom theme
- ✅ Responsive mobile-first design
- ✅ SEO optimized with React Helmet
- ✅ Smooth animations with Framer Motion
- ✅ Intersection Observer for scroll effects
- ✅ Lucide icons
- ✅ Pre-built sections (Hero, Features, CTA, Footer)
- ✅ Contact form ready
- ✅ Netlify deployment config

#### Structure
```
landing-page/
├── src/
│   ├── components/
│   │   ├── Navbar.tsx
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   └── LandingPage.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── assets/
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── public/
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── netlify.toml
├── setup.sh
└── package.json
```

#### Environment Variables
- `VITE_SITE_URL` - Website URL
- `VITE_SITE_NAME` - Site name for branding
- `VITE_CONTACT_EMAIL` - Contact email address

#### Setup
```bash
# Run the setup script
./setup.sh

# Or manually:
pnpm install
pnpm dev
```

#### Usage
- Development: http://localhost:5173
- Customize sections in `src/components/`
- Update content and metadata in `src/pages/LandingPage.tsx`

#### Deployment
Deploy to Netlify with one command:
```bash
pnpm build
# Upload dist/ folder or connect GitHub repo
```

---

### 3. Mobile Application

**ID:** `mobile-app`  
**Type:** Mobile  
**Icon:** 📱

Cross-platform mobile app with React Native, Expo Router, NativeWind, and Supabase backend.

#### Features
- ✅ React Native 0.73 + TypeScript
- ✅ Expo ~50 with Expo Router
- ✅ File-based routing
- ✅ NativeWind (Tailwind for React Native)
- ✅ Supabase integration
- ✅ TanStack Query for data fetching
- ✅ Secure storage with Expo Secure Store
- ✅ Biometric authentication
- ✅ Push notifications ready
- ✅ Tab navigation pre-configured
- ✅ Custom components (Button, Input)

#### Structure
```
mobile-app/
├── app/
│   ├── (tabs)/
│   │   ├── _layout.tsx      # Tab navigation
│   │   ├── index.tsx        # Home screen
│   │   ├── profile.tsx      # Profile screen
│   │   └── settings.tsx     # Settings screen
│   ├── _layout.tsx          # Root layout
│   └── index.tsx            # Welcome screen
├── components/
│   ├── Button.tsx
│   └── Input.tsx
├── services/
│   ├── supabase.ts
│   ├── storage.ts
│   └── biometric.ts
├── hooks/
│   └── useAuth.ts
├── utils/
│   └── cn.ts
├── assets/
├── app.json
├── babel.config.js
├── tailwind.config.js
├── setup.sh
└── package.json
```

#### Environment Variables
- `EXPO_PUBLIC_SUPABASE_URL` - Supabase project URL
- `EXPO_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `EXPO_PUBLIC_APP_NAME` - App name

#### Setup
```bash
# Run the setup script
./setup.sh

# Or manually:
pnpm install
pnpm start
```

#### Usage
- Start: `pnpm start`
- iOS: `pnpm ios` (requires Mac + Xcode)
- Android: `pnpm android` (requires Android Studio)
- Web: `pnpm web`

#### Building
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

---

### 4. REST API Service

**ID:** `api-service`  
**Type:** Backend  
**Icon:** ⚡

Production-ready REST API with Express, Prisma, PostgreSQL, JWT authentication, and Swagger documentation.

#### Features
- ✅ Express.js + TypeScript
- ✅ Prisma ORM + PostgreSQL
- ✅ JWT authentication with bcrypt
- ✅ Request validation with Zod
- ✅ Swagger/OpenAPI documentation
- ✅ Winston logging
- ✅ Helmet security headers
- ✅ CORS enabled
- ✅ Rate limiting
- ✅ Error handling middleware
- ✅ Docker support
- ✅ Vitest for testing

#### Structure
```
api-service/
├── src/
│   ├── routes/
│   │   ├── index.ts
│   │   ├── auth.routes.ts
│   │   └── user.routes.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   └── user.controller.ts
│   ├── middleware/
│   │   ├── auth.ts
│   │   ├── errorHandler.ts
│   │   └── notFoundHandler.ts
│   ├── config/
│   │   ├── config.ts
│   │   ├── database.ts
│   │   ├── logger.ts
│   │   └── swagger.ts
│   └── server.ts
├── prisma/
│   └── schema.prisma
├── tests/
├── Dockerfile
├── setup.sh
└── package.json
```

#### Environment Variables
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment (development/production)
- `CORS_ORIGIN` - Allowed CORS origin

#### Setup
```bash
# Run the setup script
./setup.sh

# Or manually:
pnpm install
pnpm db:migrate
pnpm dev
```

#### Usage
- Development: `pnpm dev`
- Production build: `pnpm build && pnpm start`
- API docs: http://localhost:3000/api-docs
- Health check: http://localhost:3000/health

#### API Endpoints
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login user
- `GET /api/v1/users/me` - Get current user (protected)
- `GET /api/v1/users` - Get all users (protected)

#### Docker Deployment
```bash
# Build image
docker build -t {{PROJECT_NAME}} .

# Run container
docker run -p 3000:3000 \
  -e DATABASE_URL="your-db-url" \
  -e JWT_SECRET="your-secret" \
  {{PROJECT_NAME}}
```

---

## 🔨 Creating New Templates

### Template Checklist

When creating a new template, ensure:

- [ ] Complete `package.json` with all dependencies
- [ ] TypeScript configuration (`tsconfig.json`)
- [ ] ESLint + Prettier configs
- [ ] Build tool config (Vite, Webpack, etc.)
- [ ] Sample code and starter components
- [ ] README with setup instructions
- [ ] `.env.example` with all required variables
- [ ] `.gitignore` file
- [ ] `setup.sh` script
- [ ] Entry in `manifest.json`
- [ ] Documentation in this file

### Template Variables Best Practices

1. **Always use double curly braces:** `{{VARIABLE_NAME}}`
2. **Use SCREAMING_SNAKE_CASE** for variable names
3. **Document all variables** in manifest.json
4. **Provide defaults** where possible
5. **Validate** required variables during generation

### Setup Script Guidelines

Every template should have a `setup.sh` script that:

1. Checks for required tools (node, pnpm, etc.)
2. Installs dependencies
3. Generates necessary files (Prisma, etc.)
4. Runs database migrations (if applicable)
5. Provides clear next steps

Example:
```bash
#!/bin/bash
set -e
echo "🚀 Setting up {{PROJECT_NAME}}..."
pnpm install
# ... other setup steps
echo "✅ Setup complete!"
```

---

## 🧪 Testing Templates

Before adding a template to production:

1. **Generate test project** from template
2. **Run setup script** - verify no errors
3. **Install dependencies** - check for conflicts
4. **Run development server** - ensure it starts
5. **Build for production** - verify build succeeds
6. **Test core features** - ensure basic functionality works
7. **Check documentation** - README is accurate

---

## 📝 Template Maintenance

### Version Management

- Keep dependencies up to date
- Test templates after dependency updates
- Document breaking changes
- Maintain compatibility with Lovable AI stack

### Common Issues

**Issue:** Template variables not replaced  
**Solution:** Check variable syntax `{{VAR}}` and ensure it's in manifest.json

**Issue:** Dependencies conflict  
**Solution:** Use exact versions or carefully test ranges

**Issue:** Setup script fails  
**Solution:** Add error handling and validation

---

## 🎯 Future Templates

Planned templates for future releases:

- [ ] **E-commerce Store** - Full online store with cart and checkout
- [ ] **Admin Dashboard** - Data management and analytics dashboard
- [ ] **Blog Platform** - Content management system
- [ ] **Chat Application** - Real-time messaging app
- [ ] **GraphQL API** - GraphQL server with subscriptions
- [ ] **Serverless Functions** - Edge functions and serverless API

---

**Last Updated:** 2025-12-29  
**Maintained By:** Agent 3 (Template Engineer)  
**Total Templates:** 4 (All templates completed ✅)
