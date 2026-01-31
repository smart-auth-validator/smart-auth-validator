import { FieldRule } from "../types/schema";

export const nameRule: FieldRule = {
  min: 2,
  max: 50,
  regex: /^[a-zA-Z\s'-]+$/,
   messages: {
    REQUIRED: "Name is required",
    MIN_LENGTH: "Name must be at least 2 characters",
    MAX_LENGTH: "Name must be under 50 characters",
    PATTERN: "Name can only contain letters, spaces, apostrophes, or hyphens"
  }
};