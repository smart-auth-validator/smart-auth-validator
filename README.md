# smart-auth-validator

<p align="center">
  <strong>Zero-regex, type-safe authentication and form validation for Express and Fastify.</strong>
</p>

<p align="center">
  Lightweight • Developer-first • TypeScript-native • Production-ready
</p>

---

<p align="center">

[![npm version](https://img.shields.io/npm/v/smart-auth-validator.svg)](https://www.npmjs.com/package/smart-auth-validator)
[![npm downloads](https://img.shields.io/npm/dm/smart-auth-validator.svg)](https://www.npmjs.com/package/smart-auth-validator)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue.svg)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/node-%3E%3D18-green.svg)](https://nodejs.org/)

</p>

---

## Why smart-auth-validator?

Most backend validation libraries are either:

* Too heavy
* Schema-verbose
* Regex-dependent
* Hard to maintain
* Poorly typed

`smart-auth-validator` is designed for modern Node.js backends that need:

✅ Type-safe validation
✅ Express middleware support
✅ Fastify preHandler support
✅ Clean error responses
✅ Zero boilerplate
✅ Zero manual regex handling
✅ Built-in authentication rules
✅ Direct validation utilities
✅ Lightweight runtime performance

---

# Install

```bash
npm install smart-auth-validator
```

---

# Features

* TypeScript-first architecture
* Built-in auth and form validation
* Express middleware support
* Fastify preHandler support
* Fully typed validated payloads
* Automatic structured error responses
* Custom rules support
* Custom error message overrides
* Query/body/params validation
* No schema DSL complexity
* Minimal setup
* ESM + CommonJS support

---

# Quick Example

Instead of manually writing repetitive validation logic:

```ts
if (!req.body.email || !req.body.email.includes("@")) {
  return res.status(400).json({
    error: "Invalid email",
  });
}
```

Use:

```ts
import { expressAuthValidator } from "smart-auth-validator";

app.post(
  "/contact",
  expressAuthValidator({
    name: true,
    email: true,
    phone: true,
  }),
  handler
);
```

That's it.

---

# Express Example

```ts
import express from "express";
import { expressAuthValidator } from "smart-auth-validator";

const app = express();

app.use(express.json());

app.post(
  "/register",
  expressAuthValidator({
    name: true,
    email: true,
    password: true,
    phone: true,
  }),
  (req, res) => {
    res.json({
      success: true,
      data: req.validated,
    });
  }
);

app.listen(3000);
```

---

# Fastify Example

```ts
import Fastify from "fastify";
import { fastifyAuthValidator } from "smart-auth-validator";

const app = Fastify();

app.post(
  "/register",
  {
    preHandler: fastifyAuthValidator({
      name: true,
      email: true,
      password: true,
    }),
  },
  async (req, reply) => {
    reply.send({
      success: true,
      data: req.validated,
    });
  }
);

app.listen({ port: 3000 });
```

---

# Direct Validation (Without Middleware)

You can also validate data directly inside:

* Services
* Workers
* CRON jobs
* Background tasks
* CLI scripts

```ts
import { validate } from "smart-auth-validator";

const result = validate(
  {
    email: true,
    password: true,
  },
  {
    email: "user@example.com",
    password: "Secure@123",
  }
);

if (!result.success) {
  console.log(result.errors);
}
```

---

# Custom Rules

Use rule objects for advanced validation control.

```ts
app.post(
  "/profile",
  expressAuthValidator({
    username: {
      min: 3,
      max: 20,
    },

    bio: {
      max: 160,
    },

    website: {
      regex: /^https?:\/\/.+/,
    },

    displayName: {
      min: 2,
      max: 50,
      transform: (value) => String(value).trim(),
    },
  }),
  handler
);
```

---

# Custom Error Messages

Override validation errors per field.

```ts
expressAuthValidator({
  email: {
    messages: {
      REQUIRED: "Please enter your email",
      PATTERN: "Invalid email format",
    },
  },

  password: {
    min: 8,
    messages: {
      MIN_LENGTH: "Password must contain at least 8 characters",
    },
  },
});
```

---

# Validate Query Params

```ts
expressAuthValidator(
  {
    q: true,
    page: true,
  },
  "query"
);
```

Example:

```bash
/search?q=nodejs&page=2
```

---

# Validate Route Params

```ts
expressAuthValidator(
  {
    id: true,
  },
  "params"
);
```

Example:

```bash
/user/:id
```

---

# Error Response Format

Validation errors are automatically standardized.

```json
{
  "success": false,
  "errors": [
    {
      "field": "email",
      "code": "PATTERN",
      "message": "email format is invalid"
    },
    {
      "field": "password",
      "code": "MIN_LENGTH",
      "message": "password must be at least 8 characters"
    }
  ]
}
```

---

# Access Typed Validated Data

Validated payloads become available on:

```ts
req.validated
```

Example:

```ts
app.post(
  "/register",
  expressAuthValidator({
    email: true,
  }),
  (req, res) => {
    const { email } = req.validated;

    res.json({
      success: true,
    });
  }
);
```

---

# Supported Fields

<!-- AUTO-GENERATED-START -->


## Supported Fields

### Identity

| Field | Description |
|-------|-------------|
| `name` | Full name validation (min/max length, no special characters) |
| `username` | Username validation (alphanumeric, underscores allowed) |
| `email` | Email format validation (RFC-compliant) |
| `password` | Strong password (min 8 chars, uppercase, number, special char) |

### Contact

| Field | Description |
|-------|-------------|
| `phone` | International phone number validation (E.164 format) |
| `url` | URL format validation (http/https required) |

### Address

| Field | Description |
|-------|-------------|
| `street` | Street address validation |
| `city` | City name validation |
| `state` | State or province validation |
| `postalCode` | Postal/ZIP code validation |

### Finance

| Field | Description |
|-------|-------------|
| `creditCard` | Credit card number validation (Luhn algorithm) |
| `cvv` | CVV/CVC validation (3–4 digits) |

### System

| Field | Description |
|-------|-------------|
| `date` | Date format validation (YYYY-MM-DD) |
| `time` | Time format validation (HH:MM or HH:MM:SS) |
| `active` | Boolean active/inactive status validation |

### Media

| Field | Description |
|-------|-------------|
| `avatar` | Image validation (URL format, MIME type, size limits) |



<!-- AUTO-GENERATED-END -->

---

# Validation Error Codes

| Code                     | Description                |
| ------------------------ | -------------------------- |
| `REQUIRED`               | Field is missing           |
| `INVALID_TYPE`           | Invalid data type          |
| `MIN_LENGTH`             | Value shorter than minimum |
| `MAX_LENGTH`             | Value exceeds maximum      |
| `PATTERN`                | Pattern validation failed  |
| `INVALID_IMAGE`          | Invalid image object       |
| `IMAGE_TOO_LARGE`        | Image exceeds allowed size |
| `UNSUPPORTED_IMAGE_TYPE` | Unsupported MIME type      |

---

# Package Information

| Property       | Value            |
| -------------- | ---------------- |
| Runtime        | Node.js >=18     |
| Language       | TypeScript       |
| Module Support | ESM + CommonJS   |
| Frameworks     | Express, Fastify |
| License        | MIT              |

---

# SEO Keywords

Node.js validation library, Express validator middleware, Fastify validator, TypeScript validation library, authentication validation middleware, form validation package, schema validation for Node.js, backend validation package, TypeScript Express middleware, Fastify authentication validator, zero regex validation, auth validation package.

---

# Contributing

Contributions, issues, and feature requests are welcome.

---

# License

MIT © Burhan Chughtai

---

# Links

* npm: https://www.npmjs.com/package/smart-auth-validator
* GitHub: https://github.com/smart-auth-validator/smart-auth-validator
