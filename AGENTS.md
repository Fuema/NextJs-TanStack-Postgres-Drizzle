# ANTIGRAVITY AGENT WORKSPACE GUIDE & ENTRYPOINT

Welcome to the **Next.js 15+ Enterprise Admin Core OS** repository.

This project is built following the specification defined in [`PROJECT_SPECIFICATION.md`](file:///c:/Users/fuema/source/repos/React/my-awesome-app_v2/PROJECT_SPECIFICATION.md).

## Available Workspace Skills

Antigravity has access to specialized workspace skills in `.agents/skills/`:

1. **`github-committer`**: Automates pre-commit validation, Conventional Commit formatting, git staging, and branch pushing.
2. **`clerk-auth`**: Automates Clerk setup, middleware route protection, RBAC rules, and user webhooks.
3. **`db-drizzle`**: Automates Drizzle ORM schema management, migration scripts, atomic relational transactions, and seeding.

## Core Directives

- **Architecture**: All code must reside under `src/` (`src/app/`, `src/components/`, `src/lib/`, `src/db/`, `src/config/`).
- **Aesthetics**: Glassmorphic design (`backdrop-blur-md`), HSL variables in `globals.css`, Google Fonts ('Plus Jakarta Sans' & 'Inter').
- **DOM Testability**: Every interactive component must have unique `id` and `data-testid` attributes.
- **Verification**: Always run `npx tsc --noEmit` and verify code before marking tasks complete.

## Recommended Commands
- To commit changes cleanly: Ask Antigravity "Use `github-committer` to stage and commit the recent changes."
- To inspect or push database schema: Ask Antigravity "Use `db-drizzle` to check migrations."
