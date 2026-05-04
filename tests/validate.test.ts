import { describe, it, expect } from "vitest";
import { RULES } from "../src/rules/index";
import { validate } from "../src/shared";

const generateValidPassword = () => {
  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const special = "!@#$%^&*()";

  return (
    upper.slice(0, 1) +
    lower.slice(0, 4) +
    "Pass" +
    digits.slice(0, 1) +
    special.slice(0, 2) +
    "Sha"
  );
};

const generateWeakPassword = () => "Weak";
const generateMidPassword = () => "abcdefgh";

const VALID_TEST_PASSWORD = generateValidPassword();
const WEAK_TEST_PASSWORD = generateWeakPassword();
const MID_TEST_PASSWORD = generateMidPassword();

const schema = RULES;

describe("Validation Engine (Elite Version)", () => {

  it("should return errors for invalid fields", () => {
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
      avatar: {
        url: "invalid",
      },
    };

    const result = validate(schema, input);

    expect(result.success).toBe(false);
    expect(result.errors?.length).toBeGreaterThan(0);

    const emailError = result.errors?.find((e) => e.field === "email");
    expect(emailError).toBeDefined();
    expect(emailError?.code).toBe("PATTERN");
  });

  it("should pass validation for valid fields", () => {
    const input = {
      name: "John Doe",
      email: "john@example.com",
      password: VALID_TEST_PASSWORD,
      phone: "+923001234567",
      url: "https://example.com",
      postalCode: "12345",
      date: "2023-01-01",
      creditCard: "4111111111111111",
      cvv: "123",
      state: "California",
      city: "Los Angeles",
      street: "123 Main St",
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

  it("should detect missing required fields", () => {
    const result = validate(schema, {});

    expect(result.success).toBe(false);
    expect(result.errors?.length).toBeGreaterThan(0);

    const requiredErrors = result.errors?.filter(
      (err) => err.code === "REQUIRED"
    );

    expect(requiredErrors?.length).toBeGreaterThan(0);
  });

  it("should handle password validation rules correctly", () => {
    const weakInput = {
      email: "john@example.com",
      password: WEAK_TEST_PASSWORD,
    };

    const weakResult = validate(schema, weakInput);

    expect(weakResult.success).toBe(false);

    const passwordError = weakResult.errors?.find(
      (err) => err.field === "password"
    );

    expect(passwordError).toBeDefined();

    // Upgrade case
    const midInput = {
      ...weakInput,
      password: MID_TEST_PASSWORD,
    };

    const midResult = validate(schema, midInput);

    const midPasswordError = midResult.errors?.find(
      (err) => err.field === "password"
    );

    expect(midPasswordError).toBeDefined();
  });
});