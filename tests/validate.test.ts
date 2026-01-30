import { describe, it, expect } from "vitest";
import { validate } from "../src/index"; 

describe("validate function", () => {
  it("should return error for invalid email - ARRAY CHECK", () => {
    const schema = { email: true };
    const input = { email: "invalid-email" };
    const result = validate(schema, input);

    expect(result.success).toBe(false);
    if (!result.errors) throw new Error("Errors should be defined");
    
    // ✅ Correct: errors is ARRAY, check if contains email field
    expect(result.errors!.some(err => err.field === "email")).toBe(true);
    expect(result.errors).toHaveLength(1);
  });

  it("should return error for invalid email - FIRST ERROR CHECK", () => {
    const schema = { email: true };
    const input = { email: "invalid-email" };
    const result = validate(schema, input);

    expect(result.success).toBe(false);
    if (!result.errors) throw new Error("Errors should be defined");
    
    // ✅ Correct: check first error object property
    expect(result.errors![0]).toHaveProperty("field", "email");
    expect(result.errors![0].field).toBe("email");
  });
});
