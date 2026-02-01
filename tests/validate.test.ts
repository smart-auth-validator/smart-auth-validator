import { describe, it, expect } from "vitest";
import { validate } from "../src/index";
import { RULES } from "../src/rules";

describe("Validation Engine", () => {
  const schema = Object.fromEntries(
    Object.keys(RULES).map((key) => [key, true]),
  );

  it("should return errors for all invalid fields", () => {
    const input = {
      name: "A",
      email: "invalid-email",
      password: "123",
      phone: "123",
      url: "htp:/invalid-url",
      postalCode: "!!",
      date: "2023/01/01",
      creditCard: "123",
      cvv: "12",
      state: "State1",
      city: "City@",
      street: "Street$$$",
      username: "ab",
      time: "25:00",
      active: "maybe",
      avatar: "not-a-url",
    };

    const result = validate(schema, input);
    expect(result.success).toBe(false);
    if (!result.errors) throw new Error("Errors should be defined");

    const errorFields = result.errors.map((err) => err.field);
    expect(errorFields).toEqual(expect.arrayContaining(Object.keys(schema)));

    const emailError = result.errors.find((err) => err.field === "email");
    expect(emailError).toBeDefined();
    expect(emailError?.code).toBe("PATTERN");
  });

  it("should pass validation for all valid fields", () => {
    const input = {
      name: "John Doe",
      email: "john@example.com",
      password: "StrongPass1!@#Sha",
      phone: "+923001234567",
      url: "https://example.com",
      postalCode: "12345",
      date: "2023-01-01",
      creditCard: "4111111111111111",
      cvv: "123",
      state: "California",
      city: "Los Angeles",
      street: "123 Main St.",
      username: "john_doe",
      time: "14:30",
      active: true,
      avatar: {
        url: "https://example.com/avatar.png",
        mimeType: "image/png",
        sizeKB: 120,
      },
    };

    const result = validate(schema, input);
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.errors).toBeUndefined();
  });

  it("should correctly handle missing required fields", () => {
    const input = {};
    const result = validate(schema, input);

    expect(result.success).toBe(false);
    if (!result.errors) throw new Error("Errors should be defined");

    result.errors.forEach((err) => {
      if (err.code === "REQUIRED") {
        expect(Object.keys(schema)).toContain(err.field);
      }
    });
  });

it("should correctly handle partial valid input for password", () => {
  const input = {
    email: "john@example.com",
    password: "Weak",
  };

  const result = validate(schema, input);
  
  // FIX: This must be FALSE because 'name', 'phone', etc., are missing from input
  expect(result.success).toBe(false); 
  
  if (!result.errors) throw new Error("Errors should be defined");

  // Check that email is valid (no error for email)
  const emailError = result.errors.find((err) => err.field === "email");
  expect(emailError).toBeUndefined();

  // Check that password failed because it's too short
  const passwordError = result.errors.find((err) => err.field === "password");
  expect(passwordError).toBeDefined();
  expect(passwordError?.code).toBe("MIN_LENGTH");

  // Second check: Password is long enough but missing special characters
  const weakPasswordInput = {
    ...input, // keep email
    password: "abcdefgh",
  };
  const weakResult = validate(schema, weakPasswordInput);
  const weakPasswordError = weakResult.errors?.find(
    (err) => err.field === "password",
  );
  expect(weakPasswordError?.code).toBe("PATTERN");
});

});
