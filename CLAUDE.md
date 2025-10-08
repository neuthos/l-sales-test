# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

L-Sales Dashboard App - A multi-tenant sales management application built with Next.js 15 (App Router), React 19, TypeScript, and Tailwind CSS 4. Features comprehensive menu system, multi-language support (EN/JA), and environment-based menu visibility.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Linting & Formatting
npm run lint              # Check for lint errors (errors only, no warnings)
npm run lint:fix          # Auto-fix all fixable lint errors + format code
npm run format            # Format code with Prettier
npm run format:check      # Check if code is formatted correctly

# Testing
npm run test              # Run tests once
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Run tests with coverage report
npm run test:ci           # Run tests in CI mode (for GitHub Actions)

# CI/CD Simulation
npm run ci:local          # Simulate full CI pipeline locally (lint + test + build)
```

## Editor Setup (VSCode)

This project is configured for **auto-fix on save** in VSCode. All formatting and linting happens automatically when you save a file.

### Required Extensions

Install these VSCode extensions (VSCode will prompt you automatically):
- **Prettier** (`esbenp.prettier-vscode`) - Code formatter
- **ESLint** (`dbaeumer.vscode-eslint`) - Linter

### What Happens on Save

When you save a file (Cmd/Ctrl + S):

1. **Prettier formats the code:**
   - Fixes indentation, line breaks, quotes
   - Adds/removes semicolons
   - Formats JSX/TSX properly
   - Wraps long lines

2. **ESLint auto-fixes issues:**
   - Converts regular imports to type imports
   - Changes `||` to `??` (nullish coalescing)
   - Removes unused variables
   - Organizes imports (if configured)

3. **Only unfixable errors remain:**
   - `any` types (must manually specify type)
   - Missing return types (must add manually)
   - Floating promises (must add `await`)
   - Logic errors

### Import Ordering (Auto-Fixed)

Imports are automatically organized into **3 sections** with blank lines between:

```typescript
// 1. External libraries (React destructured, then others)
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import dayjs from "dayjs";

// 2. Internal files (@/ imports)
import { Button } from "@/components/ui/Button";
import { api } from "@/lib/api/client";
import { cn } from "@/lib/utils";

// 3. Type imports
import type { User } from "@/lib/types/user";
import type { ApiResponse } from "@/lib/types/api";
```

**Rules:**
- ❌ **Never** use `import * as React from "react"`
- ❌ **Never** use `import React from "react"`
- ✅ **Always** destructure what you need: `import { useState, useEffect } from "react"`
- ✅ External libraries sorted alphabetically
- ✅ Internal imports sorted alphabetically
- ✅ Type imports separated and sorted
- ✅ Blank line between each section (auto-added)

### Auto-Fixable Issues ✅

These are **automatically fixed on save**:

```typescript
// BEFORE SAVE:
import {User} from "@/lib/types/user";  // Missing 'type'
const data=response?.data||fallback;     // Wrong operator, spacing
let unusedVar = 5;                       // Unused variable
function test(  ) {return 1}            // Bad formatting

// AFTER SAVE:
import type {User} from "@/lib/types/user";
const data = response?.data ?? fallback;
// unusedVar removed automatically
function test() {
  return 1;
}
```

### Manual Fix Required ❌

These **cannot be auto-fixed** and need your attention:

```typescript
// ❌ Must manually change 'any' to proper type
const data: any = fetchData();

// ❌ Must manually add return type or add comment
function getData() {
  return user;
}

// ❌ Must manually add 'await' or handle promise
someAsyncFunction();
```

### Configuration Files

- **`.vscode/settings.json`** - VSCode workspace settings (auto-fix on save)
- **`.prettierrc.js`** - Prettier formatting rules
- **`eslint.config.mjs`** - ESLint + TypeScript rules
- **`.vscode/extensions.json`** - Recommended extensions

### Manual Formatting

If auto-save is disabled:

```bash
# Format all files with Prettier
npx prettier --write .

# Fix all auto-fixable ESLint issues
npm run lint -- --fix
```

### Disabling Auto-Fix (Not Recommended)

If you need to disable auto-fix temporarily:

1. Open Command Palette (Cmd/Ctrl + Shift + P)
2. Type "Preferences: Open Workspace Settings (JSON)"
3. Change `"editor.formatOnSave": false`

**Note:** Pre-commit hook will still enforce linting rules before commit.

## Git Commit Guidelines

This project uses **Husky** and **Commitlint** to enforce consistent commit message format.

### Setup

Husky is automatically initialized when you run:
- `npm install` - The `prepare` script runs `husky` setup
- `npm run dev` - Runs `husky install` before starting dev server

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Required:**
- **type**: One of: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`
- **subject**: Short description (max 50 chars), lowercase, imperative mood, no period

