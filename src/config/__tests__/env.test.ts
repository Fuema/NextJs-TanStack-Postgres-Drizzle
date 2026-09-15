import { describe, it, expect } from "vitest";
import { z } from "zod";

const testEnvSchema = z.object({
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),
});

describe("Environment Validation Schema", () => {
  it("should successfully parse valid environment variables", () => {
    const validData = {
      NEXT_PUBLIC_APP_URL: "http://localhost:3000",
      DATABASE_URL: "postgresql://user:pass@localhost:5432/neondb",
    };
    const parsed = testEnvSchema.parse(validData);
    expect(parsed.NEXT_PUBLIC_APP_URL).toBe("http://localhost:3000");
  });

  it("should fail validation when DATABASE_URL is empty", () => {
    const invalidData = {
      NEXT_PUBLIC_APP_URL: "http://localhost:3000",
      DATABASE_URL: "",
    };
    const result = testEnvSchema.safeParse(invalidData);
    expect(result.success).toBe(false);
  });
});
