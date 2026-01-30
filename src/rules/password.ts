import type { FieldRule } from "../types/schema";

export const passwordRule: FieldRule = {
  min: 6,
  max: 16,
  regex: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
  message: {
    min: "Password must be at least 6 characters",
    max: "Password must be under 16 characters",
    regex: "Password must include upper, lower and number"
  }
};
