# {{PROJECT_NAME}}

{{PROJECT_DESCRIPTION}}

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 8+
- PostgreSQL (or Supabase account)

### Setup

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   cp apps/web/.env.example apps/web/.env
   cp apps/api/.env.example apps/api/.env
   ```
   
   Update the `.env` files with your values.

3. **Run database migrations**
   ```bash
   pnpm db:migrate
   ```

4. **Start development servers**
   ```bash
   pnpm dev
   ```

   - Frontend: http://localhost:5173
   - Backend API: http://localhost:{{PORT}}

## 📁 Project Structure

```
{{PROJECT_NAME}}/
├── apps/
│   ├── web/              # React + Vite frontend
│   └── api/              # Express.js backend
├── pnpm-workspace.yaml
└── package.json
```

## 🛠️ Available Scripts

- `pnpm dev` - Start development servers
- `pnpm build` - Build for production
- `pnpm lint` - Lint code
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run tests
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Prisma Studio

## 🔧 Tech Stack

### Frontend
- React 18 + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui
- TanStack Query
- React Router
- Zustand

### Backend
- Express.js + TypeScript
- Prisma ORM
- PostgreSQL
- Supabase Auth
- JWT

## 📝 License

MIT
