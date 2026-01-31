import { FieldRule } from "../types/schema";

export const dateRule: FieldRule = {
  regex: /^\d{4}-\d{2}-\d{2}$/,
  messages: {
    REQUIRED: "Date is required",
    PATTERN: "Date must be in YYYY-MM-DD format"
  }
};