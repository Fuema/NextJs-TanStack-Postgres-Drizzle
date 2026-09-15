# Implementation Plan: Phase 6 — Automation & Delivery (Vitest, Playwright E2E & GitHub Actions CI/CD)

This final phase establishes quality assurance guards, automated unit test suites with Vitest, end-to-end browser scenario simulations with Playwright, Husky pre-commit hooks, and a GitHub Actions Continuous Integration (CI/CD) delivery pipeline.

## Proposed Changes

### 1. Test Dependencies & Configuration
- Install `vitest`, `@testing-library/react`, `@testing-library/jest-dom`, `jsdom`, and `@playwright/test`.
- Create `vitest.config.ts` for unit test environment.
- Create `playwright.config.ts` for multi-browser E2E testing.

---

### 2. Unit Testing Suite (Vitest)
- Create `src/config/__tests__/env.test.ts`: Unit test verifying Zod environment schema correctly parses valid variables and throws errors on missing credentials.
- Create `src/lib/actions/__tests__/users.test.ts`: Unit test verifying Zod `createUserSchema` rejects malformed emails and enforces minimum name length requirements.

---

### 3. End-to-End Browser Simulation Suite (Playwright)
- Create `e2e/admin-workflow.spec.ts`: Headless browser scenario verifying:
  - Navigation sidebar links (`#nav-link-users`, `#nav-link-analytics`, `#nav-link-logs`).
  - Light/Dark theme toggle click (`#btn-theme-toggle`).
  - User CRUD Modal opening and rendering (`#btn-open-user-modal`, `#user-crud-modal`).
  - Audit log CSV export button trigger (`#btn-export-audit-logs`).

---

### 4. Continuous Integration & Pre-Commit Pipeline
- Create `.github/workflows/ci.yml`: Automated GitHub Actions workflow triggering on push and PR to `main` (`npx tsc --noEmit`, `npm run lint`, `npm test`, `npm run build`).
- Create `.husky/pre-commit`: Local git pre-commit hook enforcing typecheck and unit testing before commits are created.

---

## Verification Plan

### Automated Verification
- Run `npm test` to execute Vitest unit test suite.
- Run `npx tsc --noEmit` to verify type safety across all test files and CI configs.
- Run `npm run build` to verify clean production build compilation.

### Manual Verification
- Execute `npx playwright test` to run headless browser workflow tests.
- Confirm GitHub Actions workflow `.github/workflows/ci.yml` pushes cleanly to GitHub repository.
