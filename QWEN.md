# Qwen Project Context - L-Sales Dashboard Application

## Project Overview

This is a Next.js 15 dashboard application called "l-sales dashboard" that provides a comprehensive sales management system. The project uses modern React development patterns with TypeScript, Tailwind CSS for styling, and implements a robust authentication and permissions system.

### Key Technologies & Features:
- **Framework**: Next.js 15 (with Turbopack support)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: Zustand, React Context
- **API Client**: TanStack Query (React Query) with devtools
- **Icons**: Lucide React
- **Date Handling**: Day.js
- **Authentication**: Cookie-based authentication with permission system
- **Internationalization**: Translation context system
- **UI Components**: shadcn/ui with New York style

## Project Architecture

### Directory Structure
- `/app` - Next.js 13+ App Router structure with protected routes
- `/components` - Reusable React components, including layout and UI components
- `/features` - Feature-specific components and logic
- `/hooks` - Custom React hooks
- `/lib` - Utilities, API clients, contexts, providers, services, and types
- `/public` - Static assets

### Authentication & Permissions System
- **AuthContext**: Manages authentication state using cookies
- **Default Credentials**: admin/admin for development
- **Permission Levels**: none, reading, writing, approval
- **Route Protection**: Implemented via ProtectedRoute component
- **Special Routes**: 401 (unauthorized), 403 (forbidden) pages

### API & Data Management
- **TanStack Query**: Used for server state management
- **Axios**: HTTP client for API requests
- **Type Safety**: Strongly typed API responses and requests

## Building and Running

### Development
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
The dev script uses Next.js with Turbopack for faster development.

### Production
```bash
npm run build
# Builds the application for production with Turbopack
```

### Other Commands
```bash
npm run start
# Starts the production server

npm run lint
# Runs ESLint for code quality checks
```

### Environment
- **URL**: http://localhost:3000 (default Next.js development server)
- **Font**: Geist (from Vercel) with automatic optimization

## Development Conventions

### Component Structure
- Components follow shadcn/ui patterns and are located in `/components/ui`
- Feature-specific components are in the `/features` directory
- Layout components are in `/components/layout`

### Styling
- Tailwind CSS utility classes
- shadcn/ui component library for consistent UI elements
- CSS variables for theming (defined in app/globals.css)

### State Management
- Global state: React Context (Auth, Translation)
- Server state: TanStack Query for API data fetching and caching
- Local/UI state: React useState, useReducer
- App-wide state: Zustand

### File Organization
- **Absolute imports** are supported using `@/*` alias (e.g., `@/components`, `@/lib/utils`)
- TypeScript path aliases configured in tsconfig.json
- Component files use PascalCase
- Utility functions in `/lib/utils`

### Security & Protection
- Route protection via ProtectedRoute component
- Permission-based access control using different permission levels
- Cookie-based authentication with 7-day expiration
- Protected routes redirect to 401 or 403 pages based on auth status

## Key Files & Configuration

- `next.config.ts` - Next.js configuration (currently minimal)
- `tsconfig.json` - TypeScript configuration with path aliases
- `components.json` - shadcn/ui configuration
- `package.json` - Dependencies and scripts, including Turbopack usage
- `lib/contexts/AuthContext.tsx` - Authentication and permissions management
- `lib/types/permission.ts` - Permission type definitions

## API Integration
- API clients in `/lib/api`
- Type definitions in `/lib/types`
- Service layer in `/lib/services`

This dashboard application appears to be designed for sales management with features for budgeting, proposals, sales tracking, activities history, orders, shipments, revenue tracking, and master data management (products, clients, materials, images). It also includes user management and permissions settings.

## Special Features
- Internationalization support via TranslationContext
- Responsive design with Tailwind CSS
- Modern React patterns (Server Components, Client Components)
- Pre-commit linting and TypeScript checking