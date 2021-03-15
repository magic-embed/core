import { FastifyInstance, FastifyRequest, FastifyReply, RouteHandlerMethod } from 'fastify';
import { createClient } from '@magic-embed/db';

export async function findUser(
  this: FastifyInstance,
  req: FastifyRequest,
  res: FastifyReply
): Promise<any> {
  // @ts-ignore
  const users = await ((this.db as unknown) as ReturnType<typeof createClient>)
    .select('*')
    .from('users');

  return users;
}
