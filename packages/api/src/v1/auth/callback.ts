import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';

export async function callback(
  this: FastifyInstance,
  request: FastifyRequest,
  reply: FastifyReply,
  err: null | Error,
  user: { id: string; redirect: string }
): Promise<any> {
  if (err) {
    this.httpErrors.internalServerError('Something went wrong while trying to authenticate you.');
    return;
  }

  reply.redirect(user?.redirect || '/app');
}
