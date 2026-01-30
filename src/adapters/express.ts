import type { Request, Response, NextFunction } from "express";
import { validate } from "../core/validate";
import type { ValidationSchema } from "../types/schema";

export function expressAuthValidator(schema: ValidationSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = validate(schema, req.body);

    if (!result.success) {
      return res.status(400).json({
        status: "error",
        errors: result.errors
      });
    }

    next();
  };
}
