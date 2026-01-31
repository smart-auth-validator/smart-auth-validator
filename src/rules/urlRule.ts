import { FieldRule } from "../types/schema";

export const urlRule: FieldRule = {
  max: 2083, // typical max URL length
  regex: /^(https?:\/\/)?([\w-]+(\.[\w-]+)+)([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/,
  messages: {
    REQUIRED: "URL is required",
    MAX_LENGTH: "URL is too long",
    PATTERN: "Invalid URL format"
  }
};