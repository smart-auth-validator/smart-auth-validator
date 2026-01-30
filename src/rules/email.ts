import { FieldRule } from "../types/schema";

export const emailRule: FieldRule = {
    max: 50,
    regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: {
        max: "Email must be under 50 characters",
        regex: "Invalid email format"
    }
}