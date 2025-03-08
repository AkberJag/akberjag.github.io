#!/bin/bash
# Build and deploy script for publishing frontend dist folder to GitHub Pages
#
# This script automates the process of building a frontend project and its documentation
# and deploying the `dist` folder to the `gh-pages` branch on GitHub for hosting via GitHub Pages.
#
set -euo pipefail

# Define temp directories to be cleaned up
TEMP_DIRS=("gh-pages-temp" "frontend/docs-dist" "frontend/dist")

# Enhanced cleanup function to remove all temporary directories
cleanup() {
    echo "🧹 Cleaning up temporary files and directories..."
    for dir in "${TEMP_DIRS[@]}"; do
        if [ -d "$dir" ]; then
            rm -rf "$dir" || echo "⚠️ Warning: Failed to remove $dir directory"
        fi
    done
    echo "✅ Cleanup complete!"
}

# Ensure cleanup happens no matter how the script exits
trap cleanup EXIT INT TERM

echo "🚀 Starting build and deployment process..."

# Store current directory to return to it later
CURRENT_DIR=$(pwd)

# Ensure we're in the project root
if [ ! -d "frontend" ]; then
    echo "❌ Error: frontend directory not found. Are you in the project root?"
    exit 1
fi

# Navigate to frontend directory
cd frontend || { echo "❌ Error: Failed to navigate to frontend directory"; exit 1; }

# Check if package.json exists
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found in frontend directory"
    exit 1
fi

# Get version from package.json with improved error handling
VERSION=$(node -p "try { require('./package.json').version } catch(e) { '' }" || echo "latest")
if [ -z "$VERSION" ]; then
    echo "⚠️ Warning: Could not get version from package.json, using 'latest' instead"
    VERSION="latest"
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install || { echo "❌ Error: Failed to install dependencies"; exit 1; }
fi

# Check if docs directory exists
if [ ! -d "docs" ]; then
    echo "❌ Error: docs directory not found in frontend directory"
    exit 1
fi

# Build the docs
echo "📚 Building the documentation..."
npm run docs:build || { echo "❌ Error: Docs build failed"; exit 1; }

# Check if docs build was successful
if [ ! -d "docs/.vitepress/dist" ]; then
    echo "❌ Docs build failed: docs/.vitepress/dist directory not found"
    exit 1
fi

# Copy docs dist to a separate directory for deployment
echo "📋 Copying docs build to docs-dist directory..."
mkdir -p docs-dist
cp -r docs/.vitepress/dist/* docs-dist/ || { echo "❌ Error: Failed to copy docs build"; exit 1; }

# Build the project
echo "🔨 Building the main project..."
npm run build || { echo "❌ Error: Build failed"; exit 1; }

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed: dist directory not found"
    exit 1
fi

# Copy docs to the dist directory
echo "🔄 Copying documentation to dist/docs directory..."
mkdir -p dist/docs
cp -r docs-dist/* dist/docs/ || { echo "❌ Error: Failed to copy docs to dist/docs"; exit 1; }

# Go back to project root
cd "$CURRENT_DIR" || { echo "❌ Error: Failed to navigate back to project root"; exit 1; }

# Get the current git branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Create a temp directory for the gh-pages branch
echo "📂 Creating temporary directory for gh-pages content..."
mkdir -p gh-pages-temp

# Copy the build files to the temporary directory
echo "📋 Copying dist files to temporary directory..."
cp -r frontend/dist/* gh-pages-temp/ || { echo "❌ Error: Failed to copy dist files"; exit 1; }

# Deploy to gh-pages
echo "📦 Publishing to gh-pages branch..."
cd gh-pages-temp || { echo "❌ Error: Failed to navigate to gh-pages-temp"; exit 1; }

# Get repository URL with better error handling
REPO_URL=$(git -C "$CURRENT_DIR" config --get remote.origin.url || echo "")
if [ -z "$REPO_URL" ]; then
    echo "❌ Error: Failed to get repository URL"
    exit 1
fi

# Extract username and repo name from the URL with better regex handling
REPO_PATH=$(echo "$REPO_URL" | sed -E 's/.*[:/]([^/]+\/[^/]+)(\.git)?$/\1/')
if [ -z "$REPO_PATH" ]; then
    echo "❌ Error: Failed to extract repo path from URL: $REPO_URL"
    exit 1
fi

# Initialize git in the temp directory with improved error handling
git init -q || { echo "❌ Error: Failed to initialize git repo"; exit 1; }
git checkout -b gh-pages || { echo "❌ Error: Failed to create gh-pages branch"; exit 1; }
git add . || { echo "❌ Error: Failed to stage files"; exit 1; }
git commit -m "Deploy version ${VERSION} to GitHub Pages" || { echo "❌ Error: Failed to commit files"; exit 1; }

# Force push to the gh-pages branch
echo "🔄 Pushing to gh-pages branch..."
if git push -f "git@github.com:${REPO_PATH}" gh-pages; then
    echo "✅ Successfully deployed to GitHub Pages!"
else
    echo "❌ Deployment failed."
    exit 1
fi

# Go back to project root
cd "$CURRENT_DIR" || { echo "❌ Error: Failed to navigate back to project root"; exit 1; }

# Push changes to remote (excluding the dist folder)
echo "🔄 Pushing changes to remote (current branch: $current_branch)..."
git push origin "$current_branch" || { echo "❌ Error: Failed to push changes to remote"; exit 1; }

echo "✨ All done! Version ${VERSION} has been deployed to GitHub Pages with documentation and pushed to remote."