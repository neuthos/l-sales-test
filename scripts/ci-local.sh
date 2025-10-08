#!/bin/bash

# Script to simulate CI/CD pipeline locally
# This runs the same checks that GitHub Actions will run

set -e  # Exit on any error

echo "🚀 Running CI/CD Pipeline Locally..."
echo ""

# Step 1: Linter
echo "📋 Step 1/3: Running linter..."
npm run lint
echo "✅ Linter passed"
echo ""

# Step 2: Unit Tests
echo "🧪 Step 2/3: Running unit tests..."
npm run test:ci
echo "✅ Tests passed"
echo ""

# Step 3: Build
echo "🏗️  Step 3/3: Building project..."
npm run build
echo "✅ Build successful"
echo ""

echo "✨ All CI checks passed! Ready to push! ✨"
