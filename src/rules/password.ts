import { FieldRule } from "../types/schema";

export const passwordRule: FieldRule = {
  min: 8,
  max: 128,
  regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
  messages: {
    REQUIRED: "Password is required",
    MIN_LENGTH: "Password must be at least 8 characters",
    MAX_LENGTH: "Password must be under 128 characters",
    PATTERN: "Password must include uppercase, lowercase, number, and special character"
  }
};