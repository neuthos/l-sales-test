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
