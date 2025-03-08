#!/bin/bash

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
BUILD_DIR="dist"  # Default Vue build directory
DOCS_BUILD_DIR="docs/.vitepress/dist"  # Default Vitepress build directory
TEMP_DIR="gh-pages-tmp"

echo -e "${CYAN}🚀 Starting deployment process...${NC}"

# Save current branch to return to it later
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
echo -e "${BLUE}📌 Current branch: ${YELLOW}$CURRENT_BRANCH${NC}"

# Make sure we have the latest changes
echo -e "${BLUE}⬇️ Pulling latest changes from ${YELLOW}$MAIN_BRANCH${BLUE}...${NC}"
git checkout $MAIN_BRANCH
git pull origin $MAIN_BRANCH

# Build main Vue application
echo -e "${GREEN}🔨 Building Vue application...${NC}"
npm run build

# Build Vitepress documentation
echo -e "${GREEN}📚 Building Vitepress documentation...${NC}"
npm run docs:build

# Create a temporary directory for our deployment files
echo -e "${PURPLE}📁 Creating temporary directory for deployment...${NC}"
mkdir -p $TEMP_DIR

# Copy built files to the temporary directory
echo -e "${PURPLE}📋 Copying main app build files...${NC}"
cp -r $BUILD_DIR/* $TEMP_DIR/

# Create a docs subdirectory in the temp folder
echo -e "${PURPLE}📋 Copying documentation files...${NC}"
mkdir -p $TEMP_DIR/docs
cp -r $DOCS_BUILD_DIR/* $TEMP_DIR/docs/

# Switch to the gh-pages branch
echo -e "${YELLOW}🔄 Switching to ${CYAN}$DEPLOY_BRANCH${YELLOW} branch...${NC}"
git checkout $DEPLOY_BRANCH || git checkout -b $DEPLOY_BRANCH

# Remove existing files to avoid conflicts
echo -e "${RED}🗑️ Cleaning old files from ${YELLOW}$DEPLOY_BRANCH${RED}...${NC}"
find . -maxdepth 1 ! -path . ! -path ./.git ! -path ./$TEMP_DIR -exec rm -rf {} \;

# Move the built files to the root
echo -e "${BLUE}📦 Moving built files to root directory...${NC}"
cp -r $TEMP_DIR/* .

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

# Cleanup
echo -e "${GREEN}🧹 Cleaning up temporary files...${NC}"
rm -rf $TEMP_DIR

echo -e "${GREEN}✅ Deployment complete! Your site should be available soon at your GitHub Pages URL.${NC}"