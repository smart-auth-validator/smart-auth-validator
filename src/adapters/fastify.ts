import {
  FastifyReply,
  FastifyRequest,
  preHandlerHookHandler,
  validate,
  ValidationSchema,
} from "../shared";

type Target = "body" | "query" | "params";

interface ValidatedRequest extends FastifyRequest {
  validated?: unknown;
}

export function fastifyAuthValidator(
  schema: ValidationSchema,
  target: Target = "body"
): preHandlerHookHandler {
  return async (request: ValidatedRequest, reply: FastifyReply) => {
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

    request.validated = result.data;
  };
}