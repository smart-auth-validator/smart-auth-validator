import { FieldRule } from "../types/schema";

export const postalCodeRule: FieldRule = {
  max: 10,
  regex: /^[A-Za-z0-9\- ]{3,10}$/,
  messages: {
    REQUIRED: "Postal code is required",
    PATTERN: "Invalid postal code format"
  }
};