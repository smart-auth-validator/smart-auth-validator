import { FastifyRequest, FastifyReply } from "fastify";
import { validate } from "../core/validate";
import { InferSchema, ValidationSchema } from "../types/schema";

type Target = "body" | "query" | "params";

type TypedRequest<T extends ValidationSchema> = FastifyRequest & {
  validated?: InferSchema<T>;
};

export function fastifyAuthValidator<T extends ValidationSchema>(
  schema: T,
  target: Target = "body"
) {
  return async (req: TypedRequest<T>, reply: FastifyReply) => {

    const source =
      target === "body"
        ? req.body
        : target === "query"
        ? req.query
        : req.params;

    const result = validate(schema, source as Record<string, unknown>);

    if (!result.success) {
      return reply.status(400).send({
        success: false,
        errors: result.errors,
      });
    }

    req.validated = result.data;
  };
}