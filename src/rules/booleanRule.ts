import { FieldRule } from "../types/schema";

export const booleanRule: FieldRule = {
  regex: /^(true|false)$/,
  messages: {
    REQUIRED: "Value is required",
    PATTERN: "Value must be true or false"
  }
};