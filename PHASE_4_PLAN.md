# Implementation Plan: Phase 4 — UI Shell & Composables (Sidebar Layout, Forms, Modals & KPI Dashboard)

This phase constructs the full user interface shell, responsive navigation sidebar, glassmorphic KPI analytics widgets, protected dashboard route architecture, and React 19 interactive form containers.

## Proposed Changes

### 1. UI Primitives & Glassmorphic Components
- Create `src/components/shared/submit-button.tsx`: React 19 `useFormStatus` pending-aware submit button with stateful loading spinner (`id="btn-submit-form"`).
- Create `src/components/dashboard/mode-toggle.tsx`: Light/Dark theme switcher updating `dark` class on root HTML element (`id="btn-theme-toggle"`).
- Create `src/components/dashboard/kpi-card.tsx`: Glassmorphic card displaying metric value, icon, and percentage trend badge (`id="kpi-card-[title]"`).

---

### 2. Navigation & Layout Shell
- Create `src/components/dashboard/navigation-sidebar.tsx`: Responsive collapsible sidebar with active link indicator, icons, and brand badge (`id="navigation-sidebar"`).
- Create `src/components/dashboard/header-nav.tsx`: Header with search filter input, breadcrumbs, `ModeToggle`, and Clerk `<UserButton />` (`id="header-nav"`).
- Create `src/app/(dashboard)/layout.tsx`: Protected layout wrapping dashboard routes inside `NavigationSidebar` and `HeaderNav`.

---

### 3. User & Post Composables
- Create `src/components/users/user-crud-modal.tsx`: Dialog overlay for creating/updating users leveraging React 19 `useActionState` (`id="btn-open-user-modal"`).
- Create `src/components/users/user-table.tsx`: Data table grid with avatar, role badge, status indicator, edit modal launcher, and delete trigger (`id="user-table"`).

---

### 4. Protected Dashboard Pages
- Create `src/app/(dashboard)/page.tsx`: User Management Home view with User Table, search bar, and Add User action modal.
- Create `src/app/(dashboard)/posts/page.tsx`: Post Management view displaying posts with author badges and transaction post creator.
- Create `src/app/(dashboard)/analytics/page.tsx`: System KPI Analytics dashboard featuring 4 glassmorphic metric cards (Total Users, Active Posts, Request Velocity, Security Alerts).
- Create `src/app/(dashboard)/logs/page.tsx`: Audit Trails display view.
- Create `src/app/(dashboard)/settings/page.tsx`: System configuration settings panel.

---

## Verification Plan

### Automated Verification
- Run `npx tsc --noEmit` to verify type safety across all React components, layout wrappers, and event handlers.
- Run `npm run build` to verify clean compilation without missing exports.

### Manual Verification
- Open dashboard routes in browser (`/`, `/posts`, `/analytics`, `/logs`, `/settings`).
- Confirm glassmorphic aesthetics, HSL color tokens, dark mode toggle, and DOM test IDs.
