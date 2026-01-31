import { describe, it, expect } from "vitest";
import { validate } from "../src/index"; 

describe("Validation Engine", () => {

  const schema = {
    name: true,
    email: true,
    password: true,
    phone: true,
    url: true,
    postalCode: true,
    date: true,
    creditCard: true,
    cvv: true,
    state: true,
    city: true,
    street: true,
    username: true,
    time: true,
    active: true
  };

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
      active: "maybe"
    };

    const result = validate(schema, input);
    expect(result.success).toBe(false);
    if (!result.errors) throw new Error("Errors should be defined");

    const errorFields = result.errors.map(err => err.field);
    expect(errorFields).toEqual(expect.arrayContaining(Object.keys(schema)));

    // Check first error for email
    const emailError = result.errors.find(err => err.field === "email");
    expect(emailError).toBeDefined();
    expect(emailError?.code).toBe("PATTERN");
  });

  it("should pass validation for all valid fields", () => {
    const input = {
      name: "John Doe",
      email: "john@example.com",
      password: "StrongPass1!",
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
      active: "true"
    };

    const result = validate(schema, input);
    expect(result.success).toBe(true);
    expect(result.data).toBeDefined();
    expect(result.errors).toBeUndefined();
  });

  it("should correctly handle missing required fields", () => {
    const input = {}; // empty object
    const result = validate(schema, input);

    expect(result.success).toBe(false);
    if (!result.errors) throw new Error("Errors should be defined");

    result.errors.forEach(err => {
      expect(err.code).toBe("REQUIRED");
      expect(Object.keys(schema)).toContain(err.field);
    });
  });

  it("should correctly handle partial valid input for password", () => {
    const input = {
      email: "john@example.com",
      password: "Weak" // <8 chars triggers MIN_LENGTH first
    };

    const result = validate(schema, input);
    expect(result.success).toBe(false);
    if (!result.errors) throw new Error("Errors should be defined");

    const emailError = result.errors.find(err => err.field === "email");
    expect(emailError).toBeUndefined(); // email is valid

    const passwordError = result.errors.find(err => err.field === "password");
    expect(passwordError).toBeDefined();

    // Short password triggers MIN_LENGTH first
    expect(passwordError?.code).toBe("MIN_LENGTH");

    // Optional: test a weak but long password to trigger WEAK_PASSWORD
    const weakPasswordInput = {
      email: "john@example.com",
      password: "abcdefgh" // 8 chars but no uppercase, number, special char
    };
    const weakResult = validate(schema, weakPasswordInput);
    const weakPasswordError = weakResult.errors?.find(err => err.field === "password");
    expect(weakPasswordError?.code).toBe("WEAK_PASSWORD");
  });

});
