import type { FieldRule, ValidationError } from "../types/schema";
import { createError } from "../core/error";
import { ALLOWED_IMAGE_MIME_TYPES } from "../constants/image";

export function applyRule(
  field: string,
  value: unknown,
  rule: FieldRule
): ValidationError | null {

  if (value == null) {
    return createError(field, "REQUIRED", rule);
  }

  if (field === "image" || field === "avatar") {
    const img = value as Record<string, unknown>;

    return typeof img !== "object"
      ? createError(field, "INVALID_IMAGE", rule)
      : typeof img.url !== "string"
      ? createError(field, "INVALID_IMAGE", rule)
      : img.mimeType &&
        !ALLOWED_IMAGE_MIME_TYPES.has(img.mimeType as string)
      ? createError(field, "UNSUPPORTED_IMAGE_TYPE", rule)
      : img.sizeKB && (img.sizeKB as number) > 5120
      ? createError(field, "IMAGE_TOO_LARGE", rule)
      : null;
  }

  return typeof value !== "string"
    ? createError(field, "INVALID_TYPE", rule)
    : rule.min !== undefined && value.length < rule.min
    ? createError(field, "MIN_LENGTH", rule)
    : rule.max !== undefined && value.length > rule.max
    ? createError(field, "MAX_LENGTH", rule)
    : rule.regex && !rule.regex.test(value)
    ? createError(field, "PATTERN", rule)
    : null;
}
