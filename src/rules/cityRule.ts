import { FieldRule } from "../types/schema";

export const cityRule: FieldRule = {
  max: 50,
  regex: /^[a-zA-Z\s]+$/,
  messages: {
    REQUIRED: "City is required",
    MAX_LENGTH: "City must be under 50 characters",
    PATTERN: "City can only contain letters and spaces"
  }
};