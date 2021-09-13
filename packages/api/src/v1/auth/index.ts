import { FastifyInstance, RouteHandlerMethod } from 'fastify';
import passport from 'fastify-passport';
import { login } from './login';
import { callback } from './callback';
import STRATEGY from '../../passport/strategy';

export async function auth(fastify: FastifyInstance) {
  fastify.register(
    async function (fastify) {
      fastify.post(
        '/',
        {
          schema: login.schema,
        },
        login
      );
      fastify.get(
        '/callback',
        { preValidation: passport.authenticate(STRATEGY, { session: false }) },
        callback as RouteHandlerMethod
      );
      fastify.get(
        '/test',
        {},
        function (request, reply) {
          reply.send(`Hello, ${JSON.stringify(request.user)}`);
        }
      )
    },
    { prefix: '/auth' }
  );
}
