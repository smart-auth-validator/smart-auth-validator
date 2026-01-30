import type { FieldRule, ValidationError, ValidationErrorCode } from "../types/schema";

export const ERROR_MESSAGES: Record<ValidationErrorCode, (field: string, rule?: FieldRule) => string> = {
  REQUIRED: (field) => `${field.charAt(0).toUpperCase() + field.slice(1)} is required`,
  INVALID_TYPE: (field) => `${field.charAt(0).toUpperCase() + field.slice(1)} must be a string`,
  MIN_LENGTH: (field, rule) => 
    rule?.messages?.min ?? `${field.charAt(0).toUpperCase() + field.slice(1)} must be at least ${rule?.min || 1} characters`,
  MAX_LENGTH: (field, rule) => 
    rule?.messages?.max ?? `${field.charAt(0).toUpperCase() + field.slice(1)} must be ${rule?.max || 50} characters or less`,
  PATTERN: (field, rule) => 
    rule?.messages?.pattern ?? `${field.charAt(0).toUpperCase() + field.slice(1)} has invalid format`
};

export function createError(field: string, code: ValidationErrorCode, rule?: FieldRule): ValidationError {
  return {
    field,
    code,
    message: ERROR_MESSAGES[code](field, rule)
  };
}
