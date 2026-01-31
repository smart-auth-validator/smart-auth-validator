import { passwordRule } from "./password";
import { emailRule } from "./email";
import { nameRule } from "./name";
import { FieldRule } from "../types/schema";
import { phoneRule } from "./phone";
import { urlRule } from "./urlRule";
import { postalCodeRule } from "./postalCodeRule";
import { dateRule } from "./dateRule";
import { creditCardRule } from "./creditCardRule";
import { cvvRule } from "./cvvRule";
import { stateRule } from "./stateRule";
import { cityRule } from "./cityRule";
import { streetRule } from "./streetRule";
import { usernameRule } from "./usernameRule";
import { timeRule } from "./timeRule";
import { booleanRule } from "./booleanRule";
import { imageRule } from "./imageRule";

export const RULES: Record<string, FieldRule> = {
  name: nameRule,
  email: emailRule,
  password: passwordRule,
  phone: phoneRule,
  url: urlRule,
  postalCode: postalCodeRule,
  date: dateRule,
  creditCard: creditCardRule,
  cvv: cvvRule,
  state: stateRule,
  city: cityRule,
  street: streetRule,
  username: usernameRule,
  time: timeRule,
  active: booleanRule,
  avatar: imageRule 
};
