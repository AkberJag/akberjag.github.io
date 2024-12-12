#!/bin/bash
# Build and deploy script for publishing both Vue app and VitePress docs to GitHub Pages
#
# This script should be located in the scripts/ directory of your project.
# To run: bash scripts/deploy.sh from the project root
#
set -e

# Get the directory where the script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Get the project root directory (parent of scripts directory)
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "🚀 Starting build and deployment process..."
echo "📂 Project root: $PROJECT_ROOT"

# Change to project root
cd "$PROJECT_ROOT"

# Ensure we're in the project root
if [ ! -d "frontend" ]; then
    echo "❌ Error: frontend directory not found. Are you in the project root?"
    exit 1
fi

# Build Vue app
echo "📱 Building Vue app..."
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

# Build the Vue app
echo "🔨 Building the Vue app..."
npm run build

# Check if Vue build was successful
if [ ! -d "dist" ]; then
    echo "❌ Vue build failed: dist directory not found"
    exit 1
fi

# Build VitePress docs
echo "📚 Building VitePress documentation..."

# Build the docs using the npm script from the same package.json
echo "🔨 Building the documentation..."
npm run docs:build

# Check if docs build was successful
if [ ! -d "docs/.vitepress/dist" ]; then
    echo "❌ Docs build failed: docs/.vitepress/dist directory not found"
    exit 1
fi

# Go back to project root
cd "$PROJECT_ROOT"

# Create deployment directory
echo "📂 Creating deployment directory..."
rm -rf deploy_tmp
mkdir -p deploy_tmp
cp -r frontend/dist/* deploy_tmp/
mkdir -p deploy_tmp/docs
cp -r frontend/docs/.vitepress/dist/* deploy_tmp/docs/

# Force add and commit the new build
echo "📝 Committing the new build..."
git add deploy_tmp -f
git commit -m "🚀 deploy: Deploy version ${VERSION} with docs" || echo "No changes to commit"

echo "📦 Publishing to gh-pages branch..."

# Get the current git branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Push the subtree
if git subtree push --prefix deploy_tmp origin gh-pages; then
    echo "✅ Successfully deployed to GitHub Pages!"
else
    echo "❌ Deployment failed. If you get a 'updates were rejected' error, try running:"
    echo "git push origin `git subtree split --prefix deploy_tmp $current_branch`:gh-pages --force"
fi

# Push changes to remote
echo "🔄 Pushing changes to remote..."
git push origin $current_branch

# Cleanup
echo "🧹 Cleaning up..."
rm -rf deploy_tmp

echo "✨ All done! Version ${VERSION} has been deployed to GitHub Pages with documentation."