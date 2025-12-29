# {{PROJECT_NAME}}

{{PROJECT_DESCRIPTION}}

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- pnpm 8+
- PostgreSQL

### Setup

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Configure environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your database credentials and secrets.

3. **Run database migrations**
   ```bash
   pnpm db:migrate
   ```

4. **Start development server**
   ```bash
   pnpm dev
   ```

   API will be available at http://localhost:{{PORT}}

## 📁 Project Structure

```
{{PROJECT_NAME}}/
├── src/
│   ├── routes/          # API routes
│   ├── controllers/     # Request handlers
│   ├── services/        # Business logic
│   ├── middleware/      # Express middleware
│   ├── utils/           # Utilities
│   ├── types/           # TypeScript types
│   ├── config/          # Configuration
│   └── server.ts        # App entry point
├── prisma/
│   ├── schema.prisma    # Database schema
│   └── migrations/      # Migration files
├── tests/               # Test files
└── package.json
```

## 🛠️ Available Scripts

- `pnpm dev` - Start development server with watch mode
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Lint code
- `pnpm format` - Format code with Prettier
- `pnpm test` - Run tests
- `pnpm test:coverage` - Run tests with coverage
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Prisma Studio
- `pnpm db:seed` - Seed database

## 🔧 Tech Stack

- **Express.js** + TypeScript
- **Prisma ORM** + PostgreSQL
- **JWT** authentication
- **Bcrypt** password hashing
- **Zod** validation
- **Winston** logging
- **Swagger** API documentation
- **Helmet** security headers
- **CORS** enabled
- **Rate limiting**
- **Vitest** testing

## 📝 API Documentation

Once running, visit:
- Swagger UI: http://localhost:{{PORT}}/api-docs
- Health check: http://localhost:{{PORT}}/health

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ Request validation with Zod
- ✅ Rate limiting
- ✅ Helmet security headers
- ✅ CORS configuration
- ✅ Environment variable validation

## 🚀 Deployment

### Docker
```bash
docker build -t {{PROJECT_NAME}} .
docker run -p {{PORT}}:{{PORT}} {{PROJECT_NAME}}
```

### Manual
```bash
pnpm build
NODE_ENV=production pnpm start
```

## 📝 License

MIT
