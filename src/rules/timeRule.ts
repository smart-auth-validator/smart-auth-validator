import { FieldRule } from "../types/schema";

export const timeRule: FieldRule = {
  regex: /^([01]\d|2[0-3]):([0-5]\d)$/,
  messages: {
    REQUIRED: "Time is required",
    PATTERN: "Time must be in HH:MM 24-hour format"
  }
};
