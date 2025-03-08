#!/bin/bash
# Enhanced build and deploy script for publishing both frontend and docs to GitHub Pages
#
# This script automates the process of building a frontend project and its documentation,
# then deploying them to the `gh-pages` branch on GitHub for hosting via GitHub Pages.
#
# Key Steps:
# 1. Verifies the environment and project structure
# 2. Builds both the main frontend project and VitePress documentation
# 3. Creates a temporary directory to stage the deployment
# 4. Copies both build outputs to the staging directory
# 5. Deploys to the gh-pages branch without affecting the main branch
#
# How to run this script:
# bash scripts/deploy_gh_pages.sh
#
set -e

echo "🚀 Starting enhanced build and deployment process..."

# Ensure we're in the project root
if [ ! -d "frontend" ]; then
    echo "❌ Error: frontend directory not found. Are you in the project root?"
    exit 1
fi

# Navigate to frontend directory
cd frontend

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in frontend directory"
    exit 1
fi

# Check if docs directory exists
if [ ! -d "docs" ]; then
    echo "❌ Error: docs directory not found in frontend directory"
    exit 1
fi

# Get version from package.json
VERSION=$(node -p "require('./package.json').version")
if [ -z "$VERSION" ]; then
    echo "⚠️ Warning: Could not get version from package.json, using 'latest' instead"
    VERSION="latest"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Create a fresh temp directory for deployment
echo "🗂️ Creating temporary deployment directory..."
TEMP_DEPLOY_DIR=$(mktemp -d)
echo "   Using temporary directory: $TEMP_DEPLOY_DIR"

# Build the main project
echo "🔨 Building the main project..."
npm run build

# Check if main build was successful
if [ ! -d "dist" ]; then
    echo "❌ Main build failed: dist directory not found"
    rm -rf "$TEMP_DEPLOY_DIR"
    exit 1
fi

# Copy main project build to temp deploy directory
echo "📋 Copying main build to deployment directory..."
cp -r dist/* "$TEMP_DEPLOY_DIR"

# Build the docs
echo "📚 Building documentation..."
npm run docs:build

# Check if docs build was successful
if [ ! -d "docs/.vitepress/dist" ]; then
    echo "❌ Docs build failed: docs/.vitepress/dist directory not found"
    rm -rf "$TEMP_DEPLOY_DIR"
    exit 1
fi

# Create docs subdirectory in the deployment directory
mkdir -p "$TEMP_DEPLOY_DIR/docs"

# Copy docs build to temp deploy directory
echo "📋 Copying docs build to deployment directory..."
cp -r docs/.vitepress/dist/* "$TEMP_DEPLOY_DIR/docs"

# Get the current git branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Go back to project root
cd ..

# Deploy to gh-pages
echo "📦 Publishing to gh-pages branch..."

# Get the deployment directory ready for gh-pages
cd "$TEMP_DEPLOY_DIR"
git init
git add .
git config user.name "GitHub Actions"
git config user.email "actions@github.com"
git commit -m "🚀 deploy: Deploy version ${VERSION}"

# Force push to the gh-pages branch
if git push -f "https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\(.*\)\.git/\1/')" HEAD:gh-pages; then
    echo "✅ Successfully deployed to GitHub Pages!"
else
    echo "❌ Deployment failed."
    exit 1
fi

# Clean up
echo "🧹 Cleaning up..."
cd ..
rm -rf "$TEMP_DEPLOY_DIR"

echo "✨ All done! Version ${VERSION} has been deployed to GitHub Pages."