import { FastifyInstance } from 'fastify';
import { findUser } from './find';
import { createUser } from './create';

export async function users(fastify: FastifyInstance) {
  fastify.register(async function (fastify) {
    fastify.get('/', {}, findUser);
    fastify.post('/', {}, createUser);
  }, { prefix: '/users' })
}
