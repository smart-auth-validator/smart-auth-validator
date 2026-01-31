import { FieldRule } from "../types/schema";

export const usernameRule: FieldRule = {
  min: 3,
  max: 30,
  regex: /^[a-zA-Z0-9_]+$/,
  messages: {
    REQUIRED: "Username is required",
    MIN_LENGTH: "Username must be at least 3 characters",
    MAX_LENGTH: "Username must be under 30 characters",
    PATTERN: "Username can contain only letters, numbers, and underscores"
  }
};