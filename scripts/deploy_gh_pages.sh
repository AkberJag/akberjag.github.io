#!/bin/bash
# Build and deploy script for publishing frontend dist folder to GitHub Pages
#
# This script automates the process of building a frontend project and its documentation
# and deploying the `dist` folder to the `gh-pages` branch on GitHub for hosting via GitHub Pages.
#
set -euo pipefail
echo "🚀 Starting build and deployment process..."

# Define cleanup function
cleanup() {
    echo "🧹 Cleaning up temporary files and directories..."
    if [ -d "gh-pages-temp" ]; then
        rm -rf gh-pages-temp || { echo "⚠️ Warning: Failed to remove gh-pages-temp directory"; }
    fi
    if [ -d "frontend/docs-dist" ]; then
        rm -rf frontend/docs-dist || { echo "⚠️ Warning: Failed to remove docs-dist directory"; }
    fi
    echo "✅ Cleanup complete!"
}

# Trap EXIT signal to ensure cleanup runs even if the script fails
trap cleanup EXIT

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

# Get version from package.json
VERSION=$(node -p "require('./package.json').version" || echo "latest")
if [ -z "$VERSION" ]; then
    echo "⚠️ Warning: Could not get version from package.json, using 'latest' instead"
    VERSION="latest"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    if ! npm install; then
        echo "❌ Error: Failed to install dependencies"
        exit 1
    fi
fi

# Check if docs directory exists
if [ ! -d "docs" ]; then
    echo "❌ Error: docs directory not found in frontend directory"
    exit 1
fi

# Build the docs
echo "📚 Building the documentation..."
if ! npm run docs:build; then
    echo "❌ Error: Docs build failed"
    exit 1
fi

# Check if docs build was successful
if [ ! -d "docs/.vitepress/dist" ]; then
    echo "❌ Docs build failed: docs/.vitepress/dist directory not found"
    exit 1
fi

# Copy docs dist to a separate directory for deployment
echo "📋 Copying docs build to docs-dist directory..."
mkdir -p docs-dist || { echo "❌ Error: Failed to create docs-dist directory"; exit 1; }
cp -r docs/.vitepress/dist/* docs-dist/ || { echo "❌ Error: Failed to copy docs build to docs-dist"; exit 1; }

# Build the project
echo "🔨 Building the main project..."
if ! npm run build; then
    echo "❌ Error: Build failed"
    exit 1
fi

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed: dist directory not found"
    exit 1
fi

# Copy docs to the dist directory
echo "🔄 Copying documentation to dist/docs directory..."
mkdir -p dist/docs || { echo "❌ Error: Failed to create dist/docs directory"; exit 1; }
cp -r docs-dist/* dist/docs/ || { echo "❌ Error: Failed to copy docs to dist/docs"; exit 1; }

# Go back to project root
cd .. || { echo "❌ Error: Failed to navigate back to project root"; exit 1; }

# Get the current git branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Create a temp directory for the gh-pages branch
echo "📂 Creating temporary directory for gh-pages content..."
mkdir -p gh-pages-temp

# Copy the build files to the temporary directory
echo "📋 Copying dist files to temporary directory..."
cp -r frontend/dist/* gh-pages-temp/

# Deploy to gh-pages using a more reliable approach
echo "📦 Publishing to gh-pages branch..."
cd gh-pages-temp || { echo "❌ Error: Failed to navigate to gh-pages-temp"; exit 1; }

# Initialize git in the temp directory
git init
git checkout -b gh-pages
git add .
git commit -m "Deploy version ${VERSION} to GitHub Pages"

# Force push to the gh-pages branch
if git push -f git@github.com:$(git config --get remote.origin.url | sed -E 's/.*[:/](.*)\/(.*).git/\1\/\2/') gh-pages; then
    echo "✅ Successfully deployed to GitHub Pages!"
else
    echo "❌ Deployment failed."
    exit 1
fi

# Go back to project root
cd .. || { echo "❌ Error: Failed to navigate back to project root"; exit 1; }

# Push changes to remote (excluding the dist folder)
echo "🔄 Pushing changes to remote (excluding dist folder)..."
if ! git push origin "$current_branch"; then
    echo "❌ Error: Failed to push changes to remote"
    exit 1
fi

echo "✨ All done! Version ${VERSION} has been deployed to GitHub Pages with documentation and pushed to remote."