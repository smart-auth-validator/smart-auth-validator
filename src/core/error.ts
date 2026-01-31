import type { FieldRule, ValidationError, ValidationErrorCode } from "../types/schema";

export const ERROR_MESSAGES: Record<
  ValidationErrorCode,
  (field: string, rule?: FieldRule) => string
> = {
  REQUIRED: (field) => `${field} is required`,

  INVALID_TYPE: (field) => `${field} must be a valid ${field}`,

  MIN_LENGTH: (field, rule) =>
    `${field} must be at least ${rule?.min} characters`,

  MAX_LENGTH: (field, rule) =>
    `${field} must be maximum ${rule?.max} characters`,

  PATTERN: (field) => `${field} format is invalid`,

  WEAK_PASSWORD: () =>
    "Password too weak (8+ chars, 1 upper, 1 lower, 1 number, 1 special char)",

  INVALID_PHONE: () =>
    "Phone must be a valid international/local number (+923001234567)",

  INVALID_URL: () =>
    "URL must be valid (https://example.com)",

  INVALID_IMAGE: (field) =>
    `${field} must be a valid image object`,

  IMAGE_TOO_LARGE: () =>
    "Image size exceeds allowed limit",

  UNSUPPORTED_IMAGE_TYPE: () =>
    "Unsupported image format (jpeg, png, webp, avif only)"
};

export function createError(
  field: string,
  code: ValidationErrorCode,
  rule?: FieldRule
): ValidationError {
  const message =
    rule?.messages?.[code] ||
    ERROR_MESSAGES[code]?.(field, rule) ||
    "Validation error";

  return { field, code, message };
}
