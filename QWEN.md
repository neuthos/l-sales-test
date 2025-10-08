# Next.js Enterprise Boilerplate - Project Context

## Project Overview

The Next.js Enterprise Boilerplate is a production-ready template for building enterprise applications with Next.js. This boilerplate provides a solid foundation with carefully selected technologies and ready-to-go infrastructure to help develop high-quality applications efficiently.

### Key Technologies and Features

- **Next.js 15**: Performance-optimized configuration using App Directory
- **React 19**: Latest React features and improvements
- **Tailwind CSS v4**: Utility-first CSS framework for efficient UI development
- **TypeScript**: Enhanced type safety with carefully crafted configuration and ts-reset library
- **Radix UI**: Headless components for customization
- **CVA (Class Variance Authority)**: Consistent design system creation
- **OpenTelemetry**: Built-in observability integration via @vercel/otel
- **T3 Env**: Streamlined environment variable management with Zod validation
- **Absolute imports**: Simplified import structure using baseUrl in tsconfig.json

### Project Structure

```
next-enterprise/
├── app/                    # Next.js App Router pages
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
├── components/             # Reusable React components
├── styles/                 # Global styles
├── e2e/                    # End-to-end tests
├── .storybook/             # Storybook configuration
├── .github/                # GitHub configuration
├── env.mjs                 # Environment variables with validation
├── instrumentation.ts      # OpenTelemetry instrumentation
├── next.config.ts          # Next.js configuration
├── package.json            # Project dependencies and scripts
├── tsconfig.json           # TypeScript configuration
└── ...
```

### Building and Running

The project uses pnpm as the package manager and comes with the following key scripts:

**Development:**
- `pnpm dev` - Starts the development server with Next.js in development mode
- `pnpm storybook` - Starts Storybook for component development

**Building and Production:**
- `pnpm build` - Builds the application for production
- `pnpm start` - Starts the production server
- `pnpm analyze` - Builds with bundle analysis enabled (requires ANALYZE=true env var)

**Testing:**
- `pnpm test` - Runs unit tests with Vitest
- `pnpm test:watch` - Runs unit tests in watch mode
- `pnpm test:ui` - Runs unit tests with UI
- `pnpm test:coverage` - Runs unit tests with coverage
- `pnpm e2e:headless` - Runs Playwright end-to-end tests (headless)
- `pnpm e2e:ui` - Runs Playwright end-to-end tests with UI

**Code Quality:**
- `pnpm lint` - Runs ESLint
- `pnpm lint:fix` - Runs ESLint with auto-fix
- `pnpm prettier` - Checks code formatting
- `pnpm prettier:fix` - Fixes code formatting
- `pnpm format` - Formats all files

### Configuration Details

#### TypeScript
- Strict mode enabled with noUncheckedIndexedAccess
- BaseUrl configured for absolute imports
- Next.js plugin for better integration
- Integration with testing libraries (vitest, @testing-library/jest-dom)

#### ESLint
- Enforces Next.js best practices
- Tailwind CSS integration (though currently commented out in config)
- Import order enforcement with custom directory sorting
- Integration with Storybook linting
- Custom rules for unused variables and import organization

#### Environment Variables
- Managed with @t3-oss/env-nextjs and Zod validation
- Single ANALYZE variable for bundle analysis (boolean, defaults to false)

#### Next.js Configuration
- React strict mode enabled
- Bundle analyzer integration (enabled when ANALYZE env var is true)
- Health check rewrites for Kubernetes compatibility
- Full URL logging for fetches

#### Tailwind CSS
- Configured with Tailwind CSS v4
- Custom configuration in postcss.config.js
- Integration with CVA for styling utilities

### Development Conventions

1. **Component Design**:
   - Components use CVA (Class Variance Authority) for consistent styling
   - Radix UI primitives for accessible components
   - Button component shows example of variant-based design system

2. **Code Quality**:
   - Strict TypeScript with comprehensive checks
   - ESLint with import ordering and Next.js best practices
   - Prettier for consistent formatting
   - Automatic patch application for dependency fixes

3. **Testing**:
   - Unit tests with Vitest and React Testing Library
   - E2E tests with Playwright
   - Storybook for component development with testing capabilities

4. **Observability**:
   - OpenTelemetry integration for application metrics
   - Automatic instrumentation via Vercel OpenTelemetry package

5. **Deployment & DevOps**:
   - Semantic release integration for automated changelog generation
   - Conventional commits for standardized commit history
   - Bundle size analysis to prevent bloat
   - Health checks for containerized deployments

### Special Features

- **Health Checks**: Rewrites configured for /healthz, /api/healthz, /health, and /ping to /api/health endpoint
- **Coupling Graph**: Can generate visual dependency graph using madge via `pnpm coupling-graph` command
- **Bundle Analysis**: Built-in support for analyzing bundle size during development
- **Perfect Lighthouse Score**: Optimized performance metrics
- **Storybook Integration**: Component development and documentation environment
- **Absolute Imports**: baseUrl configured for cleaner import paths