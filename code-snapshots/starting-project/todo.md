# Todo: Auth & Database Implementation

## Phase 1: Dependencies & Environment

- [ ] Install `better-auth` and `nanoid` via `bun add`
- [ ] Create `.env.local` with `BETTER_AUTH_SECRET` (32+ chars) and `BETTER_AUTH_URL`
- [ ] Update `.gitignore` to exclude `data/*.db`

## Phase 2: Database Layer

- [ ] Create `lib/db.ts` — Bun SQLite singleton with `getDb()`, `query<T>()`, `get<T>()`, `run()` helpers
- [ ] Create `data/` directory (will hold `app.db`)

## Phase 3: Authentication Setup

- [ ] Create `lib/auth.ts` — better-auth server instance with Bun SQLite
- [ ] Create `lib/auth-client.ts` — better-auth client for React hooks
- [ ] Create `app/api/auth/[...all]/route.ts` — catch-all API handler
- [ ] Run `bunx --bun better-auth migrate` to create auth tables (user, session, account, verification)

## Phase 4: Route Protection & Middleware

- [ ] Create `middleware.ts` — protect `/dashboard` and `/notes/*` routes with session check

## Phase 5: Notes Table

- [ ] Create `scripts/init-db.ts` — script to create notes table + indexes
- [ ] Run script to initialize notes schema

## Phase 6: Verification

- [ ] Test: `bun run dev` starts without errors
- [ ] Test: POST `/api/auth/sign-up/email` creates a user
- [ ] Test: POST `/api/auth/sign-in/email` returns session cookie
- [ ] Test: `/dashboard` redirects to `/authenticate` without session
- [ ] Test: `/dashboard` renders with valid session
