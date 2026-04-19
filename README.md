# smart-auth-validator

[![npm version](https://img.shields.io/npm/v/smart-auth-validator.svg)](https://www.npmjs.com/package/smart-auth-validator)
[![license](https://img.shields.io/npm/l/smart-auth-validator.svg)](https://opensource.org/licenses/ISC)
[![downloads](https://img.shields.io/npm/dm/smart-auth-validator.svg)](https://www.npmjs.com/package/smart-auth-validator)

> Smart, type-safe validation library for Node.js backends.  
> Works with **Express** and **Fastify** out of the box.

## Install
bashnpm install smart-auth-validator

## Why This Exists
Every backend project repeats the same logic — email checks, password rules, phone formats.
This library removes that boilerplate and gives you one consistent validation system.

## Usage
#### validate() — Direct
tsimport { validate } from "smart-auth-validator";

const result = validate(
  { email: true, password: true, name: true },
  { email: "test@gmail.com", password: "12345678", name: "John" }
);

console.log(result);

## Express
tsimport express from "express";
import { expressAuthValidator } from "smart-auth-validator";

const app = express();
app.use(express.json());

app.post(
  "/register",
  expressAuthValidator({ email: true, password: true, name: true }),
  (req, res) => {
    res.json({ success: true, message: "User registered successfully" });
  }
);

app.listen(3000);

## Fastify
tsimport Fastify from "fastify";
import { fastifyAuthValidator } from "smart-auth-validator";

const app = Fastify();

app.post(
  "/register",
  { preHandler: fastifyAuthValidator({ email: true, password: true }) },
  async (req, reply) => {
    reply.send({ success: true, message: "User registered successfully" });
  }
);

app.listen({ port: 3000 });

## Error Response
json{
  "success": false,
  "errors": [
    {
      "field": "email",
      "code": "PATTERN",
      "message": "Invalid email format"
    }
  ]
}

## Supported Fields
<!-- AUTO-GENERATED-START -->
<!-- AUTO-GENERATED-END -->

## License
ISC © Burhan Chughtai