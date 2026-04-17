import { FieldRule } from "../shared";

export const emailRule: FieldRule = {
  max: 50,
  regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  transform: (value: unknown) => {
    return typeof value === "string" 
      ? value.trim().toLowerCase() 
      : value;
  },
  messages: {
    REQUIRED: "Email is required",
    MAX_LENGTH: "Email must be under 50 characters",
    PATTERN: "Invalid email format"
  }
};