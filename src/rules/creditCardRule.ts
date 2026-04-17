import { FieldRule } from "../shared";

export const creditCardRule: FieldRule = {
  regex: /^\d{13,19}$/,
  messages: {
    REQUIRED: "Credit card number is required",
    PATTERN: "Invalid credit card number"
  }
};