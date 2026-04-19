import {
  NextFunction,
  Request,
  Response,
  validate,
  ValidationSchema,
} from "../shared";

type Target = "body" | "query" | "params";

export function expressAuthValidator(
  schema: ValidationSchema,
  target: Target = "body"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = validate(schema, req[target]);

    if (!result.success) {
      return res.status(400).json({
        status: "fail",
        errors: result.errors,
      });
    }

    (req as any).validated = result.data;

    next();
  };
}