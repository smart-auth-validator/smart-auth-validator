import { FieldRule } from "../types/schema";

export const phoneRule: FieldRule = {
  regex: /^\+?[1-9]\d{10,14}$/,
  messages: {
    REQUIRED: "Phone number is required",
    PATTERN: "Phone number must be in international format (+countrycodexxxxxxxx)"
  }
};