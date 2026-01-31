import { FieldRule } from "../types/schema";

export const cvvRule: FieldRule = {
  regex: /^\d{3,4}$/,
  messages: {
    REQUIRED: "CVV is required",
    PATTERN: "CVV must be 3 or 4 digits"
  }
};