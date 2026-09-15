# ANTIGRAVITY WORKSPACE RULES & CODING GUIDELINES
# Project: Next.js 15+ Enterprise Admin Core OS

## 1. Architectural Discipline
- Always use the unified `src/` directory structure (`src/app/`, `src/components/`, `src/lib/`, `src/db/`, `src/config/`).
- Enforce strict TypeScript compilation (`strict: true`). Avoid using `any` or `ts-ignore`.
- Validate all incoming runtime data using Zod schemas (Environment variables, Forms, Server Actions).

## 2. Design System & Aesthetics (Antigravity WOW Standard)
- Use HSL CSS variables in `src/app/globals.css` for light and dark theme tokens.
- Apply glassmorphism styling (`backdrop-blur-md`, subtle translucent borders) on cards, modals, and overlays.
- Use Google Fonts ('Plus Jakarta Sans' for display/headings, 'Inter' for body/tables).
- Add smooth micro-animations for hover states, loading skeletons, and submit buttons.
- Every interactive DOM element MUST include a unique `id` and `data-testid` attribute (e.g. `id="btn-add-user"`, `data-testid="user-search-input"`).

## 3. Server Actions & React 19 Patterns
- Return type-safe action results (`{ success: true, data }` or `{ success: false, error }`).
- Use React 19 hooks (`useActionState`, `useFormStatus`, `useOptimistic`) for interactive form state handling.
- Wrap multi-row relational mutations inside atomic Drizzle transactions (`db.transaction()`).

## 4. Git Commit & Quality Control
- Never commit broken builds or failing tests.
- Always run `npx tsc --noEmit` before proposing a commit.
- Use Conventional Commit format: `feat:`, `fix:`, `refactor:`, `test:`, `docs:`, `chore:`.
