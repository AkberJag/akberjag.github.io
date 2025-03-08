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
BUILD_TEMP_DIR=""
WORKTREE_DIR=""

# Setup cleanup function to ensure we always clean up
cleanup() {
  # Return to start directory
  cd "$START_DIR" || print_message "Failed to return to start directory" "$RED"
  
  # Clean up temporary build directory
  if [[ -n "$BUILD_TEMP_DIR" && -d "$BUILD_TEMP_DIR" ]]; then
    print_message "Cleaning up temporary build files..." "$YELLOW"
    rm -rf "$BUILD_TEMP_DIR"
  fi
  
  # Remove git worktree if it exists
  if [[ -n "$WORKTREE_DIR" && -d "$WORKTREE_DIR" ]]; then
    print_message "Removing git worktree..." "$YELLOW"
    git worktree remove --force "$WORKTREE_DIR" 2>/dev/null || rm -rf "$WORKTREE_DIR"
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

# Get current branch name
CURRENT_BRANCH=$(git branch --show-current)
print_message "Current branch: $CURRENT_BRANCH" "$BLUE"

# Ensure the working directory is clean
if [[ -n $(git status --porcelain) ]]; then
  print_message "Error: Working directory is not clean. Please commit or stash your changes before deploying." "$RED"
  exit 1
fi

# Define the target branch for GitHub Pages
TARGET_BRANCH="gh-pages"
print_message "Target branch: $TARGET_BRANCH" "$BLUE"

# Create a temporary directory for the build
BUILD_TEMP_DIR=$(mktemp -d)
print_message "Created temporary directory for build: $BUILD_TEMP_DIR" "$BLUE"

# Create another temporary directory for the git worktree
WORKTREE_DIR=$(mktemp -d)
print_message "Created temporary directory for git worktree: $WORKTREE_DIR" "$BLUE"

# Check if the target branch exists
if ! git show-ref --verify --quiet refs/heads/$TARGET_BRANCH; then
  print_message "$TARGET_BRANCH branch doesn't exist yet. Creating it..." "$YELLOW"
  git checkout --orphan $TARGET_BRANCH
  git rm -rf .
  touch .nojekyll
  git add .nojekyll
  git commit -m "Initial $TARGET_BRANCH branch commit"
  git push origin $TARGET_BRANCH
  git checkout "$CURRENT_BRANCH"
fi

# Create git worktree for the target branch
print_message "Creating git worktree for $TARGET_BRANCH branch..." "$PURPLE"
if ! git worktree add "$WORKTREE_DIR" $TARGET_BRANCH; then
  print_message "Failed to create git worktree." "$RED"
  exit 1
fi

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

# Create docs directory in build temp dir
mkdir -p "$BUILD_TEMP_DIR/docs"

# Check common Vitepress output locations
if [ -d "docs/.vitepress/dist" ]; then
  print_message "Found Vitepress docs at docs/.vitepress/dist" "$GREEN"
  cp -r docs/.vitepress/dist/* "$BUILD_TEMP_DIR/docs/"
  DOCS_COPIED=true
elif [ -d ".vitepress/dist" ]; then
  print_message "Found Vitepress docs at .vitepress/dist" "$GREEN"
  cp -r .vitepress/dist/* "$BUILD_TEMP_DIR/docs/"
  DOCS_COPIED=true
else
  # Try to search for the dist directory
  print_message "Searching for Vitepress dist directory..." "$YELLOW"
  VITEPRESS_DIST=$(find . -type d -name "dist" -path "*vitepress*" | head -n 1)
  
  if [ -n "$VITEPRESS_DIST" ]; then
    print_message "Found Vitepress docs at $VITEPRESS_DIST" "$GREEN"
    cp -r "$VITEPRESS_DIST"/* "$BUILD_TEMP_DIR/docs/"
    DOCS_COPIED=true
  else
    print_message "No built Vitepress docs found. Copying raw docs files instead..." "$YELLOW"
    
    # Copy raw docs if they exist
    if [ -d "docs" ]; then
      print_message "Copying raw docs directory..." "$YELLOW"
      cp -r docs "$BUILD_TEMP_DIR/"
      DOCS_COPIED=true
    fi
  fi
fi

if [ "$DOCS_COPIED" = false ]; then
  print_message "Warning: Could not find any docs to copy." "$YELLOW"
fi

# Copy Vue build to build temp directory
if [ -d "dist" ]; then
  print_message "Copying Vue build files to build temp directory..." "$CYAN"
  cp -r dist/* "$BUILD_TEMP_DIR/"
else
  print_message "Error: Vue dist directory not found. Build may have failed." "$RED"
  exit 1
fi

# Navigate to worktree directory
cd "$WORKTREE_DIR" || exit 1

# Remove everything in the worktree except .git
print_message "Cleaning $TARGET_BRANCH branch in worktree..." "$PURPLE"
find . -maxdepth 1 ! -name '.git' ! -name '.' -exec rm -rf {} \;

# Add a .nojekyll file to bypass GitHub Pages Jekyll processing
touch .nojekyll

# Copy build files from build temp directory
print_message "Copying build files to $TARGET_BRANCH branch worktree..." "$CYAN"
cp -r "$BUILD_TEMP_DIR"/* .

# Stage all files
print_message "Staging files for commit..." "$GREEN"
git add -A

# Check if there are changes to commit
if [[ -z $(git status --porcelain) ]]; then
  print_message "No changes to commit. Deployment skipped." "$YELLOW"
  exit 0
fi

# Commit changes
print_message "Committing changes to $TARGET_BRANCH branch..." "$GREEN"
git commit -m "Deploy to GitHub Pages: $(date)"

# Push to remote target branch
print_message "Pushing to $TARGET_BRANCH branch..." "$GREEN"
if ! git push origin $TARGET_BRANCH; then
  print_message "Push rejected. Attempting force push with --force-with-lease..." "$YELLOW"
  
  # Ask for confirmation before force pushing
  read -p "$(echo -e "${YELLOW}Remote $TARGET_BRANCH branch has diverged. Force push? (y/n): ${RESET}")" -n 1 -r
  echo
  
  if [[ $REPLY =~ ^[Yy]$ ]]; then
    if git push --force-with-lease origin $TARGET_BRANCH; then
      print_message "Force push successful." "$GREEN"
    else
      print_message "Force push failed. Attempting full force push..." "$YELLOW"
      
      read -p "$(echo -e "${RED}Try with full force push? This will overwrite remote changes completely (y/n): ${RESET}")" -n 1 -r
      echo
      
      if [[ $REPLY =~ ^[Yy]$ ]]; then
        if git push --force origin $TARGET_BRANCH; then
          print_message "Full force push successful." "$GREEN"
        else
          print_message "Failed to push to GitHub Pages. Manual intervention required." "$RED"
          print_message "You can manually run: git push --force origin $TARGET_BRANCH" "$YELLOW"
          exit 1
        fi
      else
        print_message "Deployment aborted. Your local $TARGET_BRANCH branch has the changes, but they weren't pushed." "$RED"
        exit 1
      fi
    fi
  else
    print_message "Deployment aborted. Your local $TARGET_BRANCH branch has the changes, but they weren't pushed." "$RED"
    print_message "You might want to pull changes first with: git pull origin $TARGET_BRANCH" "$YELLOW"
    exit 1
  fi
fi

# Return to project root
cd "$START_DIR" || exit 1

# Print success message
print_message "✅ Deployment to GitHub Pages completed successfully!" "$GREEN"