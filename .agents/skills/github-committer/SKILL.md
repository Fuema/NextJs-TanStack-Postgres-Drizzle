---
name: github-committer
description: >-
  Automates Git version control tasks including pre-commit validation checks, typechecking,
  linting, staging changes, generating conventional commit messages, and pushing to remote GitHub branches.
---

# GitHub Committer Automation Skill

Use this skill whenever the user asks to commit code, push changes to GitHub, create a pull request, or perform version control tasks.

## Workflow Steps

### 1. Pre-Commit Verification
Before staging or committing any code, run the type check and lint tools:
```bash
npx tsc --noEmit
npm run lint
```
*If type errors or lint failures occur, fix them first before committing.*

### 2. Inspect Changed Files
View all modified, untracked, or staged files:
```bash
git status -s
```

### 3. Stage Changes
Stage changed files selectively or as a group:
```bash
git add .
```

### 4. Generate Conventional Commit Message
Format the commit message using Conventional Commits standard:
- `feat(module)`: New feature or capability
- `fix(module)`: Bug fix
- `docs(module)`: Documentation updates
- `style(module)`: Styling, CSS, or UI layout changes
- `refactor(module)`: Code refactoring without behavior changes
- `test(module)`: Adding or updating unit/E2E tests
- `chore(module)`: Dependency updates or config changes

Example execution command:
```bash
git commit -m "feat(auth): integrate Clerk edge middleware with RBAC role protection"
```

### 5. Remote Sync & Push
Ensure local branch is up to date and push changes to remote:
```bash
git push origin HEAD
```

### 6. Verification
Confirm working tree is clean:
```bash
git status
```
