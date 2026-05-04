import {
  ValidationSchema,
  ValidationResult,
  ValidationError,
  InferSchema,
  FieldRule,
} from "../types/schema";

import { applyRule } from "./rule-engine";

export function validate<T extends ValidationSchema>(
  schema: T,
  data: Record<string, unknown>
): ValidationResult<InferSchema<T>> {

  const errors: ValidationError[] = [];
  const result: Record<string, unknown> = {};

  for (const key in schema) {
    const rule = schema[key];
    const value = data[key];

    if (rule === true) {
      if (value == null) {
        errors.push({
          field: key,
          code: "REQUIRED",
          message: `${key} is required`,
        });
        continue;
      }

      result[key] = value;
      continue;
    }
    const error = applyRule(
      key,
      value,
      rule as FieldRule
    );

    if (error) {
      errors.push(error);
      continue;
    }

    const r = rule as FieldRule;

    if (r?.transform) {
      result[key] = r.transform(value);
    } else {
      result[key] = value;
    }
  }

  if (errors.length > 0) {
    return {
      success: false,
      errors,
    };
  }

  return {
    success: true,
    data: result as InferSchema<T>,
  };
}