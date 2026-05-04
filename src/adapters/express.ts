import { Request, Response, NextFunction } from "express";
import { validate } from "../core/validate";
import { InferSchema, ValidationSchema } from "../types/schema";

type Target = "body" | "query" | "params";

type TypedRequest<T extends ValidationSchema> = Request & {
  validated?: InferSchema<T>;
};

export function expressAuthValidator<T extends ValidationSchema>(
  schema: T,
  target: Target = "body"
) {
  return (req: TypedRequest<T>, res: Response, next: NextFunction) => {

    const source =
      target === "body"
        ? req.body
        : target === "query"
        ? req.query
        : req.params;

    const result = validate(schema, source);

    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.errors,
      });
    }

    req.validated = result.data;
    next();
  };
}