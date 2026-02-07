import { RULES } from "../rules";
import { applyRule } from "./rule-engine";
import { createError } from "../core/error";
import type {
  FieldRule,
  ValidationError,
  ValidationResult,
  ValidationSchema
} from "../types/schema";

export function validate<T extends Record<string, unknown>>(
  schema: ValidationSchema,
  data: T
): ValidationResult<Partial<T>> {
  const errors: ValidationError[] = [];
  const validData: Partial<T> = {};

  for (const field of Object.keys(schema)) {
    const schemaRule = schema[field];
    const rule: FieldRule | undefined =
      typeof schemaRule === "boolean"
        ? RULES[field]
        : (RULES[field] ?? (schemaRule as FieldRule));

    if (!rule) {
      errors.push(createError(field, "INVALID_TYPE"));
      continue;
    }

    let currentValue = data[field as keyof T];

    if (rule.transform && currentValue !== undefined) {
      currentValue = rule.transform(currentValue) as T[keyof T];
    }

    const error = applyRule(field, currentValue, rule);

    if (error) {
      errors.push(error);
    } else {
      validData[field as keyof T] = currentValue;
    }
  }

  return errors.length > 0
    ? { success: false, errors }
    : { success: true, data: validData };
}