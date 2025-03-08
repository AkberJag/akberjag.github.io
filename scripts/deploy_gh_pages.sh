#!/bin/bash
set -e
echo "🚀 Starting build and deployment process..."

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

# Build the main project
echo "🔨 Building the main project..."
npm run build

# Build the docs
echo "📚 Building the documentation..."
npm run docs:build

# Check if builds were successful
if [ ! -d "dist" ]; then
    echo "❌ Main project build failed: dist directory not found"
    exit 1
fi

DOCS_DIST_DIR="docs/.vitepress/dist"
if [ ! -d "$DOCS_DIST_DIR" ]; then
    echo "❌ Docs build failed: $DOCS_DIST_DIR directory not found"
    exit 1
fi

# Go back to project root
cd ..

# Create a temporary deploy directory
echo "📦 Preparing deployment..."
TEMP_DEPLOY_DIR=.temp-deploy
rm -rf $TEMP_DEPLOY_DIR
mkdir -p $TEMP_DEPLOY_DIR

# Copy main project dist
cp -R frontend/dist/* $TEMP_DEPLOY_DIR

# Create docs subdirectory and copy docs dist
mkdir -p $TEMP_DEPLOY_DIR/docs
cp -R frontend/$DOCS_DIST_DIR/* $TEMP_DEPLOY_DIR/docs

# Set up deployment branch with git worktree
echo "🚀 Deploying to GitHub Pages..."
DEPLOY_BRANCH="gh-pages"
WORKTREE_DIR=$(mktemp -d)

# Check if the deploy branch exists
if git show-ref --verify --quiet refs/heads/$DEPLOY_BRANCH; then
    git worktree add $WORKTREE_DIR $DEPLOY_BRANCH
else
    git worktree add --orphan $DEPLOY_BRANCH $WORKTREE_DIR
fi

# Clear existing files in worktree
cd $WORKTREE_DIR
find . -mindepth 1 -not -name '.git' -exec rm -rf {} + 2>/dev/null || true

# Copy new build files
cp -R $OLDPWD/$TEMP_DEPLOY_DIR/* .

# Commit and push
git add -A
git commit -m "🚀 deploy: Deploy version ${VERSION} (main and docs)" || echo "No changes to commit"
git push origin $DEPLOY_BRANCH --force

# Cleanup
cd $OLDPWD
rm -rf $WORKTREE_DIR
git worktree prune
rm -rf $TEMP_DEPLOY_DIR

echo "✅ Successfully deployed to GitHub Pages!"

# Push changes to current branch (without dist)
echo "🔄 Pushing changes to remote..."
git push origin $(git rev-parse --abbrev-ref HEAD)

echo "✨ All done! Version ${VERSION} has been deployed to GitHub Pages and pushed to remote."