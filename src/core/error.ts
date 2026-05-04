import { FieldRule, ValidationError, ValidationErrorCode } from "../shared";

type ErrorMessageBuilder = (field: string, rule?: FieldRule) => string;

export const ERROR_MESSAGES: Record<ValidationErrorCode, ErrorMessageBuilder> =
  {
    REQUIRED: (field) =>
      `${field} is required`,

    INVALID_TYPE: (field) =>
      `${field} must be a valid ${field}`,

    MIN_LENGTH: (field, rule) =>
      `${field} must be at least ${rule?.min ?? "?"} characters`,

    MAX_LENGTH: (field, rule) =>
      `${field} must be no more than ${rule?.max ?? "?"} characters`,

    PATTERN: (field) =>
      `${field} format is invalid`,

    INVALID_IMAGE: (field) =>
      `${field} must be a valid image object`,

    IMAGE_TOO_LARGE: () =>
      "Image size exceeds the allowed limit",

    UNSUPPORTED_IMAGE_TYPE: () =>
      "Unsupported image format — accepted: jpeg, png, webp, avif",
  };

export function createError(
  field: string,
  code: ValidationErrorCode,
  rule?: FieldRule
): ValidationError {
  const message =
    rule?.messages?.[code] ??
    ERROR_MESSAGES[code]?.(field, rule) ??
    "Validation error";

  return { field, code, message };
}