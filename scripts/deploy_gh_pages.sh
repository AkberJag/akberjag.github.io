# Create a temporary directory for our deployment files
echo -e "${PURPLE}📁 Creating temporary directory for deployment...${NC}"
mkdir -p $TEMP_DIR#!/bin/bash

# Exit script if any command fails
set -e

# Colors for better readability
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
MAIN_BRANCH="main"  # Change this to your main branch name if different (e.g., master)
DEPLOY_BRANCH="gh-pages"
FRONTEND_DIR="frontend"  # Your frontend code location
BUILD_DIR="$FRONTEND_DIR/dist"  # Vue build directory
DOCS_DIR="$FRONTEND_DIR/docs"  # Documentation directory inside frontend
DOCS_BUILD_DIR="$DOCS_DIR/.vitepress/dist"  # Vitepress build directory
TEMP_DIR="gh-pages-tmp"

echo -e "${CYAN}🚀 Starting deployment process...${NC}"

# Save current branch to return to it later
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${BLUE}📌 Current branch: ${YELLOW}$CURRENT_BRANCH${NC}"

# Make sure we have the latest changes
echo -e "${BLUE}⬇️ Pulling latest changes from ${YELLOW}$MAIN_BRANCH${BLUE}...${NC}"
git checkout $MAIN_BRANCH
git pull origin $MAIN_BRANCH

# Install dependencies in frontend directory
echo -e "${CYAN}📦 Installing frontend dependencies...${NC}"
cd $FRONTEND_DIR
npm install
cd ..

# No need for separate docs installation since docs are inside frontend

# Build main Vue application
echo -e "${GREEN}🔨 Building Vue application...${NC}"
cd $FRONTEND_DIR
# Use npx to ensure we use the locally installed vite
npx vite build
cd ..

# Build Vitepress documentation
echo -e "${GREEN}📚 Building Vitepress documentation...${NC}"
cd $DOCS_DIR
# Use npx to ensure we use the locally installed vitepress
npx vitepress build
cd ../..  # Return to project root (two levels up from docs dir)

# Clean up any existing temporary directory to avoid conflicts
if [ -d "$TEMP_DIR" ]; then
  echo -e "${RED}🗑️ Removing existing temporary directory...${NC}"
  rm -rf $TEMP_DIR
fi

# Copy built files to the temporary directory
echo -e "${PURPLE}📋 Copying main app build files...${NC}"
cp -r $BUILD_DIR/* $TEMP_DIR/

# Create a docs subdirectory in the temp folder
echo -e "${PURPLE}📋 Copying documentation files...${NC}"
mkdir -p $TEMP_DIR/docs
cp -r $DOCS_BUILD_DIR/* $TEMP_DIR/docs/

# Switch to the gh-pages branch
echo -e "${YELLOW}🔄 Switching to ${CYAN}$DEPLOY_BRANCH${YELLOW} branch...${NC}"
if git show-ref --verify --quiet refs/heads/$DEPLOY_BRANCH; then
  # Branch exists, switch to it
  git checkout $DEPLOY_BRANCH
  # Pull latest changes to avoid conflicts
  git pull origin $DEPLOY_BRANCH --rebase || true
else
  # Branch doesn't exist, create it
  git checkout -b $DEPLOY_BRANCH
fi

# Copy .gitignore from main branch to ensure temp directory is ignored
echo -e "${BLUE}📝 Copying .gitignore from main branch...${NC}"
git show $MAIN_BRANCH:.gitignore > .gitignore 2>/dev/null || echo "$TEMP_DIR/" >> .gitignore

# Remove existing files to avoid conflicts (but leave .git directory and .gitignore)
echo -e "${RED}🗑️ Cleaning old files from ${YELLOW}$DEPLOY_BRANCH${RED}...${NC}"
find . -maxdepth 1 ! -path . ! -path ./.git ! -path ./.gitignore -exec rm -rf {} \;

# Move the built files to the root
echo -e "${BLUE}📦 Moving built files to root directory...${NC}"
cp -r $TEMP_DIR/* .

# Remove the temporary directory to avoid committing it
echo -e "${RED}🗑️ Removing temporary directory from git...${NC}"
rm -rf $TEMP_DIR

# Add all files to git
echo -e "${YELLOW}➕ Adding files to git...${NC}"
git add -A

# Commit changes
echo -e "${YELLOW}💾 Committing changes...${NC}"
git commit -m "Deploy to GitHub Pages - $(date)" || echo -e "${RED}No changes to commit${NC}"

# Push to GitHub Pages
echo -e "${CYAN}☁️ Pushing to ${YELLOW}$DEPLOY_BRANCH${CYAN} branch...${NC}"
git push origin $DEPLOY_BRANCH

# Switch back to the original branch
echo -e "${BLUE}🔄 Switching back to ${YELLOW}$CURRENT_BRANCH${BLUE} branch...${NC}"
git checkout $CURRENT_BRANCH


echo -e "${GREEN}✅ Deployment complete! Your site should be available soon at your GitHub Pages URL.${NC}"