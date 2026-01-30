import { passwordRule } from "./password";
import { emailRule } from "./email";
import { nameRule } from "./name";
import { FieldRule } from "../types/schema";

export const RULES: Record<string, FieldRule> = {
  email: emailRule,
  password: passwordRule,
  name: nameRule
};
