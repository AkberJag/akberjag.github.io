#!/bin/bash
# Build and deploy script for publishing frontend dist folder to GitHub Pages
# Exit on error
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

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building the project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed: dist directory not found"
    exit 1
fi

# Go back to project root
cd ..

# Force add and commit the new build
echo "📝 Committing the new build..."
git add frontend/dist -f
git commit -m "🚀 deploy: Deploy the latest version" || echo "No changes to commit"

echo "📦 Publishing frontend/dist folder to gh-pages branch..."

# Get the current git branch
current_branch=$(git rev-parse --abbrev-ref HEAD)

# Push the subtree
if git subtree push --prefix frontend/dist origin gh-pages; then
    echo "✅ Successfully deployed to GitHub Pages!"
else
    echo "❌ Deployment failed. If you get a 'updates were rejected' error, try running:"
    echo "git push origin `git subtree split --prefix frontend/dist $current_branch`:gh-pages --force"
fi

# Push changes to remote
echo "🔄 Pushing changes to remote..."
git push origin $current_branch

echo "✨ All done! Changes have been deployed to GitHub Pages and pushed to remote."