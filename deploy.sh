#!/bin/bash

set -e

# Ensure you're on the main branch
git checkout main

# Pull the latest changes
git pull origin main

# Navigate to the frontend folder
cd frontend

# Install dependencies
npm install

# Build the project using npx
npx vite build

# Check if the build was successful
if [ $? -eq 0 ]; then
    # Navigate back to the project root
    cd ..

    # Add all changes in the frontend/dist folder
    git add frontend/dist -f

    # Commit the changes
    git commit -m "🚀 deploy: Deploy the latest version"

    # Push the frontend/dist folder to the gh-pages branch
    git subtree push --prefix frontend/dist origin gh-pages

    # Switch back to the main branch
    git checkout main

    echo "Build and deployment completed successfully!"
else
    echo "Build failed. Deployment aborted."
    exit 1
fi