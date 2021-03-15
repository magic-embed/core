import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export async function createUser(
  this: FastifyInstance,
  req: FastifyRequest,
  res: FastifyReply
): Promise<string> {
  throw this.httpErrors.methodNotAllowed('Coming soon!');
}
