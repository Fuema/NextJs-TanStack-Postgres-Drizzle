---
name: db-drizzle
description: >-
  Automates PostgreSQL database schema management, Drizzle ORM setup, migration generation,
  database schema pushing, atomic transaction handling, and test data seeding.
---

# Drizzle ORM & PostgreSQL Automation Skill

Use this skill when initializing the database layer, creating or updating Drizzle schemas, generating SQL migrations, executing database transactions, or running seeds.

## Workflow Steps

### 1. Dependencies Setup
Install Drizzle ORM and PostgreSQL driver packages:
```bash
npm install drizzle-orm postgres
npm install -D drizzle-kit dotenv
```

### 2. Drizzle Configuration (`drizzle.config.ts`)
Create root Drizzle Kit configuration pointing to `src/db/schema.ts`:
```typescript
import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
```

### 3. Migration Commands
- Generate migration scripts: `npx drizzle-kit generate`
- Push schema directly (dev environment): `npx drizzle-kit push`
- Run Drizzle Studio GUI: `npx drizzle-kit studio`

### 4. Database Client Initialization (`src/db/index.ts`)
```typescript
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import { env } from "@/config/env";

const client = postgres(env.DATABASE_URL, { prepare: false });
export const db = drizzle(client, { schema });
```

### 5. Atomic Transaction Pattern
Always use `db.transaction()` when mutating related tables (e.g. creating user and initial post):
```typescript
await db.transaction(async (tx) => {
  const [newUser] = await tx.insert(users).values(userData).returning();
  await tx.insert(posts).values({ ...postData, authorId: newUser.id });
});
```
