#!/bin/bash
# Build and deploy script for publishing frontend dist folder and docs to GitHub Pages
#
# This script automates the process of building a frontend project and its documentation,
# then deploying the `dist` folder to the `gh-pages` branch on GitHub for hosting via GitHub Pages.
#
# Key Steps:
# 1. Verifies that the script is run from the project root and checks for the `frontend` directory.
# 2. Navigates to the `frontend` directory and checks for `package.json` to ensure it's a Node.js project.
# 3. Installs dependencies (if not already installed), then builds the project using `npm run build`.
# 4. Checks if the build was successful by verifying the existence of the `dist` folder.
# 5. Builds the documentation if a docs directory exists and a build script is available.
# 6. Copies the documentation output to the dist folder for unified deployment.
# 7. Commits the new build, adds the `dist` folder to Git, and pushes it to the `gh-pages` branch using `git subtree`.
# 8. Pushes the latest changes to the current branch of the repository.
#
# Exit on any error to prevent partial or broken deployment.
# Includes helpful error messages and logs for troubleshooting.
#
# How to run this script:
# 1. Ensure you're in the project root directory.
# 2. Run the following command in the terminal:
# bash scripts/deploy_gh_pages.sh
#
# This assumes the script is located in the `scripts/` folder. If it's located elsewhere,
# adjust the path accordingly when running the script.
#
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

# Get version from package.json
VERSION=$(node -p "require('./package.json').version")
if [ -z "$VERSION" ]; then
    echo "⚠️ Warning: Could not get version from package.json, using 'latest' instead"
    VERSION="latest"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Build the project
echo "🔨 Building the main project..."
npm run build

# Check if build was successful
if [ ! -d "dist" ]; then
    echo "❌ Build failed: dist directory not found"
    exit 1
fi

# Check if docs directory exists
if [ -d "docs" ]; then
    echo "📚 Documentation directory found, building docs..."
    
    # Check if there's a specific doc build script in package.json
    if grep -q "\"build:docs\"" package.json; then
        echo "📝 Running documentation build script..."
        npm run build:docs
    elif grep -q "\"docs:build\"" package.json; then
        echo "📝 Running documentation build script..."
        npm run docs:build
    else
        echo "⚠️ No specific documentation build script found in package.json."
        echo "📝 Checking for documentation build system..."
        
        # Check for common documentation generators
        if [ -f "docs/package.json" ]; then
            # Docs has its own package.json
            echo "📦 Installing documentation dependencies..."
            cd docs
            npm install
            
            # Check for build script in docs/package.json
            if grep -q "\"build\"" package.json; then
                echo "🔨 Building documentation..."
                npm run build
            else
                echo "❌ No build script found in docs/package.json"
            fi
            
            cd ..
        elif [ -f "docs/mkdocs.yml" ]; then
            # MkDocs project
            echo "🔨 Building MkDocs documentation..."
            cd docs
            mkdocs build
            cd ..
        elif [ -d "docs/.vuepress" ]; then
            # VuePress project
            echo "🔨 Building VuePress documentation..."
            cd docs
            npx vuepress build
            cd ..
        elif [ -f "docs/conf.py" ]; then
            # Sphinx project
            echo "🔨 Building Sphinx documentation..."
            cd docs
            sphinx-build -b html . _build/html
            cd ..
        else
            echo "⚠️ Unable to determine documentation build system. Skipping docs build."
        fi
    fi
    
    # Check for documentation output directory
    DOC_OUTPUT_DIR=""
    if [ -d "docs/dist" ]; then
        DOC_OUTPUT_DIR="docs/dist"
    elif [ -d "docs/build" ]; then
        DOC_OUTPUT_DIR="docs/build"
    elif [ -d "docs/_build/html" ]; then
        DOC_OUTPUT_DIR="docs/_build/html"
    elif [ -d "docs/.vuepress/dist" ]; then
        DOC_OUTPUT_DIR="docs/.vuepress/dist"
    elif [ -d "docs/site" ]; then
        DOC_OUTPUT_DIR="docs/site"
    elif [ -d "docs/out" ]; then
        DOC_OUTPUT_DIR="docs/out"
    elif [ -d "docs/public" ]; then
        DOC_OUTPUT_DIR="docs/public"
    fi
    
    if [ -n "$DOC_OUTPUT_DIR" ] && [ -d "$DOC_OUTPUT_DIR" ]; then
        echo "📋 Copying documentation to dist/docs directory..."
        # Create docs directory in dist if it doesn't exist
        mkdir -p dist/docs
        
        # Copy documentation to dist/docs
        cp -r $DOC_OUTPUT_DIR/* dist/docs/
        echo "✅ Documentation copied successfully."
    else
        echo "⚠️ Documentation output directory not found. Documentation may not have built correctly."
    fi
fi

# Go back to project root
cd ..

# Force add and commit the new build
echo "📝 Committing the new build..."
git add frontend/dist -f
git commit -m "🚀 deploy: Deploy version ${VERSION} with documentation" || echo "No changes to commit"

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

echo "✨ All done! Version ${VERSION} has been deployed to GitHub Pages with documentation and pushed to remote."