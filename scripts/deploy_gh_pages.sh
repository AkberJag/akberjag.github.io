#!/bin/bash

# Navigate to the frontend directory
cd frontend

# Install dependencies (if not already installed)
echo "Installing dependencies..."
npm install

# Build the Vue project
echo "Building the Vue project..."
npm run build

# Build the documentation
echo "Building the documentation..."
npm run docs:build

# Navigate back to the root directory
cd ..

# Create a temporary directory for deployment
echo "Creating temporary directory for deployment..."
mkdir -p .temp-deploy
cp -r frontend/dist/* .temp-deploy/
cp -r frontend/docs/.vitepress/dist/* .temp-deploy/docs/

# Switch to the gh-pages branch
echo "Switching to the gh-pages branch..."
git checkout gh-pages

# Remove all existing files except .git
echo "Clearing existing files..."
git rm -rf .
git clean -fxd

# Copy the built files to the root directory (excluding .temp-deploy)
echo "Copying built files to the root directory..."
cp -r .temp-deploy/* .

# Add all files to the git index (excluding .temp-deploy)
echo "Adding files to git..."
git add .

# Commit the changes
echo "Committing changes..."
git commit -m "Deploy Vue project and documentation to gh-pages"

# Push the changes to the gh-pages branch
echo "Pushing changes to gh-pages branch..."
git push origin gh-pages

# Switch back to the main branch
echo "Switching back to the main branch..."
git checkout main

# Clean up temporary files
echo "Cleaning up temporary files..."
rm -rf .temp-deploy

echo "Deployment completed successfully!"