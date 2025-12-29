#!/bin/bash

# Landing Page Template Setup Script
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

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Configure environment variables in .env file"
echo "   2. Run 'pnpm dev' to start development server"
echo "   3. Open http://localhost:5173 in your browser"
echo "   4. Customize components in src/components/"
echo "   5. Update content in src/pages/LandingPage.tsx"
echo ""
echo "🚀 Build for production:"
echo "   pnpm build"
echo ""
