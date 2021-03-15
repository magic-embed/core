import { FastifyInstance } from 'fastify';
import { apps } from './apps';
import { users } from './users';

export async function v1Routes(fastify: FastifyInstance) {
  fastify.register(
    async function (fastify) {
      fastify.register(apps);
      fastify.register(users);
    },
    { prefix: '/v1' }
  );
}
