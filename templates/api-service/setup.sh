#!/bin/bash

# API Service Template Setup Script
# This script initializes the project after generation

set -e

echo "⚡ Setting up {{PROJECT_NAME}}..."

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
pnpm db:generate

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "⚠️  DATABASE_URL is not set in .env"
    echo "   Please configure your database connection before running migrations"
else
    # Run database migrations
    echo "🗄️  Running database migrations..."
    pnpm db:migrate
fi

# Create logs directory
mkdir -p logs

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Configure environment variables in .env file"
echo "   2. Run 'pnpm dev' to start development server"
echo "   3. API will be available at http://localhost:${PORT:-3000}"
echo "   4. API docs at http://localhost:${PORT:-3000}/api-docs"
echo ""
echo "🚀 Production build:"
echo "   pnpm build && pnpm start"
echo ""
