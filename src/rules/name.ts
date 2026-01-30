import { FieldRule } from "../types/schema";

export const nameRule : FieldRule = {
    min: 6,
    max: 30,
    message: {
        min: "Name must be at least 6 characters",
        max: "Name must be under 30 characters ",
    }
}