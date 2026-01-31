import { FieldRule } from "../types/schema";

export const emailRule: FieldRule = {
  max: 50,
  regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  messages: {
    REQUIRED: "Email is required",
    MAX_LENGTH: "Email must be under 50 characters",
    PATTERN: "Invalid email format"
  }
};