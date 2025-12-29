#!/bin/bash

set -e

echo "🗑️  Resetting database..."

# Stop services
docker-compose down -v

# Restart services
docker-compose up -d

# Wait for PostgreSQL
echo "⏳ Waiting for PostgreSQL..."
sleep 5

echo "✅ Database reset complete!"