**Optional:**
- **scope**: Component, service, or area affected (e.g., `auth`, `api`, `ui`)
- **body**: Detailed description (wrap at 72 chars)
- **footer**: Issue references or breaking changes

### Valid Examples

**Simple commit:**
```bash
git commit -m "feat(auth): add login functionality"
git commit -m "fix(api): resolve null pointer in user service"
git commit -m "docs: update installation guide"
```

**Commit with body and footer:**
```bash
git commit -m "feat(dashboard): add revenue chart widget

Add interactive revenue chart with filtering capabilities.
Supports daily, weekly, and monthly views.

Closes #456"
```

### Common Commit Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, whitespace)
- `refactor`: Code refactoring (no functional changes)
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Build process, dependencies, tooling

### Troubleshooting

**If your commit is rejected:**
1. Check the error message - it will show what's wrong
2. Common issues:
   - Subject too long (max 50 chars)
   - Invalid type (must be one of the allowed types)
   - Subject starts with uppercase (must be lowercase)
   - Subject ends with period (not allowed)
   - Missing type or subject

**Emergency bypass** (use sparingly):
```bash
git commit --no-verify -m "your message"
```

**Test your commit message format:**
```bash
echo "feat(api): add new endpoint" | npx commitlint
```

## Git Branch Conventions

This project enforces strict branch naming conventions to maintain a clean and organized Git workflow.

### Branch Structure

```
develop (default)
  ↓
staging (UAT)
  ↓
release/vX.Y.Z
  ↓
master (production)
```

### Protected Branches

These branches are permanent and should never be deleted:

- **`develop`** - Default development branch where all features are merged
- **`staging`** - UAT (User Acceptance Testing) environment
- **`master`** or **`main`** - Production environment (stable, deployed code)

> **Note**: GitHub uses `main` as the default branch name. Both `master` and `main` are valid for the production branch in this project.

### Release Branches

- **Format**: `release/vX.Y.Z`
- **Created from**: `develop`
- **Purpose**: Prepare a new production release

**Examples:**
```bash
git checkout develop
git checkout -b release/v1.0.0
git checkout -b release/v2.3.1
```

### Feature Branches

All development work should be done in feature branches following this naming pattern:

#### 1. Features (`feat/`)
- **Format**: `feat/<ticket-id>/<short-description>`
- **Created from**: `develop`
- **Purpose**: New features or enhancements

**Examples:**
```bash
git checkout develop
git checkout -b feat/ABC-123/user-authentication
git checkout -b feat/XYZ-456/dashboard-widget
git checkout -b feat/sales-report-export
```

#### 2. Bug Fixes (`fix/`)
- **Format**: `fix/<ticket-id>/<short-description>`
- **Created from**: `develop`
- **Purpose**: Bug fixes for development or staging

**Examples:**
```bash
git checkout develop
git checkout -b fix/ABC-789/login-redirect-issue
git checkout -b fix/XYZ-101/date-picker-bug
```

#### 3. Hotfixes (`hotfix/`)
- **Format**: `hotfix/<ticket-id>/<short-description>`
- **Created from**: `master` ⚠️ **MUST checkout from master, NOT develop**
- **Purpose**: Critical production bug fixes

**Examples:**
```bash
git checkout master
git checkout -b hotfix/CRITICAL-001/security-vulnerability
git checkout -b hotfix/URGENT-042/payment-gateway-fix
```

### Branch Naming Rules

✅ **Valid patterns:**
- `feat/ABC-123/add-user-management`
- `fix/BUG-456/fix-login-timeout`
- `hotfix/CRITICAL-789/patch-sql-injection`
- `release/v1.2.0`

❌ **Invalid patterns:**
- `feature/new-thing` (use `feat/` not `feature/`)
- `Fix/BUG-123/test` (must be lowercase)
- `feat/Add_User_Feature` (use hyphens, not underscores or spaces)
- `hotfix/fix-something` (hotfix must checkout from master)

### Branch Validation

Branch names are **automatically validated on commit** via Husky hook. Invalid branch names will be rejected with a clear error message showing:
- What's wrong with the branch name
- Valid naming patterns
- Examples of correct branch names

### Workflow Examples

**Creating a new feature:**
```bash
git checkout develop
git pull origin develop
git checkout -b feat/ABC-123/add-sales-dashboard
# Make changes, commit
git push -u origin feat/ABC-123/add-sales-dashboard
# Create PR to develop
```

**Creating a hotfix:**
```bash
git checkout master
git pull origin master
git checkout -b hotfix/CRITICAL-001/fix-payment-bug
# Make changes, commit
git push -u origin hotfix/CRITICAL-001/fix-payment-bug
# Create PR to master (and backport to develop)
```

