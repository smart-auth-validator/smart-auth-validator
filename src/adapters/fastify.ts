import { FastifyReply, FastifyRequest, preHandlerHookHandler, validate, ValidationSchema } from "../shared";


export function fastifyAuthValidator(
  schema: ValidationSchema
): preHandlerHookHandler {

  return async (
    request: FastifyRequest,
    reply: FastifyReply
  ) => {
    const result = validate(schema, request.body as Record<string, unknown>);

    if (!result.success) {
      reply.status(400).send({
        status: "error",
        errors: result.errors
      });
    }
  };
}
