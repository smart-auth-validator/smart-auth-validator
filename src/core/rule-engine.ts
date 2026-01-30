import type { FieldRule, ValidationError } from "../types/schema";
import { createError } from "../core/error";

export function applyRule(
  field: string,
  value: unknown,
  rule: FieldRule
): ValidationError | null {
  if (value === undefined || value === null || value === "") {
    return createError(field, "REQUIRED", rule);
  }

  if (typeof value !== "string") {
    return createError(field, "INVALID_TYPE");
  }

  const strValue = value as string;

  if (rule.min !== undefined && strValue.length < rule.min) {
    return createError(field, "MIN_LENGTH", rule);
  }

  if (rule.max !== undefined && strValue.length > rule.max) {
    return createError(field, "MAX_LENGTH", rule);
  }


  if (rule.regex && !rule.regex.test(strValue)) {
    return createError(field, "PATTERN", rule);
  }

  return null;
}
