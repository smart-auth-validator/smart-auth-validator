import { booleanRule, cityRule, creditCardRule, cvvRule, dateRule, emailRule, FieldRule, imageRule, nameRule, passwordRule, phoneRule, postalCodeRule, stateRule, streetRule, timeRule, urlRule, usernameRule } from "../shared";

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
