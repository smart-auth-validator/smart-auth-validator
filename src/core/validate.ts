import { RULES } from "../rules";
import { applyRule } from "./rule-engine";
import { createError } from "../core/error";
import type { ValidationError, ValidationResult, ValidationSchema } from "../types/schema";

export function validate<T extends Record<string, unknown>>(
  schema: ValidationSchema,
  data: T,
): ValidationResult<Partial<T>> {
  const errors: ValidationError[] = [];
  const validData: Partial<T> = {};

  for (const field of Object.keys(schema)) {
    const rule = RULES[field as keyof typeof RULES];

    if (!rule) {
      errors.push(createError(field, "INVALID_TYPE"));
      continue;
    }

    const error = applyRule(field, data[field as keyof T], rule);

    if (error !== null) {
      errors.push(error);
    } else {
      validData[field as keyof T] = data[field as keyof T];
    }
  }

  return errors.length > 0
    ? { success: false, errors }
    : { success: true, data: validData };
}
