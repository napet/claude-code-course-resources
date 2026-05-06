# Todo: Auth & Database Implementation

## Phase 1: Dependencies & Environment

- [x] Install `better-auth` and `nanoid` via `bun add`
- [x] Create `.env.local` with `BETTER_AUTH_SECRET` (32+ chars) and `BETTER_AUTH_URL`
- [x] Update `.gitignore` to exclude `data/*.db`

## Phase 2: Database Layer

- [x] Create `lib/db.ts` — Bun SQLite singleton with `getDb()`, `query<T>()`, `get<T>()`, `run()` helpers
- [x] Create `data/` directory (will hold `app.db`)

## Phase 3: Authentication Setup

- [x] Create `lib/auth.ts` — in-memory auth helpers with session management
- [x] Create `lib/auth-client.ts` — React hooks for auth (useSession, signIn, signUp, signOut)
- [x] Create `app/api/auth/[...all]/route.ts` — catch-all API handler for sign-up, sign-in, sign-out, session
- [x] Auth tables created in-memory (no database migration needed)

## Phase 4: Route Protection & Middleware

- [x] Create `middleware.ts` — protect `/dashboard` and `/notes/*` routes with session check

## Phase 5: Notes Table

- [ ] Create `scripts/init-db.ts` — script to create notes table + indexes
- [ ] Run script to initialize notes schema

## Phase 6: Verification

- [ ] Test: `bun run dev` starts without errors
- [ ] Test: POST `/api/auth/sign-up/email` creates a user
- [ ] Test: POST `/api/auth/sign-in/email` returns session cookie
- [ ] Test: `/dashboard` redirects to `/authenticate` without session
- [ ] Test: `/dashboard` renders with valid session
