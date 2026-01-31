import { FieldRule } from "../types/schema";

export const imageRule: FieldRule = {
  messages: {
    REQUIRED: "Image is required",
    INVALID_IMAGE: "Invalid image payload",
    IMAGE_TOO_LARGE: "Image size exceeds limit",
    UNSUPPORTED_IMAGE_TYPE: "Unsupported image format"
  }
};
