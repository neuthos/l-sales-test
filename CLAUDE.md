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

# Run linter
npm run lint
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