**Creating a release:**
```bash
git checkout develop
git pull origin develop
git checkout -b release/v1.5.0
# Bump version, update changelog
git push -u origin release/v1.5.0
# Create PR to staging → master
```

### Best Practices

1. **Always create branches from the correct base:**
   - Features/fixes → from `develop`
   - Hotfixes → from `master`
   - Releases → from `develop`

2. **Use descriptive branch names:**
   - Include ticket/issue ID if available
   - Keep description short but meaningful
   - Use hyphens, not underscores or spaces

3. **Delete feature branches after merge:**
   - Keep repository clean
   - Merged branches can always be restored from Git history

4. **Never commit directly to protected branches:**
   - Always use Pull Requests
   - Require code review before merging

## GitHub Workflows & Release Process

This project uses **GitHub Actions** for automated CI/CD, PR creation, and semantic versioning.

### Automated Workflows

#### 1. **Auto PR to Staging** (`auto-pr-staging.yml`)

**Trigger:** Push to `develop` branch

**What it does:**
- Automatically creates PR from `develop` → `staging`
- Skips if PR already exists
- Adds deployment instructions in PR body

**Usage:**
```bash
git push origin develop
# ✅ GitHub Action creates PR: develop → staging
```

#### 2. **Auto PR to Release** (`auto-pr-release.yml`)

**Trigger:** PR merged to `staging` branch

**What it does:**
- Creates date-based release branch: `release/YYYY-MM-DD`
- Automatically creates PR from `staging` → `release/YYYY-MM-DD`
- Includes version bump instructions in PR body

**Example:**
```bash
# After merging staging PR on 2025-10-08:
# ✅ Creates branch: release/2025-10-08
# ✅ Creates PR: staging → release/2025-10-08
```

#### 3. **Version Bump & Production Release** (`version-bump-production.yml`)

**Trigger:** PR merged to `master` or `main` branch

**What it does:**
1. Checks for version label (`PATCH`/`MINOR`/`MAJOR`)
2. Bumps version in `package.json` (default: `PATCH`)
3. Commits version change
4. Creates Git tag: `vX.Y.Z`
5. Creates GitHub Release with changelog

**Version Bump Logic:**
- **PATCH** (default): `0.1.0` → `0.1.1` (bug fixes)
- **MINOR**: `0.1.0` → `0.2.0` (new features)
- **MAJOR**: `0.1.0` → `1.0.0` (breaking changes)

**Usage:**
```bash
# 1. Create PR: release/2025-10-08 → master
# 2. Add label to PR:
#    - No label = PATCH (default)
#    - Add "MINOR" label for new features
#    - Add "MAJOR" label for breaking changes
# 3. Merge PR
# ✅ Version bumped, tag created, release published
```

#### 4. **CI/CD Pipeline** (`ci.yml`)

