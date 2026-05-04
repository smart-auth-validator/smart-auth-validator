# smart-auth-validator

[![npm version](https://img.shields.io/npm/v/smart-auth-validator.svg)](https://www.npmjs.com/package/smart-auth-validator)
[![license](https://img.shields.io/npm/l/smart-auth-validator.svg)](https://opensource.org/licenses/ISC)
[![downloads](https://img.shields.io/npm/dm/smart-auth-validator.svg)](https://www.npmjs.com/package/smart-auth-validator)
[![TypeScript](https://img.shields.io/badge/TypeScript-ready-blue.svg)](https://www.typescriptlang.org/)

> Drop-in validation middleware for Express and Fastify.  
> One import. No manual middleware. No regex boilerplate.

---

## Install

```bash
npm install smart-auth-validator
```

---

## The Point

You used to write this kind of thing in every route:

```ts
if (!req.body.email || !req.body.email.includes("@")) {
  return res.status(400).json({ error: "Invalid email" });
}
```

You don't do that anymore.

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

That's the whole pattern. Import once, declare what you need, move on.

---

## Express

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
    res.json({ success: true, data: req.validated });
  }
);

app.post(
  "/contact",
  expressAuthValidator({
    name: true,
    email: true,
    phone: true,
  }),
  (req, res) => {
    res.json({ success: true });
  }
);

app.listen(3000);
```

---

## Fastify

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
    reply.send({ success: true, data: req.validated });
  }
);

app.listen({ port: 3000 });
```

---

## Direct Validation (No Middleware)

If you need to validate outside a route — in a service layer, a worker, a script — use `validate()` directly.

```ts
import { validate } from "smart-auth-validator";

const result = validate(
  { email: true, password: true },
  { email: "user@example.com", password: "Secure@123" }
);

if (!result.success) {
  console.error(result.errors);
}
```

---

## Custom Rules

Pass a rule object instead of `true` when you need control over length, format, or transforms.

```ts
app.post(
  "/profile",
  expressAuthValidator({
    username: { min: 3, max: 20 },
    bio: { max: 160 },
    website: { regex: /^https?:\/\/.+/ },
    displayName: {
      min: 2,
      max: 50,
      transform: (v) => String(v).trim(),
    },
  }),
  handler
);
```

---

## Custom Error Messages

Override any error message per field:

```ts
expressAuthValidator({
  email: {
    messages: {
      REQUIRED: "Please enter your email",
      PATTERN: "That doesn't look like a valid email",
    },
  },
  password: {
    min: 8,
    messages: {
      MIN_LENGTH: "Password must be at least 8 characters",
    },
  },
});
```

---

## Validate Query Params or Route Params

The second argument sets the validation target. Default is `"body"`.

```ts
// Validate query string: /search?q=hello&page=2
expressAuthValidator({ q: true, page: true }, "query");

// Validate route params: /user/:id
expressAuthValidator({ id: true }, "params");
```

---

## Error Response Shape

When validation fails, the middleware sends this automatically:

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

No extra setup. You get structured errors with field names, error codes, and human-readable messages out of the box.

---

## Accessing Validated Data

After the middleware runs, validated data is available on `req.validated` — fully typed.

```ts
app.post("/register", expressAuthValidator({ email: true }), (req, res) => {
  const { email } = req.validated; // typed, safe to use
  res.json({ success: true });
});
```

---

## Supported Fields

Use `true` to enable built-in rules. Use a rule object to override them.

### Identity

| Field      | When `true`                                          |
|------------|------------------------------------------------------|
| `name`     | Min 2 chars, max 60, letters and spaces only         |
| `username` | Min 3 chars, max 20, alphanumeric and underscores    |
| `email`    | RFC-compliant email format                           |
| `password` | Min 8 chars, uppercase, number, and special character|

### Contact

| Field   | When `true`                                          |
|---------|------------------------------------------------------|
| `phone` | International format (E.164)                         |
| `url`   | Must start with http:// or https://                  |

### Address

| Field        | When `true`                           |
|--------------|---------------------------------------|
| `street`     | Alphanumeric and common street chars  |
| `city`       | Letters and spaces only               |
| `state`      | Letters and spaces only               |
| `postalCode` | 4–10 digit postal format              |

### Finance

| Field        | When `true`                           |
|--------------|---------------------------------------|
| `creditCard` | Luhn algorithm, 13–19 digits          |
| `cvv`        | 3 or 4 digits                         |

### System

| Field    | When `true`                            |
|----------|----------------------------------------|
| `date`   | Format: YYYY-MM-DD                     |
| `time`   | Format: HH:MM or HH:MM:SS             |
| `active` | Must be a boolean (`true` or `false`)  |

### Media

| Field    | When `true`                                                        |
|----------|--------------------------------------------------------------------|
| `avatar` | Object with `url` (string), optional `mimeType` and `sizeKB`      |
|          | Accepted types: jpeg, png, webp, avif — Max size: 5120 KB          |

---

## Error Codes

| Code                    | When it fires                                       |
|-------------------------|-----------------------------------------------------|
| `REQUIRED`              | Field is `null` or `undefined`                      |
| `INVALID_TYPE`          | Value type does not match expected type             |
| `MIN_LENGTH`            | String is shorter than the `min` rule               |
| `MAX_LENGTH`            | String is longer than the `max` rule                |
| `PATTERN`               | Value fails the built-in or custom `regex`          |
| `INVALID_IMAGE`         | `avatar.url` is not a string                        |
| `IMAGE_TOO_LARGE`       | `avatar.sizeKB` exceeds 5120                        |
| `UNSUPPORTED_IMAGE_TYPE`| `avatar.mimeType` is not jpeg, png, webp, or avif   |

---

## License

ISC © [Burhan Chughtai](https://www.linkedin.com/in/muhammad-burhan-chughtai-108a71332/)