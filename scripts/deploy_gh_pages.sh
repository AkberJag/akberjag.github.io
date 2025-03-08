#!/bin/bash

# Colors for terminal output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
RESET='\033[0m' # Reset color

# Function to print colored messages
print_message() {
  echo -e "${2}${1}${RESET}"
}

# Check if git is installed
if ! command -v git &> /dev/null; then
  print_message "Git is not installed. Please install git first." "$RED"
  exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null; then
  print_message "npm is not installed. Please install Node.js and npm first." "$RED"
  exit 1
fi

# Ensure we're in the project root
if [ ! -d "frontend" ]; then
  print_message "Error: frontend directory not found. Make sure you're running this from the project root." "$RED"
  exit 1
fi

# Store current branch name
CURRENT_BRANCH=$(git branch --show-current)
print_message "Current branch: $CURRENT_BRANCH" "$BLUE"

# Ensure the working directory is clean
if [[ -n $(git status --porcelain) ]]; then
  print_message "Error: Working directory is not clean. Please commit or stash your changes before deploying." "$RED"
  exit 1
fi

# Create a temporary directory for the build
TEMP_DIR=$(mktemp -d)
print_message "Created temporary directory for build: $TEMP_DIR" "$BLUE"

# Install dependencies in the frontend directory
print_message "Installing dependencies..." "$YELLOW"
cd frontend
npm install
if [ $? -ne 0 ]; then
  print_message "Failed to install dependencies." "$RED"
  exit 1
fi

# Build the Vue application
print_message "Building Vue application..." "$YELLOW"
npm run build
if [ $? -ne 0 ]; then
  print_message "Failed to build Vue application." "$RED"
  exit 1
fi

# Check if Vitepress docs exist
if [ -d "docs" ]; then
  print_message "Building Vitepress documentation..." "$YELLOW"
  
  # Check if docs have their own package.json
  if [ -f "docs/package.json" ]; then
    cd docs
    npm install
    npm run build
    if [ $? -ne 0 ]; then
      print_message "Failed to build Vitepress documentation." "$RED"
      exit 1
    fi
    cd ..
  else
    # Try to build docs from frontend root
    npm run docs:build
    if [ $? -ne 0 ]; then
      print_message "Failed to build Vitepress documentation." "$RED"
      exit 1
    fi
  fi
  
  # Copy Vitepress build to temp directory
  print_message "Copying Vitepress documentation to temp directory..." "$CYAN"
  if [ -d "docs/.vitepress/dist" ]; then
    cp -r docs/.vitepress/dist/* "$TEMP_DIR/docs"
  fi
fi

# Copy Vue build to temp directory
print_message "Copying Vue build files to temp directory..." "$CYAN"
cp -r dist/* "$TEMP_DIR"

# Return to project root
cd ..

# Switch to gh-pages branch (create if it doesn't exist)
print_message "Switching to gh-pages branch..." "$PURPLE"
if git show-ref --verify --quiet refs/heads/gh-pages; then
  git checkout gh-pages
else
  git checkout --orphan gh-pages
  git rm -rf .
  touch .nojekyll # Ensure GitHub doesn't process files with Jekyll
fi

# Remove everything except .git folder
print_message "Cleaning gh-pages branch..." "$PURPLE"
find . -maxdepth 1 ! -name '.git' ! -name '.' ! -name '.nojekyll' -exec rm -rf {} \;

# Copy build files from temp directory
print_message "Copying build files to gh-pages branch..." "$CYAN"
cp -r "$TEMP_DIR"/* .

# Add a .nojekyll file to bypass GitHub Pages Jekyll processing
touch .nojekyll

# Stage all files
print_message "Staging files for commit..." "$GREEN"
git add -A

# Commit changes
print_message "Committing changes to gh-pages branch..." "$GREEN"
git commit -m "Deploy to GitHub Pages: $(date)"

# Push to remote gh-pages branch
print_message "Pushing to GitHub Pages..." "$GREEN"
git push origin gh-pages

# Switch back to the original branch
print_message "Switching back to $CURRENT_BRANCH branch..." "$BLUE"
git checkout "$CURRENT_BRANCH"

# Clean up temporary directory
print_message "Cleaning up temporary files..." "$YELLOW"
rm -rf "$TEMP_DIR"

print_message "✅ Deployment to GitHub Pages completed successfully!" "$GREEN"
print_message "🌐 Your site should be available at: https://$(git config --get remote.origin.url | sed -e 's/^https:\/\/github.com\///' -e 's/^git@github.com://' -e 's/\.git$//' | awk -F/ '{print $1".github.io/"$2}')/" "$GREEN"