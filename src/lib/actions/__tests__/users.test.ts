import { describe, it, expect } from "vitest";
import { createUserSchema } from "../users";

describe("User Schema Validation", () => {
  it("should validate a correct user creation payload", () => {
    const validUser = {
      name: "John Doe",
      email: "john@example.com",
      role: "admin" as const,
    };
    const parsed = createUserSchema.parse(validUser);
    expect(parsed.name).toBe("John Doe");
    expect(parsed.email).toBe("john@example.com");
  });

  it("should reject an invalid email address", () => {
    const invalidUser = {
      name: "Jane Doe",
      email: "invalid-email-string",
      role: "user" as const,
    };
    const result = createUserSchema.safeParse(invalidUser);
    expect(result.success).toBe(false);
  });

  it("should reject a name shorter than 2 characters", () => {
    const shortNameUser = {
      name: "A",
      email: "valid@example.com",
      role: "user" as const,
    };
    const result = createUserSchema.safeParse(shortNameUser);
    expect(result.success).toBe(false);
  });
});
