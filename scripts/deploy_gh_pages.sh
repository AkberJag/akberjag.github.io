#!/bin/bash
# Enhanced build and deploy script for publishing Vite project and VitePress docs to GitHub Pages
#
# This script automates the process of building both the frontend project and the documentation
# and then deploying them to the `gh-pages` branch on GitHub for hosting via GitHub Pages.
#
# Key Enhancements:
# - Builds both the Vite frontend app (`frontend`) and VitePress documentation (`frontend/docs`).
# - Ensures a clean deployment by using a temporary deployment directory.
# - Avoids committing the `dist` folder to the main branch.
# - Uses `git worktree` for better `gh-pages` branch management.
#
# How to run this script:
# 1. Ensure you're in the project root directory.
# 2. Run: `bash scripts/deploy_gh_pages.sh`
#
set -e

echo "🚀 Starting build and deployment process..."

# Ensure we're in the project root
test -d "frontend" || { echo "❌ Error: frontend directory not found. Are you in the project root?"; exit 1; }

# Navigate to frontend directory
cd frontend

# Ensure package.json exists
test -f "package.json" || { echo "❌ Error: package.json not found in frontend directory"; exit 1; }

# Get version from package.json
VERSION=$(node -p "require('./package.json').version" 2>/dev/null || echo "latest")

echo "📦 Installing dependencies (if needed)..."
[ -d "node_modules" ] || npm install

# Build the frontend project
echo "🔨 Building the frontend..."
npm run build

test -d "dist" || { echo "❌ Build failed: dist directory not found"; exit 1; }

echo "📖 Building the documentation..."
npm run docs:build

test -d "docs/.vitepress/dist" || { echo "❌ Docs build failed: docs/.vitepress/dist directory not found"; exit 1; }

# Move back to project root
cd ..

echo "📂 Preparing deployment directory..."
DEPLOY_DIR="gh-pages-deploy"
rm -rf $DEPLOY_DIR
mkdir $DEPLOY_DIR

# Copy build outputs to deployment directory
cp -r frontend/dist/* $DEPLOY_DIR/
mkdir -p $DEPLOY_DIR/docs
cp -r frontend/docs/.vitepress/dist/* $DEPLOY_DIR/docs/

# Switch to gh-pages branch using git worktree
BRANCH="gh-pages"

git fetch origin $BRANCH

echo "🌿 Checking out gh-pages branch..."
git worktree add $DEPLOY_DIR $BRANCH || { echo "❌ Failed to checkout $BRANCH. Ensure the branch exists."; exit 1; }

cd $DEPLOY_DIR

echo "📝 Committing and pushing changes..."
git add .
git commit -m "🚀 deploy: Deploy version ${VERSION}" || echo "No changes to commit"
git push origin $BRANCH

cd ..
git worktree remove $DEPLOY_DIR -f
rm -rf $DEPLOY_DIR

echo "✅ Deployment successful! Version ${VERSION} is live on GitHub Pages."