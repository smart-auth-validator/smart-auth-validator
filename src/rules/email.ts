import { FieldRule } from "../types/schema";

export const emailRule: FieldRule = {
  max: 50,
  regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  messages: {        
    max: "Email must be under 50 characters",
    pattern: "Invalid email format" 
  }
};
