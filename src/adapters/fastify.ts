import {
  FastifyReply,
  FastifyRequest,
  preHandlerHookHandler,
  validate,
  ValidationSchema,
} from "../shared";

type Target = "body" | "query" | "params";

export function fastifyAuthValidator(
  schema: ValidationSchema,
  target: Target = "body"
): preHandlerHookHandler {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const result = validate(
      schema,
      request[target] as Record<string, unknown>
    );

    if (!result.success) {
      return reply.status(400).send({
        status: "fail",
        errors: result.errors,
      });
    }

    // attach validated data (consistent with Express version)
    (request as any).validated = result.data;
  };
}