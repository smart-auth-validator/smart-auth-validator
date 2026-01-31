import { FieldRule } from "../types/schema";

export const streetRule: FieldRule = {
  max: 100,
  regex: /^[a-zA-Z0-9\s,.-]+$/,
  messages: {
    REQUIRED: "Street address is required",
    MAX_LENGTH: "Street must be under 100 characters",
    PATTERN: "Street can contain letters, numbers, commas, dots, and hyphens"
  }
};