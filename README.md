# smart-auth-validator
Smart, type-safe, zero-regex validation middleware for Node.js backends. Supports Fastify and Express out-of-the-box. Provides standard rules for email, password, name, phone, and more. Built for backend developers to avoid repetitive validation logic.

# Smart Auth Validator

[![npm version](https://img.shields.io/npm/v/smart-auth-validator.svg)](https://www.npmjs.com/package/smart-auth-validator)
[![License](https://img.shields.io/npm/l/smart-auth-validator.svg)](https://opensource.org/licenses/ISC)

**Smart Auth Validator** is a **type-safe, zero-regex authentication and form validation library** for **Fastify** and **Express**. It provides a **standardized, reusable validation system** for backend forms like registration, login, and profile updates without writing repetitive regex or validation logic.

---

## Features

- ✅ Type-safe validation with **TypeScript**  
- ✅ Supports **Fastify** and **Express** out of the box  
- ✅ Standard rules for common fields: `email`, `password`, `name`, `phone`, etc.  
- ✅ O(1) **rule lookup** for maximum performance  
- ✅ Returns structured **errors** for each field  
- ✅ Minimal and lightweight  
- ✅ Easy to extend with custom rules

---

## Installation

```bash
npm install smart-auth-validator


Supported Fields
The library currently supports a wide array of built-in validation rules. You can validate these fields by simply passing their keys:

Category: Supported Fields
Identity  "name, username, email, password"
Contact   "phone, url"
Address   "street, city, state, postalCode"
Finance   "creditCard, cvv"
General   "date, time, active (boolean)"

Simple Usage
To use Smart Auth Validator, simply define a schema with the fields you want to validate and pass your input data to the validate function.

Basic 3-Field Example
Even though the library supports 10+ fields, you can choose only the ones you need:

import { validate } from "smart-auth-validator";
const result = validate({ name: true, email: true, password: true }, req.body);


Error Response Format
If validation fails, you get a clean array explaining exactly what went wrong:

REQUIRED: Field is missing.

PATTERN: Invalid format (e.g., bad email).

MIN_LENGTH: Input is too short.

WEAK_PASSWORD: Password doesn't meet security standards.