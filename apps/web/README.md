# Digita Energy Admin - Frontend Dashboard

> React 18 + TypeScript + Vite + Tailwind CSS

## 🚀 Quick Start

```bash
cd apps/web

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development server
pnpm dev
```

## 🎨 Features

- ✅ React 18 with TypeScript
- ✅ Vite for fast development
- ✅ Tailwind CSS for styling
- ✅ React Router for navigation
- ✅ TanStack Query for data fetching
- ✅ Zustand for state management
- ✅ Axios for API calls
- ✅ React Hook Form + Zod for forms
- ✅ Supabase client integration

## 📁 Project Structure

```
src/
├── components/       # React components
├── pages/            # Page components (routes)
│   ├── DashboardPage.tsx
│   ├── LoginPage.tsx
│   └── RegisterPage.tsx
├── lib/              # Utilities
│   ├── api.ts        # Axios instance
│   ├── supabase.ts   # Supabase client
│   └── utils.ts      # Helper functions
├── services/         # API services
│   ├── auth.service.ts
│   ├── project.service.ts
│   ├── template.service.ts
│   └── deployment.service.ts
├── stores/           # Zustand stores
│   └── auth.store.ts
├── types/            # TypeScript types
│   └── index.ts
├── App.tsx           # Main app component
└── main.tsx          # Entry point
```

## 🔐 Environment Variables

See `.env.example`:
- `VITE_API_URL` - Backend API URL
- `VITE_SUPABASE_URL` - Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Supabase anonymous key

## 🛣️ Routes

- `/` - Dashboard (protected)
- `/login` - Login page
- `/register` - Registration page

## 🧩 Available Scripts

```bash
pnpm dev         # Start development server
pnpm build       # Build for production
pnpm preview     # Preview production build
pnpm lint        # Run ESLint
pnpm typecheck   # Run TypeScript type checking
```

## ✅ Status

- [x] React + Vite setup
- [x] TypeScript configuration
- [x] Tailwind CSS integration
- [x] React Router setup
- [x] Authentication pages (Login/Register)
- [x] Dashboard layout with stats
- [x] API services
- [x] State management (Zustand)
- [x] Project management pages (List, Detail, Create)
- [x] Template browser
- [x] Deployment interface
- [x] UI components library (Button, Input, Card, Badge)
- [x] React Query hooks
- [x] Layout with navigation
- [ ] Real-time updates (WebSocket)
- [ ] Advanced features (search, filters, dark mode)

