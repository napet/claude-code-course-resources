# CLAUDE.md

We are building an app descibed in @SPEC.md. Read that file for general architectural tasks or to double-check the exact database structure, tech stack or application architecture.

Keep replies as concise as possible and focus on conveying key information. No unnecessary fluff, no long code snippets.

Whenever working with any third-party library or something similar, you must look up the official documentation to ensure that you are working with up-to-date information.
Use the DocsExplorer subagent when looking up documentation.

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 16 + React 19 web application using TypeScript, Tailwind CSS for styling, and ESLint for code quality.

**Tech Stack:**

- Next.js 16.1.1 (App Router)
- React 19.2.3
- TypeScript 5
- Tailwind CSS 4 with PostCSS
- ESLint 9 (with Next.js and TypeScript configs)

## Getting Started

### Prerequisites

Ensure you have Node.js installed. Then install dependencies:

```bash
npm install
```

### Common Commands

**Development:**

```bash
npm run dev
```

Starts the Next.js dev server on `http://localhost:3000`. Changes to files auto-refresh the browser.

**Building:**

```bash
npm run build
```

Creates an optimized production build. This must succeed before deploying.

**Production:**

```bash
npm start
```

Starts the production server (only works after `npm run build`).

**Linting:**

```bash
npm run lint
```

Runs ESLint across the project using the flat config system (`eslint.config.mjs`). Checks TypeScript and Next.js core web vitals rules.

## Project Structure

### Key Directories

- **`app/`** — Next.js App Router pages and layouts
  - `layout.tsx` — Root layout, imports global styles and configures fonts
  - `page.tsx` — Home page (main entry point)
  - `globals.css` — Global Tailwind and custom styles
- **`public/`** — Static assets (images, SVGs, etc.)

### Configuration Files

- **`tsconfig.json`** — TypeScript configuration with strict mode, path aliases (`@/*` maps to project root)
- **`next.config.ts`** — Next.js runtime configuration
- **`tailwind.config.js`** — Tailwind CSS customization
- **`postcss.config.mjs`** — PostCSS configuration for Tailwind
- **`eslint.config.mjs`** — ESLint configuration using flat config format with Next.js and TypeScript rules

## Architecture Notes

### App Router (Next.js 13+)

The project uses the App Router directory structure under `app/`. Each folder is a route segment:

- `app/page.tsx` → `GET /`
- `app/layout.tsx` → Wraps all routes with a layout

### Styling

Tailwind CSS is the primary styling approach. All styles are class-based utilities applied directly to JSX elements. The `globals.css` file imports Tailwind directives and defines any custom CSS.

### Type Safety

TypeScript strict mode is enabled. The `@/*` path alias allows clean imports from the project root (e.g., `import { foo } from "@/lib/utils"`).

## ESLint Setup

The project uses ESLint 9's flat config format (`eslint.config.mjs`). Configuration includes:

- `eslint-config-next/core-web-vitals` — Next.js best practices
- `eslint-config-next/typescript` — TypeScript linting rules

Default ignores (`.next/`, `out/`, `build/`, `next-env.d.ts`) are overridden in the config.

## Development Workflow

1. Start the dev server: `npm run dev`
2. Edit files in `app/` (pages/components) or add new routes
3. Next.js hot-reloads the browser automatically
4. Run `npm run lint` to check for issues before committing
5. Run `npm run build` to verify the production build works

## Testing & Deployment

Currently, no test runner is configured. To add unit/integration tests, install Jest or Vitest.

For deployment to Vercel (recommended for Next.js), push to a git repository and connect it to Vercel's dashboard.
