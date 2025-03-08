#!/bin/bash
set -o pipefail

# Exit immediately if a command exits with a non-zero status, but allow for error handling
trap 'exit_status=$?' ERR

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

# Store the start directory
START_DIR=$(pwd)
TEMP_DIR=""
CURRENT_BRANCH=""

# Setup cleanup function to ensure we always clean up and switch back
cleanup() {
  # Return to start directory
  cd "$START_DIR" || print_message "Failed to return to start directory" "$RED"
  
  # Switch back to the original branch if needed
  if [[ -n "$CURRENT_BRANCH" && "$(git branch --show-current)" != "$CURRENT_BRANCH" ]]; then
    print_message "Switching back to $CURRENT_BRANCH branch..." "$BLUE"
    git checkout "$CURRENT_BRANCH" || print_message "Failed to switch back to $CURRENT_BRANCH" "$RED"
  fi
  
  # Clean up temporary directory
  if [[ -n "$TEMP_DIR" && -d "$TEMP_DIR" ]]; then
    print_message "Cleaning up temporary files..." "$YELLOW"
    rm -rf "$TEMP_DIR"
  fi
}

# Set trap to call cleanup function on exit, interrupt, or error
trap cleanup EXIT INT TERM

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
cd frontend || exit 1
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

# Check for build directory
if [ ! -d "dist" ]; then
  print_message "Warning: Vue build directory (dist) not found. Check your build configuration." "$YELLOW"
else
  print_message "Vue build successful - output directory: $(pwd)/dist" "$GREEN"
fi

# Build Vitepress documentation
print_message "Setting up Vitepress documentation..." "$YELLOW"

# Detect if Vitepress is installed
if grep -q "vitepress" package.json; then
  print_message "Vitepress detected in package.json" "$CYAN"
  
  # Check if there's a specific script for building docs
  if grep -q "\"docs:build\"" package.json; then
    print_message "Running docs:build script..." "$YELLOW"
    npm run docs:build
    if [ $? -ne 0 ]; then
      print_message "Warning: Failed to build docs with docs:build script. Trying alternative methods..." "$YELLOW"
    fi
  else
    print_message "No docs:build script found. Attempting to build Vitepress directly..." "$YELLOW"
    # Try to run vitepress build directly
    if [ -d "node_modules/.bin/vitepress" ]; then
      print_message "Running vitepress build command..." "$YELLOW"
      npx vitepress build docs
      if [ $? -ne 0 ]; then
        print_message "Warning: Failed to build docs with vitepress command." "$YELLOW"
      fi
    fi
  fi
fi

# Look for built Vitepress docs
print_message "Looking for Vitepress build output..." "$CYAN"

DOCS_COPIED=false

# Create docs directory in temp dir
mkdir -p "$TEMP_DIR/docs"

# Check common Vitepress output locations
if [ -d "docs/.vitepress/dist" ]; then
  print_message "Found Vitepress docs at docs/.vitepress/dist" "$GREEN"
  cp -r docs/.vitepress/dist/* "$TEMP_DIR/docs/"
  DOCS_COPIED=true
elif [ -d ".vitepress/dist" ]; then
  print_message "Found Vitepress docs at .vitepress/dist" "$GREEN"
  cp -r .vitepress/dist/* "$TEMP_DIR/docs/"
  DOCS_COPIED=true
else
  # Try to search for the dist directory
  print_message "Searching for Vitepress dist directory..." "$YELLOW"
  VITEPRESS_DIST=$(find . -type d -name "dist" -path "*vitepress*" | head -n 1)
  
  if [ -n "$VITEPRESS_DIST" ]; then
    print_message "Found Vitepress docs at $VITEPRESS_DIST" "$GREEN"
    cp -r "$VITEPRESS_DIST"/* "$TEMP_DIR/docs/"
    DOCS_COPIED=true
  else
    print_message "No built Vitepress docs found. Copying raw docs files instead..." "$YELLOW"
    
    # Copy raw docs if they exist
    if [ -d "docs" ]; then
      print_message "Copying raw docs directory..." "$YELLOW"
      cp -r docs "$TEMP_DIR/"
      DOCS_COPIED=true
    fi
  fi
fi

if [ "$DOCS_COPIED" = false ]; then
  print_message "Warning: Could not find any docs to copy." "$YELLOW"
fi

# Copy Vue build to temp directory
if [ -d "dist" ]; then
  print_message "Copying Vue build files to temp directory..." "$CYAN"
  cp -r dist/* "$TEMP_DIR/"
else
  print_message "Error: Vue dist directory not found. Build may have failed." "$RED"
  exit 1
fi

# Return to project root
cd "$START_DIR" || exit 1

# Switch to gh-pages branch (create if it doesn't exist)
print_message "Switching to gh-pages branch..." "$PURPLE"
if git show-ref --verify --quiet refs/heads/gh-pages; then
  git checkout gh-pages
else
  git checkout --orphan gh-pages
  git rm -rf .
  touch .nojekyll # Ensure GitHub doesn't process files with Jekyll
fi

# Remove everything except .git folder and .nojekyll
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
if ! git push origin gh-pages; then
  print_message "Push rejected. Attempting force push with --force-with-lease..." "$YELLOW"
  
  # Ask for confirmation before force pushing
  read -p "$(echo -e "${YELLOW}Remote gh-pages branch has diverged. Force push? (y/n): ${RESET}")" -n 1 -r
  echo
  
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    if git push --force-with-lease origin gh-pages; then
      print_message "Force push successful." "$GREEN"
    else
      print_message "Force push failed. Attempting full force push..." "$YELLOW"
      
      read -p "$(echo -e "${RED}Try with full force push? This will overwrite remote changes completely (y/n): ${RESET}")" -n 1 -r
      echo
      
      if [[ $REPLY =~ ^[Yy]$ ]]; then
        if git push --force origin gh-pages; then
          print_message "Full force push successful." "$GREEN"
        else
          print_message "Failed to push to GitHub Pages. Manual intervention required." "$RED"
          print_message "You can run: git push --force origin gh-pages" "$YELLOW"
          exit 1
        fi
      else
        print_message "Deployment aborted. Your local gh-pages branch has the changes, but they weren't pushed." "$RED"
        exit 1
      fi
    fi
  else
    print_message "Deployment aborted. Your local gh-pages branch has the changes, but they weren't pushed." "$RED"
    print_message "You might want to pull changes first with: git pull origin gh-pages" "$YELLOW"
    exit 1
  fi
fi

# Print success message
print_message "✅ Deployment to GitHub Pages completed successfully!" "$GREEN"
REPO_URL=$(git config --get remote.origin.url)
GITHUB_PAGES_URL=$(echo "$REPO_URL" | sed -e 's/^https:\/\/github.com\///' -e 's/^git@github.com://' -e 's/\.git$//' | awk -F/ '{print $1".github.io/"$2}')
print_message "🌐 Your site should be available at: https://$GITHUB_PAGES_URL/" "$GREEN"
print_message "📚 Your docs should be available at: https://$GITHUB_PAGES_URL/docs/" "$GREEN"