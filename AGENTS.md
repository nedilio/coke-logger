# AGENTS.md - Coke Logger Development Guide

This document provides guidelines for agentic coding agents working on the Coke Logger project.

## Project Overview

Coke Logger is a full-stack Next.js 16 application for tracking Coca-Cola consumption. It uses:
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript (strict mode enabled)
- **Auth**: Better Auth
- **Database**: Neon (PostgreSQL) with Drizzle ORM
- **Styling**: Tailwind CSS 4 + shadcn/ui
- **Package Manager**: pnpm

## Build/Lint/Test Commands

### Development
```bash
pnpm dev              # Start development server on http://localhost:3000
pnpm build            # Build for production
pnpm start            # Start production server
```

### Code Quality
```bash
pnpm lint             # Run ESLint
pnpm typecheck        # TypeScript type check only
```

### Testing (Vitest)
```bash
pnpm test             # Run tests in watch mode
pnpm test:run         # Run tests once
```

### Database (Drizzle ORM)
```bash
pnpm generate         # Generate migration from schema changes
pnpm migrate:dev      # Apply pending migrations (uses .env.local)
pnpm migrate:prod     # Apply migrations (uses .env.production.local)
pnpm db:push         # Push schema changes directly (dev only)
pnpm db:studio       # Open Drizzle Studio (database GUI)
pnpm db:drop         # Drop all tables
```

### Setup
```bash
pnpm setup            # Install dependencies + run migrations
```

## Code Style Guidelines

### TypeScript
- **Strict mode** is enabled in `tsconfig.json`
- Always use explicit types for function parameters and return types
- Use `type` for type aliases, `interface` for object shapes
- Use `z.infer<typeof schema>` to derive TypeScript types from Zod schemas

### Imports & Path Aliases
- Use path aliases: `@/*` maps to project root
  - `@/components/*` - React components
  - `@/components/ui/*` - shadcn/ui components
  - `@/lib/*` - Utilities and configurations
  - `@/db/*` - Database schemas and connection
  - `@/server/*` - Server actions
- Group imports: external libs → path aliases → relative imports
- Use `import { type X }` for type-only imports

### Naming Conventions
- **Files**: kebab-case for utilities (`utils.ts`), kebab-case for configs
- **Components**: PascalCase (e.g., `Dashboard.tsx`, `CokeLogCard.tsx`)
- **Server Actions**: Descriptive names with `Action` suffix (e.g., `createCokeLogAction`)
- **Database Schemas**: Singular nouns (`cokeLog`, not `cokeLogs`)
- **Variables/functions**: camelCase
- **Constants**: UPPER_SNAKE_CASE in `lib/constants/`

### Server Actions (`server/*.ts`)
- Mark files with `"use server"` at the top
- Use services from `@/server/services/` for business logic
- Use `requireUserId()` from auth-service for authentication
- Validate all input with Zod schemas before database operations
- Use `revalidatePath()` after mutations to refresh cached data
- Return data directly, avoid wrapping in extra objects when unnecessary

### SOLID Architecture

This project follows SOLID principles with a layered architecture:

**1. Repositories** (`server/repositories/`)
- Implement data access logic
- Define interfaces in `server/repositories/interfaces/`
- Never include auth logic in repositories

**2. Services** (`server/serverices/`)
- Contain business logic
- Orchestrate repositories and handle revalidation
- Use auth-service for authentication

**3. Server Actions** (`server/*.ts`)
- Thin layer that handles:
  - Authentication (via auth-service)
  - Input validation (Zod)
  - Calling services
  - Returning results

### Validation (Zod)
- Create schemas in `lib/validations/` directory
- Use descriptive error messages for all rules
- Export inferred types using `z.infer<typeof schema>`
- Example:
  ```typescript
  export const createCokeLogSchema = z.object({
    cokeType: z.enum(COKE_TYPES, { message: "Select a valid coke type" }),
    sizeML: z.number().int().positive(),
  });
  export type CreateCokeLogInput = z.infer<typeof createCokeLogSchema>;
  ```

### Database (Drizzle ORM)
- Define schemas in `db/schemas/` directory
- Export schemas from `db/schemas/index.ts`
- Use `eq()`, `and()`, `desc()` from drizzle-orm for queries
- Always include `userId` filter for user-specific data
- Use `.returning()` for INSERT/UPDATE to get the modified record

### Error Handling
- Throw descriptive `Error` objects in server actions
- Use try-catch in client components for server action calls
- Display errors to users via `sonner` toaster (already configured)
- Example client-side handling:
  ```typescript
  try {
    await createCokeLogAction(data);
    toast.success("Log created!");
  } catch (error) {
    toast.error(error instanceof Error ? error.message : "Failed to create log");
  }
  ```

### UI Components (shadcn/ui)
- Components use "new-york" style, lucide icons
- Use the `cn()` utility for className merging:
  ```typescript
  import { cn } from "@/lib/utils";
  className={cn("base-class", condition && "conditional-class")}
  ```
- Use Radix UI primitives for accessibility

### React/Next.js Patterns
- Server Components by default (no `"use client"` unless needed)
- Use `use client` only for interactive components with hooks
- Use `next-themes` for dark mode support
- Metadata should be exported from layout files

### Environment Variables
- Never commit `.env.local` or secrets to git
- Use `.env.example` as template
- Required variables:
  - `DATABASE_URL` - Neon PostgreSQL connection string
  - `BETTER_AUTH_SECRET` - Auth secret (run `openssl rand -base64 32`)
  - `BETTER_AUTH_URL` - App URL (localhost or production)

### File Organization
```
app/                  # Next.js App Router pages
  (app)/             # Authenticated route group
  login/            # Login page
  signup/           # Signup page
components/          # React components
  ui/              # shadcn/ui components
  landing/         # Landing page components
db/
  schemas/          # Drizzle ORM schemas
  drizzle.ts       # Database connection
lib/
  auth.ts          # Better Auth configuration
  constants/       # App constants
  validations/     # Zod schemas
  utils/           # Utility functions (date-utils, format-utils, stats-utils)
server/             # Server actions
  repositories/    # Repository layer (DIP - depends on interfaces)
    interfaces/    # Repository interfaces
  services/        # Service layer (business logic)
```

## Common Tasks

### Adding a New Database Field
1. Edit schema in `db/schemas/`
2. Run `pnpm generate` to create migration
3. Run `pnpm migrate:dev` to apply
4. Update Zod validation schema in `lib/validations/`
5. Update server actions and components as needed

### Adding a New Page
1. Create route in `app/` directory
2. Export `metadata` for SEO
3. Add authentication check if needed (or use `(app)` route group)
4. Use appropriate layout from `components/`

### Adding a New Component
1. Use shadcn CLI: `npx shadcn@latest add [component-name]`
2. Or create manually in `components/` following existing patterns
3. Use `cn()` utility for class merging

## Dependencies

Key dependencies (do not upgrade without testing):
- `next`: 16.1.6
- `better-auth`: 1.4.18
- `drizzle-orm`: 0.45.1
- `react`: 19.2.3
- `typescript`: 5.x
