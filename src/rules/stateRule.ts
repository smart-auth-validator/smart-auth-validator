import { FieldRule } from "../types/schema";

export const stateRule: FieldRule = {
  max: 50,
  regex: /^[a-zA-Z\s]+$/,
  messages: {
    REQUIRED: "State is required",
    MAX_LENGTH: "State must be under 50 characters",
    PATTERN: "State can only contain letters and spaces"
  }
};
