#!/bin/bash

# Mobile App Template Setup Script
# This script initializes the Expo project after generation

set -e

echo "📱 Setting up {{PROJECT_NAME}}..."

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install it first:"
    echo "   npm install -g pnpm"
    exit 1
fi

# Check if Expo CLI is installed
if ! command -v expo &> /dev/null; then
    echo "📦 Installing Expo CLI globally..."
    npm install -g expo-cli
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Install iOS dependencies (macOS only)
if [[ "$OSTYPE" == "darwin"* ]]; then
    if command -v pod &> /dev/null; then
        echo "🍎 Installing iOS dependencies..."
        cd ios 2>/dev/null && pod install && cd .. || echo "⚠️  No iOS directory found (expected for new projects)"
    fi
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Configure environment variables in .env file"
echo "   2. Run 'pnpm start' to start Expo development server"
echo "   3. Press 'i' for iOS simulator or 'a' for Android emulator"
echo "   4. Or scan QR code with Expo Go app on your device"
echo ""
echo "📱 Platform-specific commands:"
echo "   pnpm ios      - Run on iOS simulator"
echo "   pnpm android  - Run on Android emulator"
echo "   pnpm web      - Run in web browser"
echo ""