**Trigger:** Pull request to specific branches:
- PR to `develop` (feature/fix branches → develop)
- PR to `master`/`main` (release/* branches → production)

**What it does:**
1. **Runs linter** - `npm run lint`
2. **Runs unit tests** - `npm run test:ci` (with coverage)
3. **Builds project** - `npm run build`
4. **Uploads artifacts** - Build files & coverage reports
5. **Comments PR** - Success/failure status with source & target branches

**Quality Gates:**
- All checks must pass before merge
- Failed checks block PR merge
- Detailed error messages in PR comments

### Complete Deployment Flow

**End-to-End Example:**

```bash
# 1️⃣ Developer creates feature PR
git push origin feat/ABC-123/user-dashboard
# Create PR: feat/ABC-123/user-dashboard → develop

# → CI checks run: lint, test, build ✅
# → PR reviewed and merged to develop

# 2️⃣ Push to develop triggers staging PR
git push origin develop

# → GitHub Action: Creates PR develop → staging ✅

# 3️⃣ Team reviews and merges to staging

# → GitHub Action: Creates branch release/2025-10-08 ✅
# → GitHub Action: Creates PR staging → release/2025-10-08 ✅

# 4️⃣ QA tests on release branch

# 5️⃣ Create PR: release/2025-10-08 → master

# → CI checks run again: lint, test, build ✅ (production validation)

# 6️⃣ Add version label to PR:
#    - "PATCH" for bug fixes (0.1.0 → 0.1.1)
#    - "MINOR" for features (0.1.0 → 0.2.0)
#    - "MAJOR" for breaking (0.1.0 → 1.0.0)

# 7️⃣ Merge PR to master

# → GitHub Action: Bumps version to 0.2.0 ✅
# → GitHub Action: Creates tag v0.2.0 ✅
# → GitHub Action: Creates GitHub Release ✅

# 8️⃣ Deploy to production 🚀
```

### Version Scripts

Manual version bumping (optional):

```bash
# Bump patch version (0.1.0 → 0.1.1)
npm run version:patch

# Bump minor version (0.1.0 → 0.2.0)
npm run version:minor

# Bump major version (0.1.0 → 1.0.0)
npm run version:major
```

### GitHub Repository Setup

#### Required Configuration

**1. Create Labels** (Settings → Labels):

**Option A - Using Script (Recommended):**
```bash
# Run the automated script
./scripts/create-labels.sh
```

**Option B - Manual creation:**
```bash
# Create version bump labels one by one
gh label create "PATCH" --color "10b981" --description "🟢 Bug fixes, patch release (0.0.X)"
gh label create "MINOR" --color "3b82f6" --description "🔵 New features, minor release (0.X.0)"
gh label create "MAJOR" --color "ef4444" --description "🔴 Breaking changes, major release (X.0.0)"
```

**Option C - Via GitHub UI:**
- Settings → Labels → New label
- `PATCH` - #10b981 (green) - Bug fixes
- `MINOR` - #3b82f6 (blue) - New features
- `MAJOR` - #ef4444 (red) - Breaking changes

**2. Branch Protection Rules** (Settings → Branches):

Protect these branches:
- `develop` - Require PR reviews, require status checks
- `staging` - Require PR reviews, require status checks
- `master` / `main` - Require PR reviews, require status checks

**3. GitHub Actions Permissions** (Settings → Actions → General):

- Workflow permissions: **Read and write permissions**
- ✅ Allow GitHub Actions to create and approve pull requests

#### Optional Enhancements

**Auto-merge staging PRs:**
```yaml
# Add to auto-pr-staging.yml
- name: Enable auto-merge
  run: gh pr merge --auto --squash
```

**Slack/Discord notifications:**
```yaml
- name: Notify on release
  uses: slackapi/slack-github-action@v1
  with:
    webhook-url: ${{ secrets.SLACK_WEBHOOK }}
```

### Troubleshooting

**PR not created automatically?**
- Check GitHub Actions permissions (must allow PR creation)
- Verify workflows are enabled in repository settings
- Check workflow logs for errors

**Version bump not working?**
- Ensure PR has correct label (PATCH/MINOR/MAJOR)
- Check if PR was actually merged (not just closed)
- Verify GITHUB_TOKEN has write permissions

**Build fails in CI?**
- Run `npm run lint` and `npm run test` locally first
- Check Node.js version (must be 20+)
- Verify all dependencies installed correctly

### Best Practices

1. **Always use labels for version bumps**
   - Even though PATCH is default, be explicit
   - Helps team understand release impact

2. **Test on staging before release**
   - Never skip staging deployment
   - Use release branch for final QA

3. **Write meaningful commit messages**
   - They appear in release changelog
   - Follow conventional commit format

4. **Review automated PRs**
   - Don't blindly merge auto-created PRs
   - Check changes and test thoroughly

## Testing

This project uses **Jest** and **React Testing Library** for unit and component testing with comprehensive coverage reporting.

### Test Commands

```bash
# Run all tests once
npm test

# Run tests in watch mode (auto-rerun on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Run tests in CI mode (optimized for CI/CD pipelines)
npm run test:ci
```

### Coverage Thresholds

Coverage thresholds are currently **disabled** to allow gradual test adoption. Once you have sufficient test coverage, uncomment and adjust the thresholds in `jest.config.ts`:

```typescript
coverageThreshold: {
  global: {
    branches: 70,
    functions: 70,
    lines: 70,
    statements: 70,
  },
}
```

Start with lower thresholds (e.g., 30%) and gradually increase as you add more tests.

### Test File Structure

Tests should be placed in `__tests__` directories next to the code they test:

```
lib/
├── utils.ts
└── __tests__/
    └── utils.test.ts

components/
├── ui/
│   ├── Button.tsx
│   └── __tests__/
│       └── Button.test.tsx

lib/contexts/
├── TranslationContext.tsx
└── __tests__/
    └── TranslationContext.test.tsx
```

### Naming Conventions

- **Test files**: `*.test.ts` or `*.test.tsx`
- **Spec files**: `*.spec.ts` or `*.spec.tsx` (both formats supported)
- **Test directories**: `__tests__/`

### Writing Tests

#### 1. Testing Utility Functions

```typescript
import { cn } from "@/lib/utils";

describe("cn utility function", () => {
  it("should merge class names correctly", () => {
    const result = cn("bg-red-500", "text-white");
    expect(result).toBe("bg-red-500 text-white");
  });

  it("should handle conditional classes", () => {
    const isActive = true;
    const result = cn("base-class", isActive && "active-class");
    expect(result).toBe("base-class active-class");
  });
});
```

#### 2. Testing Components

```typescript
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "@/components/ui/Button";

describe("Button Component", () => {
  it("should render button with text", () => {
    render(<Button data-test="test-button">Click me</Button>);
    const button = screen.getByText("Click me");
    expect(button).toBeInTheDocument();
  });

  it("should handle click events", async () => {
    const handleClick = jest.fn();
    const user = userEvent.setup();

    render(
      <Button data-test="test-button" onClick={handleClick}>
        Click me
      </Button>
    );

    const button = screen.getByText("Click me");
    await user.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

#### 3. Testing Hooks with Context

```typescript
import { act, renderHook } from "@testing-library/react";

import type { ReactNode } from "react";

import { TranslationProvider, useTranslation } from "../TranslationContext";

describe("useTranslation Hook", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <TranslationProvider>{children}</TranslationProvider>
  );

  it("should return default locale as 'en'", () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });
    expect(result.current.locale).toBe("en");
  });

  it("should change locale to Japanese", () => {
    const { result } = renderHook(() => useTranslation(), { wrapper });

    act(() => {
      result.current.setLocale("ja");
    });

    expect(result.current.locale).toBe("ja");
  });
});
```

### Testing Best Practices

1. **Use Testing Library Queries** (in order of preference):
   - `getByRole` - Most accessible
   - `getByLabelText` - Good for forms
   - `getByText` - For user-visible text
   - `getByTestId` - Last resort (use `data-test` attribute)

2. **Test User Behavior, Not Implementation**:
   ```typescript
   // ✅ Good - Tests user interaction
   await user.click(screen.getByRole("button", { name: /submit/i }));
   expect(onSubmit).toHaveBeenCalled();

   // ❌ Bad - Tests internal state
   expect(component.state.isSubmitting).toBe(true);
   ```

3. **Use `userEvent` Instead of `fireEvent`**:
   ```typescript
   // ✅ Good - Simulates real user interaction
   const user = userEvent.setup();
   await user.click(button);

   // ❌ Bad - Low-level DOM events
   fireEvent.click(button);
   ```

4. **Mock External Dependencies**:
   ```typescript
   // Mock localStorage
   const localStorageMock = {
     getItem: jest.fn(),
     setItem: jest.fn(),
     clear: jest.fn(),
   };
   Object.defineProperty(window, "localStorage", {
     value: localStorageMock,
   });
   ```

5. **Organize Tests with `describe` Blocks**:
   ```typescript
   describe("Component Name", () => {
     describe("when user is authenticated", () => {
       it("should show dashboard", () => {
         // test
       });
     });

     describe("when user is not authenticated", () => {
       it("should redirect to login", () => {
         // test
       });
     });
   });
   ```

### Coverage Reports

After running `npm run test:coverage`, view the coverage report:

```bash
# Open HTML coverage report in browser
open coverage/lcov-report/index.html
```

Coverage reports show:
- **Green**: Well-tested code (>80% coverage)
- **Yellow**: Moderate coverage (50-80%)
- **Red**: Poorly tested code (<50%)

### Continuous Integration

The `test:ci` script is optimized for CI/CD pipelines:

```bash
npm run test:ci
```

Features:
- Runs in CI mode (no watch, single run)
- Generates coverage report
- Limits workers to 2 for CI environments
- Fails if coverage thresholds are not met

### Example Test Files

The project includes example tests for:

1. **`lib/__tests__/utils.test.ts`** - Utility function testing
2. **`components/ui/__tests__/Skeleton.test.tsx`** - Simple component testing
3. **`components/ui/__tests__/Button.test.tsx`** - Component with variants and events
4. **`lib/contexts/__tests__/TranslationContext.test.tsx`** - Hook with context provider

Study these examples to understand the testing patterns used in this project.

### Git Hooks

Automated quality checks via Husky:

#### Pre-Commit Hook

Runs **before each commit**:

1. **Runs linter** - `npm run lint`
2. **Blocks commit** - If linting fails

```bash
git add .
git commit -m "feat: add new feature"

# Output:
# 🔍 Running linter...
# ✓ All files pass linting
# ✅ Pre-commit checks passed!
```

#### Pre-Push Hook

Runs **before each push**:

1. **Runs build** - `npm run build`
2. **Blocks push** - If build fails

```bash
git push origin develop

# Output:
# 🏗️  Running build before push...
# ✓ Compiled successfully
# ✅ Pre-push checks passed!
```

#### Bypass Hooks (Emergency Only)

```bash
# Skip pre-commit (linting)
git commit --no-verify -m "feat: emergency fix"

# Skip pre-push (build)
git push --no-verify origin develop
```

**⚠️ Use sparingly!** These checks prevent broken code from being committed/pushed.

## Linting Guidelines

This project enforces **strict TypeScript linting** to catch bugs before runtime.

### Rules Enforcement

The ESLint configuration includes strict type-safety rules:

**ERROR-level rules:**
- ❌ No explicit `any` type in your own code
- ❌ No unsafe operations with `any` typed values
- ❌ No unused variables (prefix with `_` to allow: `_unusedVar`)
- ❌ No floating promises (must await or handle)
- ❌ No `console.log` in production (use `console.warn` or `console.error`)
- ❌ Must use `type` imports for type-only imports
- ❌ Prefer nullish coalescing (`??`) over `||` when appropriate
- ❌ Prefer optional chaining (`?.`) over manual checks

**WARN-level rules:**
- ⚠️ Functions should have explicit return types (recommended but not required)
- ⚠️ Prefer `const` over `let` when not reassigned

### Handling `any` Types

**❌ BAD - Will cause linting error:**
```typescript
const data: any = fetchData();
function process(input: any) { ... }
```

**✅ GOOD - Use specific types:**
```typescript
const data: User = fetchData();
function process(input: User | Product) { ... }
```

**✅ GOOD - Use `unknown` when type is truly unknown:**
```typescript
const data: unknown = fetchData();
// Then narrow the type
if (isUser(data)) {
  // data is User here
}
```

**✅ GOOD - Type assertion for third-party untyped libraries:**
```typescript
import thirdPartyLib from "untyped-library";

// Cast to proper type
const result = thirdPartyLib.getData() as MyExpectedType;
```

**✅ ALLOWED - With explicit comment for third-party interfaces:**
```typescript
interface AxiosAdapter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any -- matches axios response type
  transformResponse(data: any): unknown;
}
```

### Type Imports

Always use `type` keyword for type-only imports:

```typescript
// ❌ BAD
import {User} from "@/lib/types/user";

// ✅ GOOD
import type {User} from "@/lib/types/user";

// ✅ GOOD - Mixed import
import {createUser, type User} from "@/lib/services/user";
```

### Unused Variables

Prefix with `_` to indicate intentionally unused:

```typescript
// ❌ BAD - error: 'error' is defined but never used
function getData() {
  try {
    return fetchData();
  } catch (error) {
    return null;
  }
}

// ✅ GOOD
function getData() {
  try {
    return fetchData();
  } catch (_error) {
    return null;
  }
}
```

### Running Linter

```bash
# Check for linting errors
npm run lint

# Auto-fix all fixable errors + format code
npm run lint:fix

# Format code only (without linting)
npm run format

# The pre-commit hook runs linting automatically
git commit -m "feat: add new feature"  # Will run lint before commit
```

### Bypassing Linter

Only for emergencies:

```bash
# Skip pre-commit hook (includes linting)
git commit --no-verify -m "feat: emergency fix"

# To temporarily disable a rule (use sparingly)
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- reason for exception
```

### Special File Rules

- **Config files** (`*.config.js`, `*.config.ts`): Can use `require()` and `console`
- **Type definitions** (`*.d.ts`): Can use `any` when necessary
- **Third-party code** (`node_modules/`): Automatically ignored

## Architecture

### Multi-Tenant System

The app supports multi-tenant architecture with environment-based feature visibility:

- **Tenant Detection**: `hooks/UseTenant.ts` detects tenant from subdomain and environment from hostname
- **Environments**: `development`, `staging`, `production`
- **Menu Filtering**: Each menu item can specify which environments it appears in via `environments` property

### Authentication & Authorization System

**Location**: `lib/contexts/AuthContext.tsx`, `components/ProtectedRoute.tsx`

Route protection with granular permission levels:

- **Permission Levels**: `none`, `reading`, `writing`, `approval` (defined in `lib/types/permission.ts`)
- **Auth State**: Stored in cookies (`l-sales-auth`) for 7-day persistence
- **Default Credentials**: `admin`/`admin` (for development)
- **Route Protection**: `ProtectedRoute` component redirects to `/401` (unauthorized) or `/403` (forbidden)

**Permission Flow**:
```typescript
const {isAuthenticated, checkPermission, login, logout} = useAuth();
const permission = checkPermission("/dashboard/budget"); // Returns PermissionLevel
```

**Protecting Routes**: Wrap page content in dashboard layout with `ProtectedRoute` component (already configured in `app/dashboard/layout.tsx`)

### API Architecture

**Singleton Service Pattern** with centralized error handling:

**API Client** (`lib/api/client.ts`):
- Axios-based with request/response interceptors
- Auto-adds: JWT token (when implemented), timezone header, idempotency key for mutations
- Standardized error handling via `ApiError` class
- Base URL: `process.env.NEXT_PUBLIC_API_URL` or `http://localhost:3000/api/v1/`

**Service Layer** (`lib/services/`):
- Organized by domain (auth, user, product, etc.)
- All services extend `BaseService` class
- Singleton instances exported (e.g., `AuthService`, `UserService`)

**Creating a New Service**:
```typescript
// lib/services/order.service.ts
import {BaseService} from "./base.service";

class OrderServiceClass extends BaseService {
  async getOrders() {
    return this.get<Order[]>("/orders");
  }
}

export const OrderService = new OrderServiceClass();
```

**Data Fetching Pattern**:
- Use **React Query** (`@tanstack/react-query`) for all API calls
- Provider configured in `lib/providers/ReactQueryProvider.tsx`
- DevTools enabled in development

**Example React Query Hook**:
```typescript
import {useQuery} from "@tanstack/react-query";
import {ProductService} from "@/lib/services";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: () => ProductService.getProducts(),
  });
}
```

### Translation System

**Location**: `lib/translations/`

- **Dual Language**: English (en.ts) and Japanese (ja.ts)
- **Key Format**: Uses English text as keys (e.g., `"Dashboard": "Dashboard"` in EN, `"Dashboard": "ダッシュボード"` in JA)
- **Context Provider**: `lib/contexts/TranslationContext.tsx` with `useTranslation()` hook
- **Storage**: Language preference saved in localStorage

**Adding Translations**:

1. Add key-value to `lib/translations/en.ts`
2. Add same key with Japanese translation to `lib/translations/ja.ts`
3. TypeScript will enforce type safety via `TranslationKey` type

### Menu Configuration System

**Location**: `lib/config/MenuConfig.ts`

Centralized menu configuration supporting:

- **3-level nested menus** (parent → child → grandchild)
- **Icons** from lucide-react
- **Badges** for notification counters
- **Environment filtering** per menu item

**Menu Structure**:

```typescript
{
  title: "TranslationKey",      // Must exist in translations
  icon: LucideIcon,              // Optional icon
  href: "/path",                 // Optional route (omit for parent menus)
  badge: number,                 // Optional notification badge
  environments: "all" | "production" | ["dev", "staging"],
  children: MenuItem[]           // Optional nested menus
}
```

**Adding New Menu Item**:

1. Add item to `menuConfig.items` in `lib/config/MenuConfig.ts`
2. Add translations to `en.ts` and `ja.ts`
3. Create page in `app/[route]/page.tsx`
4. Set `environments` property for visibility control

### Component Naming Conventions

**Strictly enforced**:

- **Files**: PascalCase (e.g., `AppSidebar.tsx`, `UseMobile.ts`)
- **React Components**: PascalCase functions (e.g., `function AppSidebar()`)
- **Hooks**: camelCase with 'use' prefix (e.g., `function useTenant()`, `function useTranslation()`)
- **Regular functions**: camelCase (e.g., `function shouldShowMenuItem()`)

### Styling & Theme

**Primary Color**: `#007bff` (blue) used throughout for:

- Active/selected menu items
- Primary buttons
- Focus rings
- Accent colors

**CSS Architecture**:

- Tailwind CSS 4 with custom theme in `app/globals.css`
- OKLCH color format for better color perception
- CSS variables for theme customization
- Support for light/dark modes

**Key CSS Variables**:

```css
--primary: oklch(0.533 0.162 259.8); /* #007bff */
--sidebar-primary: oklch(0.533 0.162 259.8); /* Selected menu */
--sidebar-accent: oklch(0.533 0.162 259.8 / 10%); /* Hover */
```

### File Organization

```
app/
├── dashboard/          # Main dashboard page
├── budget/             # Budget management
├── [feature-routes]/   # 18 feature pages (all placeholder "Hello World")
└── layout.tsx          # Root layout with providers

components/
├── ui/                 # UI components
├── AppSidebar.tsx      # Main navigation sidebar
├── SiteHeader.tsx      # Top header with language switcher
└── LanguageSwitcher.tsx

lib/
├── api/
│   └── client.ts          # Axios instance with interceptors
├── config/
│   └── MenuConfig.ts      # Centralized menu configuration
├── contexts/
│   ├── AuthContext.tsx    # Authentication & permission management
│   └── TranslationContext.tsx
├── providers/
│   └── ReactQueryProvider.tsx  # React Query configuration
├── services/
│   ├── base.service.ts    # Base service class
│   ├── auth.service.ts    # Auth API calls
│   ├── user.service.ts    # User management
│   ├── product.service.ts # Product management
│   └── index.ts           # Export all services
├── translations/
│   ├── en.ts              # English translations
│   ├── ja.ts              # Japanese translations
│   └── index.ts
├── types/
│   ├── api.ts             # API response/error types
│   ├── menu.ts            # Menu type definitions
│   └── permission.ts      # Permission & auth types
├── utils/
│   ├── date.ts            # Date utilities (timezone, formatting)
│   └── number.ts          # Number utilities
└── utils.ts               # Utility functions (cn)

hooks/
├── UseTenant.ts       # Multi-tenant & environment detection
└── UseMobile.ts       # Mobile device detection
```

## Key Design Patterns

### Active Menu Detection

Sidebar automatically highlights active menu using Next.js `usePathname()`:

```typescript
const pathname = usePathname();
const isActive = item.href === pathname;
<SidebarMenuButton isActive={isActive}>
```

### Environment-Based Menu Visibility

```typescript
function shouldShowMenuItem(item: MenuItem, environment: string): boolean {
  if (!item.environments || item.environments === "all") return true;
  if (Array.isArray(item.environments)) {
    return item.environments.includes(environment);
  }
  return item.environments === environment;
}
```

### Translation Pattern

```typescript
const {t, locale, setLocale} = useTranslation();

// Usage
<h1>{t("Dashboard")}</h1>; // Renders "Dashboard" or "ダッシュボード"
```

## Important Implementation Details

1. **All menu items must have translations** in both `en.ts` and `ja.ts` - TypeScript enforces this via `TranslationKey` type

2. **Menu configuration is separate from component code** - edit `MenuConfig.ts`, not `AppSidebar.tsx`

3. **Sidebar shows current environment** in header for debugging multi-tenant features

4. **Translation keys use English text** as the key itself, making code more readable

5. **3-level menu nesting** is the maximum supported depth (Settings → Usage Settings → User Management)

6. **Badge counters** are simple numbers, not dynamic - update in MenuConfig.ts manually

7. **Provider hierarchy** (in `app/layout.tsx`): ReactQueryProvider → TranslationProvider → AuthProvider - maintain this order

8. **All API calls should go through service layer** - never call axios directly from components

9. **Use React Query for data fetching** - not useState/useEffect patterns

10. **Auth state persists in cookies** - survives page refreshes, expires in 7 days

## Technology Stack

- **Framework**: Next.js 15.5.4 (App Router, React Server Components)
- **React**: 19.1.0
- **TypeScript**: 5.x
- **Styling**: Tailwind CSS 4 + tw-animate-css
- **UI Components**: Radix UI primitives (shadcn/ui pattern)
- **Icons**: lucide-react
- **Build Tool**: Turbopack (Next.js built-in)
- **Data Fetching**: TanStack React Query v5
- **HTTP Client**: Axios 1.12.2
- **State Management**: Zustand 5.0.8 (for lightweight local state)
- **Date Handling**: dayjs 1.11.18
- **Cookies**: js-cookie 3.0.5

## Common Modifications

### Adding a New Feature Page

1. Create route: `app/feature-name/page.tsx`
2. Add menu item to `lib/config/MenuConfig.ts`
3. Add translations to `lib/translations/en.ts` and `ja.ts`
4. Set appropriate `environments` for visibility

### Changing Primary Color

Edit `app/globals.css` and update all instances of the OKLCH color value in both `:root` and `.dark` selectors. Current primary: `oklch(0.533 0.162 259.8)` = #007bff

### Adding New Language

1. Create `lib/translations/[locale].ts`
2. Add to `lib/translations/index.ts` exports
3. Update `Locale` type in `index.ts`
4. Add language option to `LanguageSwitcher.tsx`

### Creating Tenant-Specific Features

Set `environments` property in menu config:

```typescript
environments: ["tenant1-production", "tenant2-staging"];
```

Then customize logic in `hooks/UseTenant.ts` for tenant detection.

### Adding API Integration to a Page

1. Create service in `lib/services/[domain].service.ts` extending `BaseService`
2. Export service instance as singleton
3. Create React Query hook:
```typescript
// hooks/useOrders.ts
export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: () => OrderService.getOrders(),
  });
}
```
4. Use in component:
```typescript
const {data: orders, isLoading, error} = useOrders();
```

### Working with Permissions

Check user permission for a route:
```typescript
const {checkPermission} = useAuth();
const permission = checkPermission("/dashboard/budget");

if (permission === "reading") {
  // Show read-only view
} else if (permission === "writing" || permission === "approval") {
  // Show edit controls
}
```
