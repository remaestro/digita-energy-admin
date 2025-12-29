#!/bin/bash

# Full-Stack Web App Template Setup Script
# This script initializes the project after generation

set -e

echo "🚀 Setting up {{PROJECT_NAME}}..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install it first:"
    echo "   npm install -g pnpm"
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Generate Prisma client
echo "🔨 Generating Prisma client..."
pnpm --filter api db:generate

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL is not set in .env"
    echo "   Please configure your database connection before running migrations"
else
    # Run database migrations
    echo "🗄️  Running database migrations..."
    pnpm --filter api db:migrate
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Configure environment variables in .env files"
echo "   2. Run 'pnpm dev' to start development servers"
echo "   3. Frontend will be available at http://localhost:5173"
echo "   4. Backend API will be available at http://localhost:${PORT:-3000}"
echo ""
