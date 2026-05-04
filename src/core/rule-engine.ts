import {
  ALLOWED_IMAGE_MIME_TYPES,
  createError,
  FieldRule,
  ValidationError,
} from "../shared";

export function applyRule(
  field: string,
  value: unknown,
  rule: FieldRule
): ValidationError | null {

  // REQUIRED CHECK
  if (value == null) {
    return createError(field, "REQUIRED", rule);
  }

  // IMAGE OBJECT VALIDATION
  if (isImageValue(value)) {
    return validateImage(field, value, rule);
  }

  // STRING VALIDATION
  if (typeof value === "string") {
    return validateString(field, value, rule);
  }

  // BOOLEAN
  if (typeof value === "boolean") {
    return null;
  }

  return createError(field, "INVALID_TYPE", rule);
}

function isImageValue(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function validateImage(
  field: string,
  img: Record<string, unknown>,
  rule: FieldRule
): ValidationError | null {

  if (typeof img.url !== "string") {
    return createError(field, "INVALID_IMAGE", rule);
  }

  if (
    img.mimeType &&
    typeof img.mimeType === "string" &&
    !ALLOWED_IMAGE_MIME_TYPES.has(img.mimeType)
  ) {
    return createError(field, "UNSUPPORTED_IMAGE_TYPE", rule);
  }

  if (
    typeof img.sizeKB === "number" &&
    img.sizeKB > 5120
  ) {
    return createError(field, "IMAGE_TOO_LARGE", rule);
  }

  return null;
}

function validateString(
  field: string,
  value: string,
  rule: FieldRule
): ValidationError | null {

  if (rule.min !== undefined && value.length < rule.min) {
    return createError(field, "MIN_LENGTH", rule);
  }

  if (rule.max !== undefined && value.length > rule.max) {
    return createError(field, "MAX_LENGTH", rule);
  }

  if (rule.regex && !rule.regex.test(value)) {
    return createError(field, "PATTERN", rule);
  }

  return null;
}