import { FastifyInstance } from 'fastify';
import { auth } from './auth';

export async function v1Routes(fastify: FastifyInstance) {
  fastify.register(
    async function (fastify) {
      fastify.register(auth);
    },
    { prefix: '/v1' }
  );
}
