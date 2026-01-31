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
    if (typeof value !== "object" || Array.isArray(value)) {
      return createError(field, "INVALID_IMAGE", rule);
    }
    const img = value as Record<string, unknown>;
    if (typeof img.url !== "string") return createError(field, "INVALID_IMAGE", rule);
    if (img.mimeType && !ALLOWED_IMAGE_MIME_TYPES.has(img.mimeType as string)) {
      return createError(field, "UNSUPPORTED_IMAGE_TYPE", rule);
    }
    if (img.sizeKB && (img.sizeKB as number) > 5120) {
      return createError(field, "IMAGE_TOO_LARGE", rule);
    }
    return null;
  }

  if (typeof value === "boolean") {
    return null;
  }

  if (typeof value !== "string") {
    return createError(field, "INVALID_TYPE", rule);
  }

  if (rule.min !== undefined && value.length < rule.min) {
    return createError(field, "MIN_LENGTH", rule);
  }
  if (rule.max !== undefined && value.length > rule.max) {
    return createError(field, "MAX_LENGTH", rule);
  }
  if (rule.regex && !rule.regex.test(value)) {
    if (field === "password") {
      return createError(field, "PATTERN", rule);
    }
    return createError(field, "PATTERN", rule);
  }

  return null;
}
