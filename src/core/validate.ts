import { RULES } from "../rules";
import { applyRule } from "./rule-engine";
import type { ValidationResult, ValidationSchema, ValidationError, FieldRule } from "../types/schema";

export function validate<T extends Record<string, unknown>>(
  schema: ValidationSchema,
  data: T,
): ValidationResult<Partial<T>> {
  const errorList: ValidationError[] = [];
  const validData: Partial<T> = {};

  for (const field of Object.keys(schema)) {
    const rule : FieldRule = RULES[field as keyof typeof RULES];

    if (!rule || rule === undefined) {
      errorList.push({
        field,
        code: "INVALID_TYPE",
        message: `No rule defined for field: ${field}`,
      });
      continue;
    }

    const error: ValidationError | null = applyRule(field, data[field as keyof T], rule);

    if (error !== null) {
      errorList.push(error);
    } else {

      validData[field as keyof T] = data[field as keyof T];
    }
  }

  if (errorList.length > 0) {
    return {
      success: false,
      errors: errorList,
    };
  }

  return {
    success: true,
    data: validData,
  };
}
