#!/bin/bash

# Script to create GitHub labels for version bumping
# Usage:
#   ./scripts/create-labels.sh           # Create all labels (required + optional)
#   ./scripts/create-labels.sh --minimal # Create only required labels (PATCH/MINOR/MAJOR)

MINIMAL=false

# Parse arguments
if [ "$1" = "--minimal" ]; then
  MINIMAL=true
fi

echo "🏷️  Creating GitHub labels..."
echo ""

# Version bump labels (REQUIRED for workflows)
echo "📌 Creating required labels..."
gh label create "PATCH" --color "10b981" --description "🟢 Bug fixes, patch release (0.0.X)" --force
gh label create "MINOR" --color "3b82f6" --description "🔵 New features, minor release (0.X.0)" --force
gh label create "MAJOR" --color "ef4444" --description "🔴 Breaking changes, major release (X.0.0)" --force

if [ "$MINIMAL" = false ]; then
  echo ""
  echo "📌 Creating optional labels..."
  # Additional useful labels (OPTIONAL)
  gh label create "bug" --color "d73a4a" --description "Something isn't working" --force
  gh label create "enhancement" --color "a2eeef" --description "New feature or request" --force
  gh label create "documentation" --color "0075ca" --description "Improvements or additions to documentation" --force
  gh label create "dependencies" --color "0366d6" --description "Pull requests that update a dependency file" --force
  gh label create "testing" --color "1d76db" --description "Related to testing" --force
  gh label create "urgent" --color "ff0000" --description "Requires immediate attention" --force
  gh label create "needs-review" --color "fbca04" --description "Waiting for code review" --force
fi

echo ""
echo "✅ Labels created successfully!"
echo ""
echo "📋 Current labels:"
gh label list --limit 20
