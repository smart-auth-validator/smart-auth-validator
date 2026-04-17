import { FieldRule } from "../shared";

export const booleanRule: FieldRule = {
  regex: /^(true|false)$/,
  messages: {
    REQUIRED: "Value is required",
    PATTERN: "Value must be true or false"
  }
};