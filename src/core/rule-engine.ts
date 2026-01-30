import type { FieldRule, ValidationError } from "../types/schema";

export function applyRule(
  field: string,
  value: unknown,
  rule: FieldRule
): ValidationError | null {

  if (value === undefined || value === null) {
    return {
      field,
      code: "REQUIRED",
      message: rule.messages?.required ?? `${field} is required`
    };
  }

  if (typeof value !== "string") {
    return {
      field,
      code: "INVALID_TYPE",
      message: `${field} must be a string`
    };
  }

  if (rule.min !== undefined && value.length < rule.min) {
    return {
      field,
      code: "MIN_LENGTH",
      message: rule.messages?.min ?? `${field} is too short`
    };
  }

  if (rule.max !== undefined && value.length > rule.max) {
    return {
      field,
      code: "MAX_LENGTH",
      message: rule.messages?.max ?? `${field} is too long`
    };
  }

  if (rule.regex && !rule.regex.test(value)) {
    return {
      field,
      code: "PATTERN",
      message: rule.messages?.pattern ?? `${field} format invalid`
    };
  }

  return null;
}
