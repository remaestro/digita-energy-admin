#!/bin/bash

set -e

echo "🚀 Digita Energy Admin - Setup Script"
echo "======================================"

# Check for required tools
echo "📋 Checking for required tools..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 20+ first."
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
fi

if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

echo "✅ All required tools are installed"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
pnpm install

# Copy environment files
echo ""
echo "📝 Setting up environment files..."
if [ ! -f .env ]; then
    cp .env.example .env
    echo "✅ Created .env from .env.example"
fi

if [ ! -f apps/web/.env ]; then
    mkdir -p apps/web
    echo "VITE_API_URL=http://localhost:3001" > apps/web/.env
    echo "✅ Created apps/web/.env"
fi

if [ ! -f apps/api/.env ]; then
    mkdir -p apps/api
    echo "DATABASE_URL=postgresql://postgres:postgres@localhost:5432/digita_energy_admin" > apps/api/.env
    echo "PORT=3001" >> apps/api/.env
    echo "✅ Created apps/api/.env"
fi

# Start Docker services
echo ""
echo "🐳 Starting Docker services..."
docker-compose up -d

# Wait for PostgreSQL to be ready
echo "⏳ Waiting for PostgreSQL to be ready..."
sleep 5

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "  1. Update .env files with your actual credentials"
echo "  2. Wait for Agent 3 (Template Engineer) to create templates"
echo "  3. Wait for Agent 1 (Fullstack Developer) to build the app"
echo ""
echo "🎯 Useful commands:"
echo "  pnpm dev          - Start development servers"
echo "  pnpm docker:up    - Start Docker services"
echo "  pnpm docker:down  - Stop Docker services"
echo "  pnpm docker:logs  - View Docker logs"
echo ""
